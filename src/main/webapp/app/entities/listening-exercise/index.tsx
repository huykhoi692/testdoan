import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ListeningExercise from './listening-exercise';
import ListeningExerciseDetail from './listening-exercise-detail';
import ListeningExerciseUpdate from './listening-exercise-update';
import ListeningExerciseDeleteDialog from './listening-exercise-delete-dialog';

const ListeningExerciseRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ListeningExercise />} />
    <Route path="new" element={<ListeningExerciseUpdate />} />
    <Route path=":id">
      <Route index element={<ListeningExerciseDetail />} />
      <Route path="edit" element={<ListeningExerciseUpdate />} />
      <Route path="delete" element={<ListeningExerciseDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ListeningExerciseRoutes;
