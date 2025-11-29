import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from '../../shared/error/error-boundary-routes';

import SpeakingExercise from './speaking-exercise';
import SpeakingExerciseDetail from './speaking-exercise-detail';
import SpeakingExerciseUpdate from './speaking-exercise-update';
import SpeakingExerciseDeleteDialog from './speaking-exercise-delete-dialog';

const SpeakingExerciseRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SpeakingExercise />} />
    <Route path="new" element={<SpeakingExerciseUpdate />} />
    <Route path=":id">
      <Route index element={<SpeakingExerciseDetail />} />
      <Route path="edit" element={<SpeakingExerciseUpdate />} />
      <Route path="delete" element={<SpeakingExerciseDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SpeakingExerciseRoutes;
