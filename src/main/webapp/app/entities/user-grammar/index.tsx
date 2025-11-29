import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import UserGrammar from './user-grammar';
import UserGrammarDetail from './user-grammar-detail';
import UserGrammarUpdate from './user-grammar-update';
import UserGrammarDeleteDialog from './user-grammar-delete-dialog';

const UserGrammarRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<UserGrammar />} />
    <Route path="new" element={<UserGrammarUpdate />} />
    <Route path=":id">
      <Route index element={<UserGrammarDetail />} />
      <Route path="edit" element={<UserGrammarUpdate />} />
      <Route path="delete" element={<UserGrammarDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default UserGrammarRoutes;
