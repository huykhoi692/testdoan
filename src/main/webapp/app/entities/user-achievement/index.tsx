import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import UserAchievement from './user-achievement';
import UserAchievementDetail from './user-achievement-detail';
import UserAchievementUpdate from './user-achievement-update';
import UserAchievementDeleteDialog from './user-achievement-delete-dialog';

const UserAchievementRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<UserAchievement />} />
    <Route path="new" element={<UserAchievementUpdate />} />
    <Route path=":id">
      <Route index element={<UserAchievementDetail />} />
      <Route path="edit" element={<UserAchievementUpdate />} />
      <Route path="delete" element={<UserAchievementDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default UserAchievementRoutes;
