import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from 'app/config/store';
import './student-dashboard.scss';

const ENROLLED_COURSES = [
  {
    id: 1,
    title: 'Introduction to Physics',
    description: 'A comprehensive guide to the basics of physics. Explore the mysteries and natural world.',
    progress: 75,
    coverColor: '#2d5f5d',
    status: 'ACTIVE',
    image: '/content/images/course-physics.png',
  },
  {
    id: 2,
    title: 'Modern History',
    description: 'Explore the major events of the 20th century. Understanding the transformation of the world.',
    progress: 45,
    coverColor: '#f4d5b8',
    status: 'ACTIVE',
    image: '/content/images/course-history.png',
  },
  {
    id: 3,
    title: 'Calculus I',
    description: 'Derivatives, integrals, and limits explained in a fun and simple manner.',
    progress: 100,
    coverColor: '#3d6060',
    status: 'COMPLETED',
    image: '/content/images/course-calculus.png',
  },
  {
    id: 4,
    title: 'Creative Writing',
    description: 'Unlock your imagination and master the art of storytelling.',
    progress: 30,
    coverColor: '#1e3a5f',
    status: 'ENROLLED',
    image: '/content/images/course-writing.png',
  },
  {
    id: 5,
    title: 'Cybersecurity 101',
    description: 'Protect digital assets and understand modern network security principles.',
    progress: 60,
    coverColor: '#1a1a1a',
    status: 'ACTIVE',
    image: '/content/images/course-cyber.png',
  },
  {
    id: 6,
    title: 'Intro to Biology',
    description: 'Understand the complex systems of life, from cells to ecosystems.',
    progress: 20,
    coverColor: '#d4a574',
    status: 'ENROLLED',
    image: '/content/images/course-biology.png',
  },
];

export const StudentDashboard = () => {
  const account = useAppSelector(state => state.authentication.account);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'enrolled' | 'notEnroll'>('all');

  const filteredCourses = ENROLLED_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterTab === 'enrolled') {
      return matchesSearch && (course.status === 'ACTIVE' || course.status === 'COMPLETED');
    }
    if (filterTab === 'notEnroll') {
      return matchesSearch && course.status === 'ENROLLED';
    }
    return matchesSearch;
  });

  return (
    <div className="student-dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-section">
          <div className="logo-icon">◆</div>
          <span className="logo-text">LangLeague</span>
        </div>

        <nav className="nav-menu">
          <Link to="/student/dashboard" className="nav-item active">
            <i className="bi bi-house-door"></i>
            <span>Home</span>
          </Link>
          <Link to="/student/books" className="nav-item">
            <i className="bi bi-book"></i>
            <span>My Books</span>
          </Link>
          <Link to="/student/flashcards" className="nav-item">
            <i className="bi bi-credit-card-2-front"></i>
            <span>FlashCard</span>
          </Link>
          <Link to="/student/games" className="nav-item">
            <i className="bi bi-controller"></i>
            <span>Games</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Welcome back, Student!</h1>
            <p>Continue your learning journey or explore new topics.</p>
          </div>

          <div className="header-right">
            <div className="language-selector">
              <button className="lang-btn active">EN</button>
              <button className="lang-btn">VN</button>
            </div>
            <div className="user-avatar">
              <div className="avatar-circle">{account?.login?.[0]?.toUpperCase() || 'U'}</div>
            </div>
          </div>
        </header>

        {/* Search and Filter */}
        <div className="search-filter-section">
          <div className="search-wrapper">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search for books, courses, or topics..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-tabs">
            <button className={`filter-tab ${filterTab === 'all' ? 'active' : ''}`} onClick={() => setFilterTab('all')}>
              All
            </button>
            <button className={`filter-tab ${filterTab === 'enrolled' ? 'active' : ''}`} onClick={() => setFilterTab('enrolled')}>
              Enrolled
            </button>
            <button className={`filter-tab ${filterTab === 'notEnroll' ? 'active' : ''}`} onClick={() => setFilterTab('notEnroll')}>
              Not Enroll
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              {course.status === 'COMPLETED' && <div className="badge-completed">✓ COMPLETED</div>}
              {course.status === 'ENROLLED' && <div className="badge-enrolled">⊕ ENROLLED</div>}

              <div className="course-cover" style={{ backgroundColor: course.coverColor }}>
                <div className="course-placeholder">{course.title}</div>
              </div>

              <div className="course-info">
                <h3>{course.title}</h3>
                <p>{course.description}</p>

                {course.status !== 'ENROLLED' && (
                  <div className="progress-section">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <span className="progress-text">{course.progress}%</span>
                  </div>
                )}

                <button className="enroll-btn">
                  {course.status === 'COMPLETED' ? 'Review' : course.status === 'ENROLLED' ? 'Enroll Now →' : 'Continue Learning →'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="no-results">
            <i className="bi bi-search"></i>
            <p>No courses found matching your search.</p>
          </div>
        )}

        {/* Load More */}
        <div className="load-more-section">
          <button className="load-more-btn">
            Load more books <i className="bi bi-arrow-down"></i>
          </button>
        </div>

        {/* Footer */}
        <footer className="dashboard-footer">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="logo-icon">◆</div>
              <span>LangLeague</span>
            </div>

            <div className="footer-links">
              <div className="footer-section">
                <h4>Quick Links</h4>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/privacy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms">Terms of Service</Link>
                  </li>
                </ul>
              </div>

              <div className="footer-section">
                <h4>Contact Us</h4>
                <ul>
                  <li>
                    <i className="bi bi-envelope"></i>
                    <a href="mailto:support@bookflow.edu">support@bookflow.edu</a>
                  </li>
                  <li>
                    <i className="bi bi-telephone"></i>
                    <span>+1(555)123-4567</span>
                  </li>
                  <div className="social-icons">
                    <a href="#">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="bi bi-tiktok"></i>
                    </a>
                  </div>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} LangLeague. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default StudentDashboard;
