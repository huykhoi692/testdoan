import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import UserVocabulary from './user-vocabulary';
import UserVocabularyDetail from './user-vocabulary-detail';
import UserVocabularyUpdate from './user-vocabulary-update';
import UserVocabularyDeleteDialog from './user-vocabulary-delete-dialog';

const UserVocabularyRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<UserVocabulary />} />
    <Route path="new" element={<UserVocabularyUpdate />} />
    <Route path=":id">
      <Route index element={<UserVocabularyDetail />} />
      <Route path="edit" element={<UserVocabularyUpdate />} />
      <Route path="delete" element={<UserVocabularyDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default UserVocabularyRoutes;
