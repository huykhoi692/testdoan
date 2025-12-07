import React, { useState } from 'react';
import { useTranslation } from 'app/shared/utils/useTranslation';
import { Card, Upload, message, Typography, Space, List, Progress, Alert, Tag } from 'antd';
import { UploadOutlined, InboxOutlined, FileTextOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import axios from 'axios';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

interface UploadedFile {
  name: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  message?: string;
}

const UploadBooks: React.FC = () => {
  const { t } = useTranslation('staff');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const fileInfo: UploadedFile = {
      name: file.name,
      status: 'uploading',
      progress: 0,
    };

    setUploadedFiles(prev => [...prev, fileInfo]);

    try {
      // Upload file to backend API - using /api/files/upload/document endpoint
      const response = await axios.post('/api/files/upload/document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress(progressEvent) {
          const progress = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
          setUploadedFiles(prev => prev.map(f => (f.name === file.name ? { ...f, progress } : f)));
        },
      });

      setUploadedFiles(prev =>
        prev.map(f =>
          f.name === file.name ? { ...f, status: 'success', progress: 100, message: response.data.message || 'Upload successful' } : f,
        ),
      );
      message.success(`${file.name} uploaded successfully!`);
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadedFiles(prev =>
        prev.map(f =>
          f.name === file.name
            ? {
                ...f,
                status: 'error',
                progress: 0,
                message: error.response?.data?.message || 'Upload failed',
              }
            : f,
        ),
      );
      message.error(`Failed to upload ${file.name}`);
    }
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    accept: '.pdf,.epub,.txt,.docx',
    beforeUpload(file) {
      const isValidType = [
        'application/pdf',
        'application/epub+zip',
        'text/plain',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ].includes(file.type);
      if (!isValidType) {
        message.error('You can only upload PDF, EPUB, TXT, or DOCX files!');
        return false;
      }
      const isLt50M = file.size / 1024 / 1024 < 50;
      if (!isLt50M) {
        message.error('File must be smaller than 50MB!');
        return false;
      }
      handleUpload(file);
      return false; // Prevent default upload behavior
    },
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card
        style={{
          marginBottom: '24px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2}>
              <UploadOutlined style={{ marginRight: '12px', color: '#1890ff' }} />
              Upload Books
            </Title>
            <Paragraph type="secondary">Upload book files to make them available for students to learn.</Paragraph>
          </div>

          <Alert
            message="Supported File Formats"
            description={
              <div>
                <Text>You can upload the following file types:</Text>
                <ul style={{ marginTop: '8px', marginBottom: 0 }}>
                  <li>
                    <Tag color="blue">PDF</Tag> - Portable Document Format
                  </li>
                  <li>
                    <Tag color="green">EPUB</Tag> - Electronic Publication
                  </li>
                  <li>
                    <Tag color="orange">TXT</Tag> - Plain Text
                  </li>
                  <li>
                    <Tag color="purple">DOCX</Tag> - Microsoft Word Document
                  </li>
                </ul>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Maximum file size: 50MB per file
                </Text>
              </div>
            }
            type="info"
            showIcon
          />

          <Dragger {...uploadProps} style={{ padding: '40px' }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ fontSize: '64px', color: '#1890ff' }} />
            </p>
            <p className="ant-upload-text" style={{ fontSize: '18px', fontWeight: 500 }}>
              Click or drag files to this area to upload
            </p>
            <p className="ant-upload-hint" style={{ fontSize: '14px' }}>
              Support for single or bulk upload. Upload book files in PDF, EPUB, TXT, or DOCX format.
            </p>
          </Dragger>
        </Space>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card
          title={
            <Space>
              <FileTextOutlined />
              <Text strong>Upload History</Text>
            </Space>
          }
          style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          <List
            dataSource={uploadedFiles}
            renderItem={item => (
              <List.Item>
                <div style={{ width: '100%' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Space>
                        {item.status === 'success' && <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '20px' }} />}
                        {item.status === 'error' && <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: '20px' }} />}
                        {item.status === 'uploading' && <UploadOutlined style={{ color: '#1890ff', fontSize: '20px' }} />}
                        <Text strong>{item.name}</Text>
                      </Space>
                      <Tag color={item.status === 'success' ? 'success' : item.status === 'error' ? 'error' : 'processing'}>
                        {item.status === 'success' ? 'Success' : item.status === 'error' ? 'Failed' : 'Uploading'}
                      </Tag>
                    </div>
                    {item.status === 'uploading' && <Progress percent={item.progress} status="active" />}
                    {item.message && (
                      <Text type={item.status === 'error' ? 'danger' : 'secondary'} style={{ fontSize: '12px' }}>
                        {item.message}
                      </Text>
                    )}
                  </Space>
                </div>
              </List.Item>
            )}
          />
        </Card>
      )}
    </div>
  );
};

export default UploadBooks;
