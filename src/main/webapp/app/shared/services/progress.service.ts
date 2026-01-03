import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IBookProgress, IChapterProgress } from '../model';

// ==================== BOOK PROGRESS APIs - Using UserBookResource ====================

// Get my books in progress - Using GET /api/user/my-books
export const getMyBooks = createAsyncThunk('progress/fetch_my_books', async () => {
  try {
    const response = await axios.get('/api/user/my-books');
    // Map UserBookDTO to IBookProgress
    const books = Array.isArray(response.data) ? response.data : [];
    return books.map((book: any) => ({
      id: book.id,
      userId: book.appUserId,
      bookId: book.bookId,
      bookTitle: book.bookTitle,
      bookThumbnail: book.bookThumbnail,
      progressPercentage: book.progressPercentage || 0,
      lastAccessedDate: book.lastAccessedAt,
      isCompleted: book.learningStatus === 'COMPLETED',
      completedDate: book.learningStatus === 'COMPLETED' ? book.lastAccessedAt : undefined,
    })) as IBookProgress[];
  } catch (error: any) {
    console.error('Error fetching my books:', error);
    return [];
  }
});

// Get progress for a specific book - Using GET /api/user/my-books/{bookId}/progress
export const getBookProgress = createAsyncThunk('progress/fetch_book', async (bookId: number) => {
  try {
    const response = await axios.get(`/api/user/my-books/${bookId}/progress`);
    const book = response.data;
    return {
      id: book.id,
      userId: book.appUserId,
      bookId: book.bookId,
      progressPercentage: book.progressPercentage || 0,
      lastAccessedDate: book.lastAccessedAt,
      isCompleted: book.learningStatus === 'COMPLETED',
      completedDate: book.learningStatus === 'COMPLETED' ? book.lastAccessedAt : undefined,
    } as IBookProgress;
  } catch (error: any) {
    console.error('Error fetching book progress:', error);
    return null;
  }
});

// Create or update book progress - Using PUT /api/user/my-books/{bookId}/progress
export const upsertBookProgress = createAsyncThunk('progress/upsert_book', async (progress: IBookProgress) => {
  try {
    if (!progress.bookId) {
      throw new Error('Book ID is required');
    }

    // Update progress using UserBookResource endpoint
    const response = await axios.put(`/api/user/my-books/${progress.bookId}/progress`, {
      progressPercentage: progress.progressPercentage || 0,
    });

    const book = response.data;
    return {
      id: book.id,
      userId: book.appUserId,
      bookId: book.bookId,
      progressPercentage: book.progressPercentage || 0,
      lastAccessedDate: book.lastAccessedAt,
      isCompleted: book.learningStatus === 'COMPLETED',
      completedDate: book.learningStatus === 'COMPLETED' ? book.lastAccessedAt : undefined,
    } as IBookProgress;
  } catch (error: any) {
    console.error('Error upserting book progress:', error);
    throw error;
  }
});

// Update book progress - Using PUT /api/user/my-books/{bookId}/progress
export const updateBookProgress = createAsyncThunk(
  'progress/update_book',
  async ({ id, progress }: { id: number; progress: IBookProgress }) => {
    try {
      const bookId = progress.bookId || id;
      const response = await axios.put(`/api/user/my-books/${bookId}/progress`, {
        progressPercentage: progress.progressPercentage || 0,
      });

      const book = response.data;
      return {
        id: book.id,
        userId: book.appUserId,
        bookId: book.bookId,
        progressPercentage: book.progressPercentage || 0,
        lastAccessedDate: book.lastAccessedAt,
        isCompleted: book.learningStatus === 'COMPLETED',
        completedDate: book.learningStatus === 'COMPLETED' ? book.lastAccessedAt : undefined,
      } as IBookProgress;
    } catch (error: any) {
      console.error('Error updating book progress:', error);
      throw error;
    }
  },
);

// Delete book progress - Using DELETE /api/user/my-books/{bookId}
export const deleteBookProgress = createAsyncThunk('progress/delete_book', async (id: number) => {
  await axios.delete(`/api/user/my-books/${id}`);
  return { id };
});

// ==================== CHAPTER PROGRESS APIs ====================

// Get my chapter progresses - Using GET /api/chapter-progresses/my-chapters
export const getMyChapters = createAsyncThunk('progress/fetch_my_chapters', async () => {
  try {
    const response = await axios.get<IChapterProgress[]>('/api/chapter-progresses/my-chapters');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error: any) {
    console.error('Error fetching my chapters:', error);
    return [];
  }
});

// Get progress for a specific chapter - Matches GET /api/chapter-progresses/chapter/{chapterId}
export const getChapterProgress = createAsyncThunk('progress/fetch_chapter', async (chapterId: number) => {
  try {
    const response = await axios.get<IChapterProgress>(`/api/chapter-progresses/chapter/${chapterId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching chapter progress:', error);
    return null;
  }
});

// Get all chapter progresses for a book - Matches GET /api/chapter-progresses/book/{bookId}
export const getChapterProgressesByBook = createAsyncThunk('progress/fetch_chapters_by_book', async (bookId: number) => {
  try {
    const response = await axios.get<IChapterProgress[]>(`/api/chapter-progresses/book/${bookId}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error: any) {
    console.error('Error fetching chapter progresses:', error);
    return [];
  }
});

// Create or update chapter progress (UPSERT) - Matches POST /api/chapter-progresses
export const upsertChapterProgress = createAsyncThunk('progress/upsert_chapter', async (progress: IChapterProgress) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const response = await axios.post<IChapterProgress>('/api/chapter-progresses', progress, {
    headers: {
      'X-Timezone': timezone,
    },
  });
  return response.data;
});

