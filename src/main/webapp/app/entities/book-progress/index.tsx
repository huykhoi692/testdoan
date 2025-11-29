import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import BookProgress from './book-progress';
import BookProgressDetail from './book-progress-detail';
import BookProgressUpdate from './book-progress-update';
import BookProgressDeleteDialog from './book-progress-delete-dialog';

const BookProgressRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<BookProgress />} />
    <Route path="new" element={<BookProgressUpdate />} />
    <Route path=":id">
      <Route index element={<BookProgressDetail />} />
      <Route path="edit" element={<BookProgressUpdate />} />
      <Route path="delete" element={<BookProgressDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BookProgressRoutes;
