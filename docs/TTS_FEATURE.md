# Text-to-Speech Feature Documentation

## Overview

LangLeague now supports Text-to-Speech (TTS) functionality using Google Cloud Text-to-Speech API powered by Gemini AI. Users can click the speaker icon next to vocabulary words to hear the pronunciation.

## Features

- ✅ Korean pronunciation using Google TTS API
- ✅ Audio caching to improve performance
- ✅ Fallback to browser's built-in speech synthesis
- ✅ Visual feedback during audio playback
- ✅ Loading state on speaker button

## API Configuration

- **Service**: Google Cloud Text-to-Speech API
- **API Key**: AIzaSyCICuOBfy1Q-AFo9zNPiR4QZLatVfkPLMg
- **Language**: Korean (ko-KR)
- **Voice**: Female, Natural
- **Audio Format**: MP3

## Implementation Details

### Files Modified/Created

1. **New Service**: `src/main/webapp/app/shared/services/tts.service.ts`
   - Handles Google TTS API calls
   - Implements audio caching
   - Provides fallback to browser speech synthesis

2. **Updated Component**: `src/main/webapp/app/modules/courses/vocabulary-list.tsx`
   - Integrated TTS service
   - Added loading state for audio playback
   - Updated UI to show speaker icon with loading animation

### Usage

```typescript
import { ttsService } from 'app/shared/services/tts.service';

// Play Korean text
await ttsService.speak('안녕하세요', 'ko-KR');

// Play English text
await ttsService.speak('Hello', 'en-US');
```

### User Interface

- **Speaker Icon**: Click the speaker icon (🔊) next to any vocabulary word
- **Loading State**: Icon changes to loading spinner while playing
- **Disabled State**: Other speaker buttons are disabled during playback

## Configuration

The TTS service can be configured in `tts.service.ts`:

```typescript
const request: TTSRequest = {
  input: { text },
  voice: {
    languageCode,
    ssmlGender: 'FEMALE', // Can be 'MALE', 'FEMALE', or 'NEUTRAL'
  },
  audioConfig: {
    audioEncoding: 'MP3',
    speakingRate: 0.9, // Speed (0.25 to 4.0)
    pitch: 0, // Pitch (-20.0 to 20.0)
  },
};
```

## Error Handling

1. **Network Errors**: If Google API fails, automatically falls back to browser's speech synthesis
2. **Missing Audio**: Shows error message to user
3. **Browser Compatibility**: Gracefully handles browsers without speech synthesis support

## Future Enhancements

- [ ] Support for multiple languages (Japanese, Chinese, English)
- [ ] Voice selection (Male/Female/Neutral)
- [ ] Speed control slider
- [ ] Download audio option
- [ ] Offline audio caching with IndexedDB

## Testing

To test the TTS feature:

1. Navigate to any chapter's vocabulary list
2. Click the speaker icon next to any Korean word
3. Verify audio plays correctly
4. Check that loading animation shows during playback
5. Verify other buttons are disabled during playback

## API Limits

Google Cloud TTS API has the following limits:

- Free tier: 1 million characters per month
- Rate limit: 600 requests per minute

Consider implementing:

- Request throttling
- Audio file caching on server
- Pre-generation of common vocabulary audio

## Security Notes

⚠️ **Important**: The API key is currently hardcoded in the service. For production:

- Move API key to environment variables
- Implement server-side proxy to hide API key
- Add request authentication
- Monitor API usage

## Support

For issues or questions about the TTS feature, contact the development team.
