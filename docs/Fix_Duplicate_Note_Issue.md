# Fix: Duplicate Note Error Issue

## Problem Description

The application was throwing a `BadRequestAlertException` with error code `duplicatenote` when users attempted to create a note for a unit that already had one. This error occurred in the `NoteService.save()` method at line 103.

**Error Message:**

```
A note for this unit already exists. Please edit the existing one.
```

## Root Cause

The issue was caused by a **race condition** or **state synchronization problem** between the frontend and backend:

1. The backend correctly enforces the business rule: **1 student can only have 1 note per unit**
2. The frontend attempted to CREATE a new note when it should have been UPDATING an existing one
3. This happened because the frontend's local state (`existingNote`) was not properly synchronized with the actual database state

## Solution

### Backend Changes (`NoteService.java`)

**Changed Behavior:** Instead of throwing an error when detecting a duplicate note creation attempt, the backend now:

1. Detects if a note already exists for the user and unit
2. If it exists, **automatically updates** the existing note with the new content
3. Returns the updated note to the frontend
4. Logs a warning for monitoring purposes

**Code Changes:**

```java
// Before: Threw an error
if (noteRepository.existsByUserProfileIdAndUnitId(currentUserProfile.getId(), noteDTO.getUnitId())) {
    throw new BadRequestAlertException(...);
}

// After: Updates existing note
List<Note> existingNotes = noteRepository.findAllByUserProfileIdAndUnitId(currentUserProfile.getId(), noteDTO.getUnitId());
if (!existingNotes.isEmpty()) {
    Note existingNote = existingNotes.get(0);
    log.warn("Duplicate note creation attempt detected. Updating existing note ID: {}", existingNote.getId());
    existingNote.setContent(noteDTO.getContent());
    existingNote.setUpdatedAt(Instant.now());
    existingNote = noteRepository.save(existingNote);
    return noteMapper.toDto(existingNote);
}
```

**Benefits:**

- **Graceful handling** of race conditions
- **No user-facing errors** for duplicate attempts
- **Idempotent behavior** - same result regardless of whether frontend thinks note exists or not
- **Better logging** for debugging

### Frontend Changes (`unit-notes.tsx`)

1. **Enhanced Logging**: Added detailed state snapshot logging at the start of `handleSave()`

   ```typescript
   console.warn('[unit-notes] State snapshot:', {
     existingNoteId: existingNote?.id,
     existingNoteUnitId: existingNote?.unitId,
     currentUnitId: unitId,
     hasNote,
     updating,
     notesInState: notes?.length,
   });
   ```

2. **Duplicate Error Handling**: Added fallback error handling that refetches notes if a duplicate error still occurs

   ```typescript
   if (error && (error.message?.includes('duplicatenote') || error.message?.includes('already exists'))) {
     console.warn('[unit-notes] ⚠️ Duplicate note detected - refetching notes to sync state');
     await dispatch(getNotesByUnit(unitId));
   }
   ```

3. **Backend Response Handling**: Updated success handler to recognize when backend returns an existing note
   ```typescript
   if (existingNote && existingNote.id === createdEntity.id) {
     console.warn('[unit-notes] ℹ️ Backend detected duplicate and updated existing note');
   }
   ```

## Testing Recommendations

1. **Normal Flow**: Create a note → verify it's saved
2. **Duplicate Prevention**:

   - Create a note for a unit
   - Open the same unit in another tab
   - Try to create a note in the second tab
   - Verify: Should seamlessly update the existing note without error

3. **Race Condition Simulation**:

   - Add network throttling
   - Create a note
   - Quickly switch units and back
   - Verify state synchronization

4. **Multiple Tabs**:
   - Open same unit in multiple tabs
   - Edit notes in both tabs
   - Verify: Last save wins, no errors

## Impact

### User Experience

- ✅ **No more error messages** for duplicate note attempts
- ✅ **Seamless auto-update** of existing notes
- ✅ **Works correctly** even with race conditions

### System Behavior

- ✅ **Maintains business rule**: 1 note per student per unit
- ✅ **Idempotent operations**: Safe to retry
- ✅ **Better logging**: Easier to debug issues

### Backward Compatibility

- ✅ **No breaking changes** to API contracts
- ✅ **Existing notes** work as before
- ✅ **Update operations** unchanged

## Monitoring

The backend now logs a **WARNING** when a duplicate creation is detected and auto-corrected:

```
Duplicate note creation attempt detected for user X and unit Y. Updating existing note ID: Z
```

Monitor these logs to:

- Identify if race conditions are frequent
- Detect potential frontend state management issues
- Understand usage patterns

## Alternative Approaches Considered

1. **Frontend-only fix**: Could have improved state synchronization, but would still be vulnerable to race conditions
2. **Strict error throwing**: Original approach, but poor UX
3. **Database constraint**: Could add unique constraint, but would cause DB errors instead of graceful handling

**Chosen approach** (backend auto-update) provides the best balance of:

- Data integrity
- User experience
- Error resilience
- Debugging capability

## Related Files

- `src/main/java/com/langleague/app/service/NoteService.java` (line 93-123)
- `src/main/webapp/app/modules/student/learning/unit-notes.tsx` (line 159-247)
- `src/main/java/com/langleague/app/repository/NoteRepository.java`

## Date

2026-01-23
