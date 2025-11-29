import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from '../../shared/error/error-boundary-routes';

import StreakIcon from './streak-icon';
import StreakIconDetail from './streak-icon-detail';
import StreakIconUpdate from './streak-icon-update';
import StreakIconDeleteDialog from './streak-icon-delete-dialog';

const StreakIconRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<StreakIcon />} />
    <Route path="new" element={<StreakIconUpdate />} />
    <Route path=":id">
      <Route index element={<StreakIconDetail />} />
      <Route path="edit" element={<StreakIconUpdate />} />
      <Route path="delete" element={<StreakIconDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default StreakIconRoutes;
