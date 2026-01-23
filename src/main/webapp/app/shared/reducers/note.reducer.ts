import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { INote, defaultValue } from 'app/shared/model/note.model';

const initialState = {
  loading: false,
  errorMessage: null as string | null,
  entities: [] as ReadonlyArray<INote>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
  hasNoteForUnit: false, // New: track if unit has note
  currentNote: null as INote | null, // New: single note for unit
};

const apiUrl = 'api/notes';

// Actions

export const getNotesByUnit = createAsyncThunk('note/fetch_entity_list', async (unitId: string | number, { signal }) => {
  const requestUrl = `${apiUrl}?unitId.equals=${unitId}&sort=createdAt,desc`;
  return axios.get<INote[]>(requestUrl, { signal });
});

export const checkNoteForUnit = createAsyncThunk('note/check_unit', async (unitId: string | number) => {
  const requestUrl = `${apiUrl}/check-unit/${unitId}`;
  return axios.get<boolean>(requestUrl);
});

export const getNoteByUnit = createAsyncThunk('note/get_by_unit', async (unitId: string | number) => {
  const requestUrl = `${apiUrl}/by-unit/${unitId}`;
  return axios.get<INote>(requestUrl);
});

export const createNote = createAsyncThunk(
  'note/create_entity',
  async (entity: INote, thunkAPI) => {
    const result = await axios.post<INote>(apiUrl, entity);
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const updateNote = createAsyncThunk(
  'note/update_entity',
  async (entity: INote, thunkAPI) => {
    const result = await axios.put<INote>(`${apiUrl}/${entity.id}`, entity);
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const deleteNote = createAsyncThunk(
  'note/delete_entity',
  async ({ id, unitId }: { id: number; unitId: number }, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    // The thunk now returns the result of the axios call, but we won't use it in the reducer.
    // The ID for filtering will be taken from action.meta.arg
    return axios.delete(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

// Slice

export const NoteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
    clearError(state) {
      state.errorMessage = null;
    },
  },
  extraReducers(builder) {
    builder
      // --- READ ACTIONS (Only affect loading) ---
      .addCase(getNotesByUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload.data;
        state.hasNoteForUnit = action.payload.data.length > 0;
        state.currentNote = action.payload.data.length > 0 ? action.payload.data[0] : null;
      })
      .addCase(checkNoteForUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.hasNoteForUnit = action.payload.data;
      })
      .addCase(getNoteByUnit.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNote = action.payload.data;
        state.hasNoteForUnit = true;
      })
      .addCase(getNoteByUnit.rejected, state => {
        state.loading = false;
        state.currentNote = null;
        state.hasNoteForUnit = false;
      })

      // --- WRITE ACTIONS (Affect updating & loading) ---
      .addCase(createNote.fulfilled, (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.hasNoteForUnit = true;
        state.entities = [action.payload.data, ...state.entities];
        state.currentNote = action.payload.data;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entities = state.entities.map(note => (note.id === action.payload.data.id ? action.payload.data : note));
        state.currentNote = action.payload.data;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entities = state.entities.filter(note => note.id !== action.meta.arg.id);
        state.hasNoteForUnit = state.entities.length > 0;
        state.currentNote = state.entities.length > 0 ? state.entities[0] : null;
      })

      // --- MATCHERS ---

      // 1. Pending for WRITE actions -> Set updating = true
      .addMatcher(isPending(createNote, updateNote, deleteNote), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
        state.loading = true;
      })

      // 2. Pending for READ actions -> Only set loading = true
      .addMatcher(isPending(getNotesByUnit, checkNoteForUnit, getNoteByUnit), state => {
        state.errorMessage = null;
        state.loading = true;
        // Do NOT set updating = true here
      })

      // 3. Rejected for ALL actions -> Reset everything
      .addMatcher(isRejected(getNotesByUnit, createNote, updateNote, deleteNote, checkNoteForUnit, getNoteByUnit), (state, action) => {
        state.loading = false;
        state.updating = false; // Ensure button is unlocked on error
        state.updateSuccess = false;
        if (action.error.name !== 'AbortError' && !axios.isCancel(action.error)) {
          state.errorMessage = action.error.message;
        }
      });
  },
});

export const { reset, clearError } = NoteSlice.actions;

// Reducer
export default NoteSlice.reducer;
