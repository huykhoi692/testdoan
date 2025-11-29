import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from '../../shared/error/error-boundary-routes';

import ReadingOption from './reading-option';
import ReadingOptionDetail from './reading-option-detail';
import ReadingOptionUpdate from './reading-option-update';
import ReadingOptionDeleteDialog from './reading-option-delete-dialog';

const ReadingOptionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ReadingOption />} />
    <Route path="new" element={<ReadingOptionUpdate />} />
    <Route path=":id">
      <Route index element={<ReadingOptionDetail />} />
      <Route path="edit" element={<ReadingOptionUpdate />} />
      <Route path="delete" element={<ReadingOptionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ReadingOptionRoutes;
