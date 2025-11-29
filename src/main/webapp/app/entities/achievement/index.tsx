import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Achievement from './achievement';
import AchievementDetail from './achievement-detail';
import AchievementUpdate from './achievement-update';
import AchievementDeleteDialog from './achievement-delete-dialog';

const AchievementRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Achievement />} />
    <Route path="new" element={<AchievementUpdate />} />
    <Route path=":id">
      <Route index element={<AchievementDetail />} />
      <Route path="edit" element={<AchievementUpdate />} />
      <Route path="delete" element={<AchievementDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AchievementRoutes;
