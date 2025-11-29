import React, { useState, useEffect } from 'react';
import { Card, Spin, Typography, List, Empty } from 'antd';
import DashboardLayout from 'app/shared/layout/dashboard-layout';

const { Title } = Typography;

interface Bookmark {
  id: number;
  content: string;
  chapterTitle: string;
  bookTitle: string;
}

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = () => {
      setLoading(true);
      try {
        // Placeholder API call
        // const response = await axios.get('/api/bookmarks');
        // setBookmarks(response.data);

        // Mock data for now
        setBookmarks([
          { id: 1, content: 'This is a bookmarked sentence.', chapterTitle: 'Chapter 1', bookTitle: 'The Great Gatsby' },
          { id: 2, content: 'Another important quote.', chapterTitle: 'Chapter 5', bookTitle: 'The Great Gatsby' },
        ]);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Spin size="large" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Card>
        <Title level={2}>My Bookmarks</Title>
        {bookmarks.length === 0 ? (
          <Empty description="You haven't bookmarked any content yet." />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={bookmarks}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta title={`${item.bookTitle} - ${item.chapterTitle}`} description={`"${item.content}"`} />
              </List.Item>
            )}
          />
        )}
      </Card>
    </DashboardLayout>
  );
};

export default Bookmarks;
