import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Input, Select, Spin, Empty, Tag, Avatar } from 'antd';
import { SearchOutlined, BookOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { PageHeader } from 'app/shared/components/PageHeader';
import './book-library.scss';

const { Meta } = Card;
const { Option } = Select;

interface Book {
  id: number;
  title: string;
  author?: string;
  level?: string;
  description?: string;
  thumbnail?: string;
  chapters: number;
  pages: number;
  progress?: number;
  status?: string;
}

export const BookLibrary: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: '82년생 김지영',
      author: '조남주 (Cho Nam-joo)',
      level: 'INTERMEDIATE',
      thumbnail: '/content/images/books/book1.jpg',
      chapters: 12,
      pages: 192,
      progress: 65,
      status: 'Đang học',
    },
    {
      id: 2,
      title: '미움받을 용기',
      author: '기시미 이치로 (Kishimi Ichiro)',
      level: 'INTERMEDIATE',
      thumbnail: '/content/images/books/book2.jpg',
      chapters: 15,
      pages: 336,
      progress: 0,
      status: 'Chưa bắt đầu',
    },
    {
      id: 3,
      title: '아몬드',
      author: '손원평 (Son Won-pyung)',
      level: 'ADVANCED',
      thumbnail: '/content/images/books/book3.jpg',
      chapters: 8,
      pages: 267,
      progress: 40,
      status: 'Đang học',
    },
    {
      id: 4,
      title: '채식주의자',
      author: '한강 (Han Kang)',
      level: 'ADVANCED',
      thumbnail: '/content/images/books/book4.jpg',
      chapters: 10,
      pages: 192,
      progress: 0,
      status: 'Chưa bắt đầu',
    },
    {
      id: 5,
      title: '달러구트 꿈 백화점',
      author: '이미예 (Lee Mi-ye)',
      level: 'BEGINNER',
      thumbnail: '/content/images/books/book5.jpg',
      chapters: 18,
      pages: 308,
      progress: 100,
      status: 'Hoàn thành',
    },
    {
      id: 6,
      title: '트렌드 코리아 2024',
      author: '김난도 외 (Kim Nan-do et al.)',
      level: 'UPPER_INTERMEDIATE',
      thumbnail: '/content/images/books/book6.jpg',
      chapters: 20,
      pages: 488,
      progress: 0,
      status: 'Chưa bắt đầu',
    },
  ]);

  useEffect(() => {
    // TODO: Fetch books from API
    setTimeout(() => setLoading(false), 800);
  }, []);

  const getLevelLabel = (level: string) => {
    const levelMap = {
      BEGINNER: { label: 'Sơ cấp', color: 'green' },
      INTERMEDIATE: { label: 'Trung cấp', color: 'blue' },
      ADVANCED: { label: 'Cao cấp', color: 'red' },
      UPPER_INTERMEDIATE: { label: 'Trung-Cao cấp', color: 'orange' },
      ELEMENTARY: { label: 'Cơ bản', color: 'cyan' },
    };
    return levelMap[level] || { label: level, color: 'default' };
  };

  const getStatusColor = (status: string) => {
    const statusMap = {
      'Hoàn thành': 'success',
      'Đang học': 'processing',
      'Chưa bắt đầu': 'default',
    };
    return statusMap[status] || 'default';
  };

  const filteredBooks = books.filter(book => {
    const matchSearch =
      book.title.toLowerCase().includes(searchText.toLowerCase()) || book.author?.toLowerCase().includes(searchText.toLowerCase());
    const matchLevel = selectedLevel === 'all' || book.level === selectedLevel;
    return matchSearch && matchLevel;
  });

  return (
    <div className="book-library">
      <PageHeader
        title="Thư Viện Sách Hàn Quốc"
        subtitle="Khám phá và học tiếng Hàn với hàng trăm cuốn sách Hàn Quốc được AI phân tích chi tiết"
      />

      {/* Filters */}
      <Card className="filter-card">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Input
              size="large"
              placeholder="Tìm kiếm theo tên sách, tác giả..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              size="large"
              placeholder="Tất cả các cấp độ"
              value={selectedLevel}
              onChange={value => setSelectedLevel(value)}
              style={{ width: '100%' }}
            >
              <Option value="all">Tất cả các cấp độ</Option>
              <Option value="BEGINNER">Sơ cấp</Option>
              <Option value="ELEMENTARY">Cơ bản</Option>
              <Option value="INTERMEDIATE">Trung cấp</Option>
              <Option value="UPPER_INTERMEDIATE">Trung-Cao cấp</Option>
              <Option value="ADVANCED">Cao cấp</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      {/* Books Grid */}
      <Spin spinning={loading}>
        {filteredBooks.length === 0 ? (
          <Empty description="Không tìm thấy sách nào" style={{ marginTop: 48 }} />
        ) : (
          <Row gutter={[16, 16]} className="books-grid">
            {filteredBooks.map(book => (
              <Col xs={24} sm={12} md={8} lg={6} key={book.id}>
                <Link to={`/dashboard/books/${book.id}`}>
                  <Card
                    hoverable
                    className="book-card"
                    cover={
                      <div className="book-cover">
                        {book.thumbnail ? (
                          <img alt={book.title} src={book.thumbnail} />
                        ) : (
                          <div className="book-placeholder">
                            <BookOutlined style={{ fontSize: 48, color: '#d1d5db' }} />
                          </div>
                        )}
                        {book.progress !== undefined && book.progress > 0 && (
                          <div className="book-progress">
                            <div className="book-progress-bar" style={{ width: `${book.progress}%` }} />
                          </div>
                        )}
                      </div>
                    }
                  >
                    <Meta
                      title={
                        <div className="book-title" title={book.title}>
                          {book.title}
                        </div>
                      }
                      description={
                        <div className="book-meta">
                          <div className="book-author">{book.author}</div>
                          <div className="book-info">
                            <Tag color={getLevelLabel(book.level).color}>{getLevelLabel(book.level).label}</Tag>
                            <Tag color={getStatusColor(book.status)} icon={<ClockCircleOutlined />}>
                              {book.status}
                            </Tag>
                          </div>
                          <div className="book-stats">
                            <span>{book.chapters} chương</span>
                            <span>•</span>
                            <span>{book.pages} trang</span>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </Spin>
    </div>
  );
};

export default BookLibrary;