// Update chapter progress - Matches PUT /api/chapter-progresses/{id}
export const updateChapterProgress = createAsyncThunk(
  'progress/update_chapter',
  async ({ id, progress }: { id: number; progress: IChapterProgress }) => {
    const response = await axios.put<IChapterProgress>(`/api/chapter-progresses/${id}`, progress);
    return response.data;
  },
);

// Delete chapter progress
export const deleteChapterProgress = createAsyncThunk('progress/delete_chapter', async (id: number) => {
  await axios.delete(`/api/chapter-progresses/${id}`);
  return { id };
});

// Enroll in a book (Start Learning) - Using POST /api/user/my-books/enroll/{bookId}
export const enrollBook = createAsyncThunk('progress/enroll_book', async (bookId: number) => {
  try {
    const response = await axios.post(`/api/user/my-books/enroll/${bookId}`);
    const book = response.data;
    return {
      id: book.id,
      userId: book.appUserId,
      bookId: book.bookId,
      progressPercentage: book.progressPercentage || 0,
      lastAccessedDate: book.lastAccessedAt,
      isCompleted: book.learningStatus === 'COMPLETED',
      completedDate: book.learningStatus === 'COMPLETED' ? book.lastAccessedAt : undefined,
    } as IBookProgress;
  } catch (error: any) {
    console.error('Error enrolling in book:', error);
    throw error;
  }
});

// Mark chapter as completed - Using POST /api/chapter-progresses/{chapterId}/complete
export const markChapterAsCompleted = createAsyncThunk('progress/complete_chapter', async (chapterId: number) => {
  try {
    await axios.post(`/api/chapter-progresses/${chapterId}/complete`);
    // Return minimal progress object to update state
    return {
      chapterId,
      completed: true,
      isCompleted: true,
      percent: 100,
      progress: 100,
      // completedDate: new Date().toISOString(), // Not in interface currently
    } as IChapterProgress;
  } catch (error: any) {
    console.error('Error marking chapter as completed:', error);
    throw error;
  }
});

// ==================== HELPER FUNCTIONS ====================

// Plain async functions for direct usage (without Redux)
export const getMyBooksApi = async (): Promise<IBookProgress[]> => {
  try {
    const response = await axios.get('/api/user/my-books');
    const books = Array.isArray(response.data) ? response.data : [];
    return books.map((book: any) => ({
      id: book.id,
      userId: book.appUserId,
      bookId: book.bookId,
      progressPercentage: book.progressPercentage || 0,
      lastAccessedDate: book.lastAccessedAt,
      isCompleted: book.learningStatus === 'COMPLETED',
      completedDate: book.learningStatus === 'COMPLETED' ? book.lastAccessedAt : undefined,
    })) as IBookProgress[];
  } catch (error: any) {
    console.error('Error fetching my books:', error);
    return [];
  }
};

export const getBookProgressApi = async (bookId: number): Promise<IBookProgress | null> => {
  try {
    const response = await axios.get(`/api/user/my-books/${bookId}/progress`);
    const book = response.data;
    return {
      id: book.id,
      userId: book.appUserId,
      bookId: book.bookId,
      progressPercentage: book.progressPercentage || 0,
      lastAccessedDate: book.lastAccessedAt,
      isCompleted: book.learningStatus === 'COMPLETED',
      completedDate: book.learningStatus === 'COMPLETED' ? book.lastAccessedAt : undefined,
    } as IBookProgress;
  } catch (error: any) {
    console.error('Error fetching book progress:', error);
    return null;
  }
};

export const getChapterProgressApi = async (chapterId: number): Promise<IChapterProgress | null> => {
  try {
    const response = await axios.get<IChapterProgress>(`/api/chapter-progresses/chapter/${chapterId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching chapter progress:', error);
    return null;
  }
};

export const upsertBookProgressApi = async (progress: IBookProgress): Promise<IBookProgress> => {
  if (!progress.bookId) {
    throw new Error('Book ID is required');
  }

  const response = await axios.put(`/api/user/my-books/${progress.bookId}/progress`, {
    progressPercentage: progress.progressPercentage || 0,
  });

  const book = response.data;
  return {
    id: book.id,
    userId: book.appUserId,
    bookId: book.bookId,
    progressPercentage: book.progressPercentage || 0,
    lastAccessedDate: book.lastAccessedAt,
    isCompleted: book.learningStatus === 'COMPLETED',
    completedDate: book.learningStatus === 'COMPLETED' ? book.lastAccessedAt : undefined,
  } as IBookProgress;
};

export const upsertChapterProgressApi = async (progress: IChapterProgress): Promise<IChapterProgress> => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const response = await axios.post<IChapterProgress>('/api/chapter-progresses', progress, {
    headers: {
      'X-Timezone': timezone,
    },
  });
  return response.data;
};
