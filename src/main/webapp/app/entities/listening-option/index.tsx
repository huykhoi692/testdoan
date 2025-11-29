import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from '../../shared/error/error-boundary-routes';

import ListeningOption from './listening-option';
import ListeningOptionDetail from './listening-option-detail';
import ListeningOptionUpdate from './listening-option-update';
import ListeningOptionDeleteDialog from './listening-option-delete-dialog';

const ListeningOptionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ListeningOption />} />
    <Route path="new" element={<ListeningOptionUpdate />} />
    <Route path=":id">
      <Route index element={<ListeningOptionDetail />} />
      <Route path="edit" element={<ListeningOptionUpdate />} />
      <Route path="delete" element={<ListeningOptionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ListeningOptionRoutes;
