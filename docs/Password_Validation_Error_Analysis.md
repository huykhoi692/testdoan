# Password Validation Error Analysis

## Date: 2026-01-23

## Error Summary

**Error Message:**

```
Failed to load resource: the server responded with a status of 400 (Bad Request)
error-middleware.ts:20 password/update_password/rejected caught at middleware with reason: "global.messages.validate.newpassword.strength"
error-middleware.ts:23 Actual cause: error.http.400
```

---

## Root Cause Analysis

### The Issue

The error occurs when trying to update a password that fails **backend validation**. The frontend shows a confusing message: `"global.messages.validate.newpassword.strength"` which is an **i18n translation key**, not the actual error message.

### Why This Happens

#### 1. **Backend Validation (Java)**

Location: `AccountResource.java` (line 162-165)

```java
@PostMapping(path = "/account/change-password")
public void changePassword(@RequestBody PasswordChangeDTO passwordChangeDto) {
  if (isPasswordLengthInvalid(passwordChangeDto.getNewPassword())) {
    throw new InvalidPasswordException();
  }
  userService.changePassword(passwordChangeDto.getCurrentPassword(), passwordChangeDto.getNewPassword());
}

private static boolean isPasswordLengthInvalid(String password) {
  return (
    StringUtils.isEmpty(password) ||
    password.length() < ManagedUserVM.PASSWORD_MIN_LENGTH || // MIN = 8
    password.length() > ManagedUserVM.PASSWORD_MAX_LENGTH // MAX = 100
  );
}

```

**Backend only validates:**

- ✅ Password length: 8-100 characters
- ❌ **NO validation for uppercase letters**
- ❌ **NO validation for numbers**
- ❌ **NO validation for special characters**

#### 2. **Frontend Validation (TypeScript/React)**

Location: `password.tsx` (line 86-95)

```typescript
const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,}$/;

validate={{
  required: { value: true, message: translate('global.messages.validate.newpassword.required') },
  minLength: { value: 8, message: translate('global.messages.validate.newpassword.minlength') },
  maxLength: { value: 100, message: translate('global.messages.validate.newpassword.maxlength') },
  pattern: {
    value: passwordPattern,
    message: translate('global.messages.validate.newpassword.strength') || 'Password is too weak',
  },
}}
```

**Frontend validates:**

- ✅ Password length: 8-100 characters
- ✅ At least 1 uppercase letter (A-Z)
- ✅ At least 1 number (0-9)
- ✅ At least 1 special character

#### 3. **The Mismatch Problem**

| Scenario                                      | Frontend                                        | Backend                       | Result                       |
| --------------------------------------------- | ----------------------------------------------- | ----------------------------- | ---------------------------- |
| Password: "password" (8 chars, all lowercase) | ❌ Blocks (no uppercase, no number, no special) | ✅ Accepts (length OK)        | Frontend prevents submission |
| Password: "Password1!" (11 chars, strong)     | ✅ Passes                                       | ✅ Accepts                    | Works fine                   |
| **Edge Case: User bypasses frontend**         | N/A                                             | ❌ Might reject if length < 8 | **ERROR OCCURS**             |

---

## Error Flow

### When Error Happens:

1. **User enters weak password** (e.g., "pass123")
2. **Frontend validation fails** → Shows inline validation error
3. **User somehow bypasses frontend** (e.g., direct API call, browser manipulation)
4. **Backend receives request** → Validates only length
5. **Backend throws `InvalidPasswordException`** → Returns 400 error
6. **Frontend reducer catches error** → Maps to translation key
7. **Error message shows** → `"global.messages.validate.newpassword.strength"` (translation key instead of message)

### Error Response Structure

**From Backend (`InvalidPasswordException.java`):**

```java
super(
    HttpStatus.BAD_REQUEST,
    ProblemDetailWithCauseBuilder.instance()
        .withStatus(HttpStatus.BAD_REQUEST.value())
        .withType(ErrorConstants.INVALID_PASSWORD_TYPE)  // URL: /invalid-password
        .withTitle("Incorrect password")
        .withProperty("errorKey", "invalidpassword")
        .build(),
    null
);
```

**Frontend Error Handler (`password.reducer.ts`):**

