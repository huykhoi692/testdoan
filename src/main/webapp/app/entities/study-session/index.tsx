import React from 'react';
import { Route } from 'react-router';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import StudySession from './study-session';
import StudySessionDetail from './study-session-detail';
import StudySessionUpdate from './study-session-update';
import StudySessionDeleteDialog from './study-session-delete-dialog';

const StudySessionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<StudySession />} />
    <Route path="new" element={<StudySessionUpdate />} />
    <Route path=":id">
      <Route index element={<StudySessionDetail />} />
      <Route path="edit" element={<StudySessionUpdate />} />
      <Route path="delete" element={<StudySessionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default StudySessionRoutes;
