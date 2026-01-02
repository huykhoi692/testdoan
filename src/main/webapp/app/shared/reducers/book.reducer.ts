import { createSlice, isFulfilled, isPending } from '@reduxjs/toolkit';
import { IBook, defaultValue } from 'app/shared/model/book.model';
import { EntityState } from 'app/shared/utils/reducer.utils';
import { getEntities, getEntity, createEntity, updateEntity, partialUpdateEntity, deleteEntity } from 'app/shared/services/book.service';

const initialState: EntityState<IBook> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  links: {
    next: 0,
  },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export const BookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload;
      })
      .addCase(deleteEntity.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const { data, totalCount } = action.payload;

        return {
          ...state,
          loading: false,
          entities: data,
          totalItems: parseInt(totalCount, 10),
        };
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload;
      })
      .addMatcher(isPending(getEntities, getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = BookSlice.actions;

// Re-export async thunks for components
export { getEntities, getEntity, createEntity, updateEntity, partialUpdateEntity, deleteEntity };

// Reducer
export default BookSlice.reducer;