```typescript
serializeError(error) {
  const axiosError = serializeAxiosError(error);
  const errorResponse = (axiosError as AxiosError)?.response?.data as JHipsterErrorResponse;

  // Handle specific invalid-password error type from Spring Security/JHipster
  if (errorResponse?.type?.includes('invalid-password')) {
    return { ...axiosError, message: 'global.messages.validate.newpassword.strength' };  // ← PROBLEM!
  }

  if (errorResponse?.errorKey) {
    return { ...axiosError, message: `error.${errorResponse.errorKey}` };
  }
  return axiosError;
}
```

---

## Problems Identified

### 1. **Translation Key Not Translated**

The error handler returns `'global.messages.validate.newpassword.strength'` but this should be **translated**.

**Current i18n value (`global.json` line 115):**

```json
"strength": "Password strength:"
```

This is a **label**, not an error message!

### 2. **Wrong Translation Key**

The translation key `global.messages.validate.newpassword.strength` maps to:

```
"Password strength:"
```

But we want an **error message**, not a label. The correct usage should be:

- ✅ For labels: `"Password strength:"`
- ❌ For errors: Should be `"Password is too weak"` or `"Password does not meet strength requirements"`

### 3. **Missing Backend Validation**

The backend only validates **length**, not **complexity**. This creates inconsistency:

- Frontend: Enforces uppercase + number + special character
- Backend: Only checks length (8-100)

### 4. **Error Message Path Issues**

**Current flow:**

```
Backend → InvalidPasswordException → errorKey: "invalidpassword"
         ↓
Frontend → Reducer maps to: "global.messages.validate.newpassword.strength"
         ↓
Translation: "Password strength:" (wrong!)
```

**Should be:**

```
Backend → InvalidPasswordException → errorKey: "invalidpassword"
         ↓
Frontend → Reducer maps to: "error.invalidpassword"
         ↓
Translation: "Password does not meet requirements"
```

---

## Solutions

### Solution 1: Fix Translation (Quick Fix)

**Option A: Add proper error message to `global.json`**

```json
"error": {
  "invalidpassword": "Password does not meet security requirements. Must be 8-100 characters with at least one uppercase letter, one number, and one special character.",
  "http": {
    "400": "Bad request"
  }
}
```

**Option B: Fix the reducer to use correct translation key**

Change `password.reducer.ts`:

```typescript
if (errorResponse?.type?.includes('invalid-password')) {
  // Use the errorKey instead of hardcoded message
  return { ...axiosError, message: `error.${errorResponse.errorKey}` }; // → "error.invalidpassword"
}
```

### Solution 2: Add Backend Password Strength Validation (Recommended)

Create `PasswordValidator.java`:

```java
package com.langleague.app.service;

import java.util.regex.Pattern;

public class PasswordValidator {

  private static final int MIN_LENGTH = 8;
  private static final int MAX_LENGTH = 100;

  // Must have: 1 uppercase, 1 number, 1 special char, min 8 chars
  private static final Pattern PASSWORD_PATTERN = Pattern.compile(
    "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!\"#$%&'()*+,-./:;<=>?@\\[\\]^_`{|}~]).{8,}$"
  );

  public static boolean isValid(String password) {
    if (password == null || password.isEmpty()) {
      return false;
    }

    if (password.length() < MIN_LENGTH || password.length() > MAX_LENGTH) {
      return false;
    }

    return PASSWORD_PATTERN.matcher(password).matches();
  }

  public static String getRequirements() {
    return "Password must be 8-100 characters with at least one uppercase letter, one number, and one special character";
  }
}

```

Update `AccountResource.java`:

```java
@PostMapping(path = "/account/change-password")
public void changePassword(@RequestBody PasswordChangeDTO passwordChangeDto) {
  if (!PasswordValidator.isValid(passwordChangeDto.getNewPassword())) {
    throw new InvalidPasswordException();
  }
  userService.changePassword(passwordChangeDto.getCurrentPassword(), passwordChangeDto.getNewPassword());
}

