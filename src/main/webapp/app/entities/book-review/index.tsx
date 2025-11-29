import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import BookReview from './book-review';
import BookReviewDetail from './book-review-detail';
import BookReviewUpdate from './book-review-update';
import BookReviewDeleteDialog from './book-review-delete-dialog';

const BookReviewRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<BookReview />} />
    <Route path="new" element={<BookReviewUpdate />} />
    <Route path=":id">
      <Route index element={<BookReviewDetail />} />
      <Route path="edit" element={<BookReviewUpdate />} />
      <Route path="delete" element={<BookReviewDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BookReviewRoutes;
