import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import WritingExercise from './writing-exercise';
import WritingExerciseDetail from './writing-exercise-detail';
import WritingExerciseUpdate from './writing-exercise-update';
import WritingExerciseDeleteDialog from './writing-exercise-delete-dialog';

const WritingExerciseRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<WritingExercise />} />
    <Route path="new" element={<WritingExerciseUpdate />} />
    <Route path=":id">
      <Route index element={<WritingExerciseDetail />} />
      <Route path="edit" element={<WritingExerciseUpdate />} />
      <Route path="delete" element={<WritingExerciseDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default WritingExerciseRoutes;
