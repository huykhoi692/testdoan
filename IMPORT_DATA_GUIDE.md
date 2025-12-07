# ✅ LangLeague TTS Feature - Import Data Guide

## 📋 Status Summary

✓ **Backend**: Running on port 8080  
✓ **Frontend**: Running on port 9060  
✓ **MySQL**: Running on port 3306  
✓ **TTS Service**: Implemented & Ready  
✓ **Seed Data**: Generated & Ready to Import

---

## 🚀 Quick Start - Import Data

### **Option 1: PowerShell (Windows) - RECOMMENDED**

```powershell
# Step 1: Copy seed file to container
docker cp E:\FPTSubs\DoAn\langleague_be\simple-seed.sql langleague-mysql-1:/tmp/seed.sql

# Step 2: Execute seed script inside container
docker exec langleague-mysql-1 sh -c "cat /tmp/seed.sql | mysql -uroot -p123456 langleague"
```

### **Option 2: Bash/WSL**

```bash
# Copy and execute in one command
docker exec langleague-mysql-1 sh -c "cat /tmp/seed.sql | mysql -uroot -p123456 langleague"
```

### **Option 3: MySQL Workbench GUI**

1. Open MySQL Workbench
2. Connect to `localhost:3306` (root/123456)
3. Select database `langleague`
4. File → Open SQL Script
5. Select `simple-seed.sql`
6. Execute (Ctrl+Shift+Enter)

---

## ✅ Verify Import Success

After importing, verify data:

```bash
# Check record counts
docker exec langleague-mysql-1 mysql -uroot -p123456 langleague -e \
  "SELECT 'Books:' as type, COUNT(*) count FROM book UNION ALL \
   SELECT 'Chapters:', COUNT(*) FROM chapter UNION ALL \
   SELECT 'Words:', COUNT(*) FROM word;"
```

**Expected Output:**

```
Books:     2
Chapters:  4
Words:     37
```

---

## 📊 What's Included in Seed Data

### **2 Books:**

- Basic Korean
- Daily Conversations

### **4 Chapters:**

1. Greetings (인사와 소개)
2. Family (가족)
3. Restaurant (식당에서)
4. Shopping (쇼핑)

### **37 Vocabulary Words** with:

- ✓ Korean/English text
- ✓ Vietnamese meaning
- ✓ Romanized pronunciation
- ✓ Part of speech (Noun, Verb, Adjective, etc.)
- ✓ Image URLs
- ✓ Chapter references

### **Sample Vocabulary:**

| Korean     | English   | Meaning  | Pronunciation      |
| ---------- | --------- | -------- | ------------------ |
| 안녕하세요 | Hello     | Xin chào | an-nyong-ha-say-yo |
| 감사합니다 | Thank you | Cảm ơn   | gam-sa-ham-ni-da   |
| 가족       | Family    | Gia đình | ga-jok             |
| 아버지     | Father    | Cha      | a-be-o-ji          |
| 음식       | Food      | Đồ ăn    | eum-sik            |
| 비빔밥     | Bibimbap  | Cơm trộn | bi-bim-bap         |

---

## 🎯 Test TTS Feature

After importing data:

### **Step 1: Access Frontend**

```
http://localhost:9060
```

### **Step 2: Navigate to Vocabulary**

- Login (if required)
- Go to: Courses → Vocabulary List → Select a Chapter
- Or directly access: `/courses/vocabulary/[chapterId]`

### **Step 3: Click Speaker Icon**

- Find any vocabulary word
- Click the **speaker icon (🔊)** next to the Korean text
- Listen to pronunciation via Google TTS API

### **Step 4: Verify Features**

- ✓ Audio plays correctly
- ✓ Loading spinner shows during playback
- ✓ Other buttons disabled while playing
- ✓ Multiple words can be played in sequence

---

## 🔧 Technical Details

### **TTS Service Configuration**

**File**: `src/main/webapp/app/shared/services/tts.service.ts`

```typescript
// API Configuration
const GEMINI_TTS_API = 'https://texttospeech.googleapis.com/v1/text:synthesize';
const GEMINI_API_KEY = 'AIzaSyCICuOBfy1Q-AFo9zNPiR4QZLatVfkPLMg';

// Settings
Language: 'ko-KR' (Korean)
Voice Gender: 'FEMALE'
Audio Format: 'MP3'
Speaking Rate: 0.9 (90% speed)
```

### **Component Integration**

**File**: `src/main/webapp/app/modules/courses/vocabulary-list.tsx`

```typescript
// Import TTS service
import { ttsService } from '../../shared/services/tts.service';

// Play pronunciation
await ttsService.speak(koreanText, 'ko-KR');

// Features:
✓ Audio caching (avoid repeated API calls)
✓ Fallback to browser speech synthesis
✓ Error handling with user feedback
✓ Loading state management
```

---

## 📱 UI/UX Features

### **Speaker Button Behavior:**

| State    | Icon | Color           | Action              |
| -------- | ---- | --------------- | ------------------- |
| Idle     | 🔊   | Blue (#667eea)  | Click to play       |
| Loading  | ⟳    | Green (#52c41a) | Spinner animation   |
| Disabled | 🔊   | Faded           | Other audio playing |
| Error    | ⚠    | Red             | Show error message  |

---

## 🛠️ Troubleshooting

### **No data after import?**

```bash
# Verify MySQL connection
docker exec langleague-mysql-1 mysql -uroot -p123456 -e "SHOW DATABASES;"
```

### **TTS not working?**

1. Check API key is correct
2. Verify Google Cloud TTS API is accessible
3. Check browser console for errors
4. Try fallback to browser speech synthesis

### **Frontend not loading data?**

1. Refresh page (Ctrl+F5)
2. Check Network tab in DevTools
3. Verify backend is running on port 8080
4. Check `/api/words` endpoint

---

## 📝 Files Reference

| File                       | Purpose                             |
| -------------------------- | ----------------------------------- |
| `simple-seed.sql`          | Seed data (37 words) - **USE THIS** |
| `seed-vocabulary-data.sql` | Full seed with users & progress     |
| `tts.service.ts`           | TTS implementation                  |
| `vocabulary-list.tsx`      | Vocabulary UI component             |
| `docs/TTS_FEATURE.md`      | Full documentation                  |
| `verify-seed.html`         | Web verification tool               |

---

## ✨ Ready to Use!

Everything is set up and ready. Just **import the seed data** and start using the TTS feature!

```bash
# Import now:
docker exec langleague-mysql-1 sh -c "cat /tmp/seed.sql | mysql -uroot -p123456 langleague"
```

Then visit: **http://localhost:9060**

🎉 **Enjoy learning Korean with LangLeague!**
