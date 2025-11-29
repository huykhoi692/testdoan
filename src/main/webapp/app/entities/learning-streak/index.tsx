import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import LearningStreak from './learning-streak';
import LearningStreakDetail from './learning-streak-detail';
import LearningStreakUpdate from './learning-streak-update';
import LearningStreakDeleteDialog from './learning-streak-delete-dialog';

const LearningStreakRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<LearningStreak />} />
    <Route path="new" element={<LearningStreakUpdate />} />
    <Route path=":id">
      <Route index element={<LearningStreakDetail />} />
      <Route path="edit" element={<LearningStreakUpdate />} />
      <Route path="delete" element={<LearningStreakDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default LearningStreakRoutes;
