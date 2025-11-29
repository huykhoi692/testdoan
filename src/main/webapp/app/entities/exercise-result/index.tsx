import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ExerciseResult from './exercise-result';
import ExerciseResultDetail from './exercise-result-detail';
import ExerciseResultUpdate from './exercise-result-update';
import ExerciseResultDeleteDialog from './exercise-result-delete-dialog';

const ExerciseResultRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ExerciseResult />} />
    <Route path="new" element={<ExerciseResultUpdate />} />
    <Route path=":id">
      <Route index element={<ExerciseResultDetail />} />
      <Route path="edit" element={<ExerciseResultUpdate />} />
      <Route path="delete" element={<ExerciseResultDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ExerciseResultRoutes;
