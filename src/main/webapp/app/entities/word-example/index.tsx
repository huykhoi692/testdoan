import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import WordExample from './word-example';
import WordExampleDetail from './word-example-detail';
import WordExampleUpdate from './word-example-update';
import WordExampleDeleteDialog from './word-example-delete-dialog';

const WordExampleRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<WordExample />} />
    <Route path="new" element={<WordExampleUpdate />} />
    <Route path=":id">
      <Route index element={<WordExampleDetail />} />
      <Route path="edit" element={<WordExampleUpdate />} />
      <Route path="delete" element={<WordExampleDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default WordExampleRoutes;
