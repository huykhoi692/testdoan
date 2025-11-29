import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './shared/layout/main-layout';
import DashboardLayout from './shared/layout/dashboard-layout';

// Lazy load components
const Home = React.lazy(() => import('./modules/home/home'));
const Login = React.lazy(() => import('./modules/account/login-page'));
const Register = React.lazy(() => import('./modules/account/register-page'));
const Activate = React.lazy(() => import('./modules/account/activate/activate'));
const ForgotPassword = React.lazy(() => import('./modules/account/forgot-password-page'));
const ContactUs = React.lazy(() => import('./modules/home/contact-us'));
const Dashboard = React.lazy(() => import('./modules/dashboard/dashboard'));
const Profile = React.lazy(() => import('./modules/account/profile'));
const Settings = React.lazy(() => import('./modules/account/settings'));
const MyCourses = React.lazy(() => import('./modules/courses/my-courses'));
const VocabularyList = React.lazy(() => import('./modules/courses/vocabulary-list'));
const ReadingLesson = React.lazy(() => import('./modules/courses/reading-lesson'));

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with Header/Footer */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="activate" element={<Activate />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="contact" element={<ContactUs />} />
      </Route>

      {/* Dashboard Routes with Sidebar */}
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="courses" element={<MyCourses />} />
        <Route path="vocabulary" element={<VocabularyList />} />
        <Route path="lesson/:id" element={<ReadingLesson />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
