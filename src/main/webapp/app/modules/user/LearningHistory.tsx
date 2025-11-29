import React, { useState, useEffect } from 'react';
import { Button, Spin, Typography, Timeline, Card } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import DashboardLayout from 'app/shared/layout/dashboard-layout';

const { Title } = Typography;

const LearningHistory = () => {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/learning-reports/history');
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching learning history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDownload = async () => {
    try {
      const response = await axios.get('/api/learning-reports/export', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'learning-report.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  return (
    <DashboardLayout>
      <Card>
        <Title level={2}>Learning History</Title>
        <Button icon={<DownloadOutlined />} onClick={handleDownload} style={{ marginBottom: 24 }}>
          Download PDF Report
        </Button>
        {loading ? (
          <Spin />
        ) : (
          <Timeline>
            {history?.events?.map((event, index) => (
              <Timeline.Item key={index}>
                <strong>{event.eventType}</strong>: {event.description} on {new Date(event.timestamp).toLocaleDateString()}
              </Timeline.Item>
            ))}
          </Timeline>
        )}
      </Card>
    </DashboardLayout>
  );
};

export default LearningHistory;
