import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import StreakMilestone from './streak-milestone';
import StreakMilestoneDetail from './streak-milestone-detail';
import StreakMilestoneUpdate from './streak-milestone-update';
import StreakMilestoneDeleteDialog from './streak-milestone-delete-dialog';

const StreakMilestoneRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<StreakMilestone />} />
    <Route path="new" element={<StreakMilestoneUpdate />} />
    <Route path=":id">
      <Route index element={<StreakMilestoneDetail />} />
      <Route path="edit" element={<StreakMilestoneUpdate />} />
      <Route path="delete" element={<StreakMilestoneDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default StreakMilestoneRoutes;
