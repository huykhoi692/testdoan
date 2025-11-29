import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const PageNotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f5f5f5',
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <Button type="primary" size="large" icon={<HomeOutlined />}>
              Back Home
            </Button>
          </Link>
        }
      />
    </div>
  );
};

export default PageNotFound;