```

### Solution 3: Improve Error Handling

Update `password.reducer.ts`:

```typescript
.addCase(savePassword.rejected, (state, action) => {
  state.loading = false;
  state.updateSuccess = false;
  state.updateFailure = true;

  // Use translated error message, fallback to generic message
  const errorMsg = action.error.message;
  if (errorMsg && errorMsg.startsWith('error.')) {
    state.errorMessage = errorMsg;  // Will be translated by translate()
  } else if (errorMsg && errorMsg.startsWith('global.')) {
    state.errorMessage = errorMsg;  // Will be translated by translate()
  } else {
    state.errorMessage = 'password.messages.error';  // Generic fallback
  }
})
```

---

## Testing Scenarios

### Test 1: Valid Strong Password

- **Input:** "MyPass123!"
- **Expected:** ✅ Success - Password updated
- **Frontend:** ✅ Validates
- **Backend:** ✅ Accepts

### Test 2: Weak Password (No Uppercase)

- **Input:** "mypass123!"
- **Expected:** ❌ Frontend blocks
- **Frontend:** ❌ Shows "Password is too weak"
- **Backend:** N/A (never reaches)

### Test 3: Weak Password (Too Short)

- **Input:** "Pass1!"
- **Expected:** ❌ Frontend blocks
- **Frontend:** ❌ Shows "At least 8 characters"
- **Backend:** N/A (never reaches)

### Test 4: Password Too Long

- **Input:** 101 characters
- **Expected:** ❌ Frontend blocks
- **Frontend:** ❌ Shows "Cannot be longer than 100 characters"
- **Backend:** Would reject if reached

### Test 5: Direct API Call (Bypass Frontend)

- **Input:** "password" (weak, but length OK)
- **Current:** ❌ Shows translation key
- **After Fix:** ✅ Shows proper error message

---

## Recommended Implementation Order

### Phase 1: Quick Fix (Immediate)

1. ✅ Add missing translation to `global.json`
2. ✅ Fix `password.reducer.ts` to use correct translation key
3. ✅ Test error display

### Phase 2: Backend Enhancement (Short-term)

1. ✅ Create `PasswordValidator.java`
2. ✅ Update `AccountResource.java` to use validator
3. ✅ Add unit tests for password validation
4. ✅ Update API documentation

### Phase 3: Consistency Check (Medium-term)

1. ✅ Ensure all password forms use same validation
   - Registration (`register.tsx`)
   - Password reset (`password-reset-finish.tsx`)
   - Admin user creation (`user-management-create.tsx`)
2. ✅ Update all i18n files (en, vi, ja, ko, zh_CN, zh_TW)
3. ✅ Add integration tests

---

## Files to Modify

### Frontend

1. ✅ `src/main/webapp/app/modules/account/password/password.reducer.ts`
2. ✅ `src/main/webapp/i18n/en/global.json` (and other languages)
3. ⚠️ Consider: `password-reset-finish.tsx`, `register.tsx`

### Backend

1. ✅ Create: `src/main/java/com/langleague/app/service/PasswordValidator.java`
2. ✅ Update: `src/main/java/com/langleague/app/web/rest/AccountResource.java`
3. ✅ Update: `src/main/java/com/langleague/app/web/rest/errors/InvalidPasswordException.java`
4. ✅ Add: `src/test/java/com/langleague/app/service/PasswordValidatorTest.java`

---

## Summary

### What Causes the Error?

1. Backend throws `InvalidPasswordException` with errorKey: `"invalidpassword"`
2. Frontend reducer catches error and maps to translation key: `"global.messages.validate.newpassword.strength"`
3. This key translates to "Password strength:" (a label, not an error)
4. User sees raw translation key or wrong message

### How to Fix?

1. **Add missing translation**: `error.invalidpassword` → "Password does not meet requirements"
2. **Fix reducer**: Use `error.invalidpassword` instead of `global.messages.validate.newpassword.strength`
3. **Add backend validation**: Validate password strength (uppercase, number, special char), not just length
4. **Ensure consistency**: Frontend and backend validate same rules

### Why This Matters?

- **Security**: Weak passwords can be accepted if frontend is bypassed
- **UX**: Users see confusing error messages (translation keys)
- **Consistency**: Frontend and backend should enforce same rules

---

## Next Steps

1. Review this analysis
2. Choose solution approach (quick fix vs. comprehensive)
3. Implement changes
4. Test thoroughly
5. Update documentation
6. Consider adding password strength meter improvements

---

**Status:** ANALYSIS COMPLETE - Ready for implementation
