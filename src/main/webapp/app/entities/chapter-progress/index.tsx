import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ChapterProgress from './chapter-progress';
import ChapterProgressDetail from './chapter-progress-detail';
import ChapterProgressUpdate from './chapter-progress-update';
import ChapterProgressDeleteDialog from './chapter-progress-delete-dialog';

const ChapterProgressRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ChapterProgress />} />
    <Route path="new" element={<ChapterProgressUpdate />} />
    <Route path=":id">
      <Route index element={<ChapterProgressDetail />} />
      <Route path="edit" element={<ChapterProgressUpdate />} />
      <Route path="delete" element={<ChapterProgressDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ChapterProgressRoutes;
