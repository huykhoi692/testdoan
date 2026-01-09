import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import './book-list.scss';

export const BookList = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(state => state.book?.entities || []);
  const loading = useAppSelector(state => state.book?.loading || false);

  useEffect(() => {
    // TODO: Fetch books from API
    // dispatch(getBooks());
  }, []);

  const mockBooks = [
    {
      id: 1,
      title: 'Introduction to Physics',
      description: 'Learn the fundamentals of physics',
      coverImage: '/content/images/book-physics.png',
      level: 'Beginner',
      lessons: 12,
    },
    {
      id: 2,
      title: 'English Grammar',
      description: 'Master English grammar rules',
      coverImage: '/content/images/book-grammar.png',
      level: 'Intermediate',
      lessons: 24,
    },
    {
      id: 3,
      title: 'Mathematics',
      description: 'Essential math concepts',
      coverImage: '/content/images/book-math.png',
      level: 'Advanced',
      lessons: 18,
    },
  ];

  if (loading) {
    return <div className="loading">Loading books...</div>;
  }

  return (
    <div className="book-list-container">
      <div className="book-list-header">
        <h1>Available Books</h1>
        <p>Choose a book to start learning</p>
      </div>

      <div className="book-grid">
        {mockBooks.map(book => (
          <Link key={book.id} to={`/student/books/${book.id}`} className="book-card">
            <div className="book-cover">
              <img src={book.coverImage} alt={book.title} onError={e => (e.currentTarget.src = '/content/images/default-book.png')} />
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p className="book-description">{book.description}</p>
              <div className="book-meta">
                <span className="book-level">{book.level}</span>
                <span className="book-lessons">{book.lessons} lessons</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookList;
