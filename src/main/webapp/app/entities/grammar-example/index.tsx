import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import GrammarExample from './grammar-example';
import GrammarExampleDetail from './grammar-example-detail';
import GrammarExampleUpdate from './grammar-example-update';
import GrammarExampleDeleteDialog from './grammar-example-delete-dialog';

const GrammarExampleRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<GrammarExample />} />
    <Route path="new" element={<GrammarExampleUpdate />} />
    <Route path=":id">
      <Route index element={<GrammarExampleDetail />} />
      <Route path="edit" element={<GrammarExampleUpdate />} />
      <Route path="delete" element={<GrammarExampleDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default GrammarExampleRoutes;
