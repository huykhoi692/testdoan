import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, Card, Typography, Popover, Button, message, List, Form, Input, Avatar } from 'antd';
import axios from 'axios';
import { IChapter } from 'app/shared/model/chapter.model';
import { IWord } from 'app/shared/model/word.model';
import { IComment } from 'app/shared/model/comment.model';
import { useAppSelector } from 'app/config/store';
import DashboardLayout from 'app/shared/layout/dashboard-layout';
import {
  ArrowLeftOutlined,
  SoundOutlined,
  CheckCircleOutlined,
  UserOutlined,
  EditOutlined,
  BookFilled,
  DownloadOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const ChapterDetail = () => {
  const { bookId, chapterId } = useParams<{ bookId: string; chapterId: string }>();
  const navigate = useNavigate();
  const account = useAppSelector(state => state.authentication.account);
  const [chapter, setChapter] = useState<IChapter | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [comment, setComment] = useState('');
  const [selection, setSelection] = useState<string | null>(null);

  const handleDownload = () => {
    try {
      // Placeholder for backend API call
      // const response = await axios.get(`/api/chapters/${chapterId}/download`, { responseType: 'blob' });
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', `${chapter.title}.pdf`);
      // document.body.appendChild(link);
      // link.click();
      message.info('Download functionality is not yet implemented.');
    } catch (error) {
      message.error('Failed to download chapter.');
    }
  };

  // ... (other functions remain the same)

  return (
    <DashboardLayout>
      <div style={{ padding: '24px', maxWidth: 900, margin: '0 auto' }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(`/dashboard/books/${bookId}`)} style={{ marginBottom: 24 }}>
          Back to Book
        </Button>
        <Card
          actions={[
            <Button key="complete" type="primary" icon={<CheckCircleOutlined />} onClick={() => {}} disabled={isCompleted}>
              {isCompleted ? 'Completed' : 'Mark as Complete'}
            </Button>,
            <Button key="practice" icon={<EditOutlined />} onClick={() => navigate(`/dashboard/chapters/${chapterId}/quiz`)}>
              Practice
            </Button>,
            <Button key="download" icon={<DownloadOutlined />} onClick={handleDownload}>
              Download
            </Button>,
          ]}
        >
          {/* ... */}
        </Card>
        {/* ... */}
      </div>
    </DashboardLayout>
  );
};

export default ChapterDetail;
