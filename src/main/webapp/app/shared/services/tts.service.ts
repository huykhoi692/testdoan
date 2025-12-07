import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyCICuOBfy1Q-AFo9zNPiR4QZLatVfkPLMg';
const GEMINI_TTS_API = 'https://texttospeech.googleapis.com/v1/text:synthesize';

interface TTSRequest {
  input: {
    text: string;
  };
  voice: {
    languageCode: string;
    name?: string;
    ssmlGender?: 'MALE' | 'FEMALE' | 'NEUTRAL';
  };
  audioConfig: {
    audioEncoding: string;
    speakingRate?: number;
    pitch?: number;
  };
}

/**
 * Text-to-Speech service using Google Cloud Text-to-Speech API
 */
class TTSService {
  private audioCache: Map<string, string> = new Map();

  /**
   * Convert text to speech and play audio
   * @param text - Text to convert to speech
   * @param languageCode - Language code (e.g., 'ko-KR' for Korean, 'en-US' for English)
   */
  async speak(text: string, languageCode: string = 'ko-KR'): Promise<void> {
    try {
      // Check cache first
      const cacheKey = `${text}_${languageCode}`;
      if (this.audioCache.has(cacheKey)) {
        const audioDataUrl = this.audioCache.get(cacheKey);
        await this.playAudio(audioDataUrl);
        return;
      }

      // Prepare TTS request
      const request: TTSRequest = {
        input: { text },
        voice: {
          languageCode,
          ssmlGender: 'FEMALE',
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 0.9,
          pitch: 0,
        },
      };

      // Call Google TTS API
      const response = await axios.post(`${GEMINI_TTS_API}?key=${GEMINI_API_KEY}`, request, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data && response.data.audioContent) {
        // Convert base64 audio to data URL
        const audioDataUrl = `data:audio/mp3;base64,${response.data.audioContent}`;

        // Cache the audio
        this.audioCache.set(cacheKey, audioDataUrl);

        // Play the audio
        await this.playAudio(audioDataUrl);
      }
    } catch (error) {
      console.error('Error in text-to-speech:', error);
      // Fallback to browser's speech synthesis
      try {
        this.fallbackSpeak(text, languageCode);
      } catch (e) {
        // ensure any rejection is an Error object to satisfy ESLint rule
        throw e instanceof Error ? e : new Error(String(e));
      }
    }
  }

  /**
   * Play audio from data URL
   */
  private async playAudio(audioDataUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(audioDataUrl);
      audio.onended = () => resolve();
      audio.onerror = () => reject(new Error('Failed to play audio'));
      audio.play().catch(error => reject(error instanceof Error ? error : new Error(String(error))));
    });
  }

  /**
   * Fallback to browser's built-in speech synthesis
   */
  private fallbackSpeak(text: string, languageCode: string): void {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageCode;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Speech synthesis not supported in this browser');
    }
  }

  /**
   * Clear audio cache
   */
  clearCache(): void {
    this.audioCache.clear();
  }
}

// Export singleton instance
export const ttsService = new TTSService();
