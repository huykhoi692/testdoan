import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, message, Typography } from 'antd';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

const MyProfile: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    console.log('Profile values:', values);

    setTimeout(() => {
      setLoading(false);
      message.success('Profile updated successfully!');
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f7', padding: '40px' }}>
      <div
        style={{
          maxWidth: 800,
          margin: '0 auto',
          background: '#ffffff',
          padding: '48px',
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <Title level={2} style={{ color: '#4169e1', marginBottom: 32, fontSize: 28 }}>
          Account Information
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            fullName: 'Maya Atay',
            email: 'mayaatay4400@gmail.com',
            gender: 'Nữ',
            birthDate: dayjs('2000-01-21'),
          }}
        >
          <Form.Item
            label={<Text style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>Họ và tên</Text>}
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
          >
            <Input size="large" placeholder="Maya Atay" style={{ borderRadius: 8 }} />
          </Form.Item>

          <Form.Item
            label={<Text style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>Email</Text>}
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input size="large" placeholder="mayaatay4400@gmail.com" style={{ borderRadius: 8 }} />
          </Form.Item>

          <Form.Item label={<Text style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>Giới tính</Text>} name="gender">
            <Select size="large" placeholder="Chọn giới tính" style={{ borderRadius: 8 }}>
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
              <Option value="Khác">Khác</Option>
            </Select>
          </Form.Item>

          <Form.Item label={<Text style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>Ngày sinh</Text>} name="birthDate">
            <DatePicker size="large" format="DD/MM/YYYY" placeholder="21/1/2000" style={{ width: '100%', borderRadius: 8 }} />
          </Form.Item>

          <Form.Item style={{ marginTop: 32, textAlign: 'right' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              style={{
                minWidth: 120,
                height: 44,
                borderRadius: 8,
                background: '#4169e1',
                fontWeight: 500,
                fontSize: 15,
              }}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default MyProfile;
