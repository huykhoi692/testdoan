import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from '../../shared/error/error-boundary-routes';

import ReadingExercise from './reading-exercise';
import ReadingExerciseDetail from './reading-exercise-detail';
import ReadingExerciseUpdate from './reading-exercise-update';
import ReadingExerciseDeleteDialog from './reading-exercise-delete-dialog';

const ReadingExerciseRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ReadingExercise />} />
    <Route path="new" element={<ReadingExerciseUpdate />} />
    <Route path=":id">
      <Route index element={<ReadingExerciseDetail />} />
      <Route path="edit" element={<ReadingExerciseUpdate />} />
      <Route path="delete" element={<ReadingExerciseDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ReadingExerciseRoutes;
