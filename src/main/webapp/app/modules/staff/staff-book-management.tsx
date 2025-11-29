import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Space, Tag, Modal, Form, Input, Select, Upload, message, Popconfirm, Avatar, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, UploadOutlined, BookOutlined } from '@ant-design/icons';
import { PageHeader } from 'app/shared/components/PageHeader';
import type { ColumnsType } from 'antd/es/table';
import type { UploadFile } from 'antd/es/upload/interface';
import './staff-book-management.scss';
import DashboardLayout from 'app/shared/layout/dashboard-layout';

const { Option } = Select;
const { TextArea } = Input;

interface Book {
  id: number;
  title: string;
  author?: string;
  publisher?: string;
  year?: number;
  level?: string;
  description?: string;
  thumbnail?: string;
  chapters: number;
  pages: number;
  status: string;
  createdAt: string;
}

export const StaffBookManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: '82년생 김지영',
      author: '조남주 (Cho Nam-joo)',
      publisher: '민음사',
      year: 2016,
      level: 'INTERMEDIATE',
      chapters: 12,
      pages: 192,
      status: 'Hoàn thành',
      createdAt: '15/01/2024',
    },
    {
      id: 2,
      title: '미움받을 용기',
      author: '기시미 이치로 (Kishimi Ichiro)',
      publisher: '인플루엔셜',
      year: 2014,
      level: 'INTERMEDIATE',
      chapters: 15,
      pages: 336,
      status: 'Hoàn thành',
      createdAt: '20/02/2024',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCreate = () => {
    setModalMode('create');
    setCurrentBook(null);
    form.resetFields();
    setFileList([]);
    setModalVisible(true);
  };

  const handleEdit = (record: Book) => {
    setModalMode('edit');
    setCurrentBook(record);
    form.setFieldsValue({
      title: record.title,
      author: record.author,
      publisher: record.publisher,
      year: record.year,
      level: record.level,
      description: record.description,
    });
    setModalVisible(true);
  };

  const handleDelete = (id: number) => {
    setBooks(books.filter(book => book.id !== id));
    message.success('Xóa sách thành công');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (modalMode === 'create') {
        const newBook: Book = {
          id: books.length + 1,
          ...values,
          chapters: 0,
          pages: 0,
          status: 'Đang soạn',
          createdAt: new Date().toLocaleDateString('vi-VN'),
        };
        setBooks([...books, newBook]);
        message.success('Thêm sách mới thành công');
      } else {
        setBooks(books.map(book => (book.id === currentBook?.id ? { ...book, ...values } : book)));
        message.success('Cập nhật sách thành công');
      }
      setModalVisible(false);
      form.resetFields();
    });
  };

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
      'Đang soạn': 'processing',
      Nháp: 'default',
    };
    return statusMap[status] || 'default';
  };

  const columns: ColumnsType<Book> = [
    {
      title: 'Sách',
      key: 'book',
      width: 300,
      render: (_, record) => (
        <Space>
          <Avatar shape="square" size={64} src={record.thumbnail} icon={<BookOutlined />} />
          <div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>{record.title}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>{record.author}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Nhà xuất bản',
      dataIndex: 'publisher',
      key: 'publisher',
    },
    {
      title: 'Năm',
      dataIndex: 'year',
      key: 'year',
      width: 80,
    },
    {
      title: 'Cấp độ',
      key: 'level',
      width: 130,
      render(_, record) {
        const level = getLevelLabel(record.level);
        return <Tag color={level.color}>{level.label}</Tag>;
      },
    },
    {
      title: 'Chương',
      dataIndex: 'chapters',
      key: 'chapters',
      width: 80,
    },
    {
      title: 'Trang',
      dataIndex: 'pages',
      key: 'pages',
      width: 80,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: 120,
      render: (_, record) => <Tag color={getStatusColor(record.status)}>{record.status}</Tag>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 110,
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} onClick={() => (window.location.href = `/staff/books/${record.id}`)}>
            Xem
          </Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xóa sách này?"
            description="Bạn có chắc chắn muốn xóa sách này không?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="staff-book-management">
        <PageHeader
          title="Quản lý sách"
          subtitle="Tạo và quản lý sách với AI"
          extra={
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate} size="large">
              Thêm sách mới
            </Button>
          }
        />

        <Card>
          <Table
            columns={columns}
            dataSource={books}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: total => `Tổng ${total} sách`,
            }}
          />
        </Card>

        {/* Create/Edit Modal */}
        <Modal
          title={modalMode === 'create' ? 'Thêm sách mới' : 'Sửa thông tin sách'}
          open={modalVisible}
          onOk={handleModalOk}
          onCancel={() => setModalVisible(false)}
          width={700}
          okText={modalMode === 'create' ? 'Tạo sách' : 'Lưu thay đổi'}
          cancelText="Hủy"
        >
          <Form form={form} layout="vertical" style={{ marginTop: 24 }}>
            <Form.Item label="Tên sách" name="title" rules={[{ required: true, message: 'Vui lòng nhập tên sách' }]}>
              <Input placeholder="Nhập tên sách" size="large" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Tác giả" name="author">
                  <Input placeholder="Tên tác giả" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Nhà xuất bản" name="publisher">
                  <Input placeholder="Nhà xuất bản" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Năm xuất bản" name="year">
                  <Input type="number" placeholder="2024" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Cấp độ" name="level" rules={[{ required: true, message: 'Vui lòng chọn cấp độ' }]}>
                  <Select placeholder="Chọn cấp độ">
                    <Option value="BEGINNER">Sơ cấp</Option>
                    <Option value="ELEMENTARY">Cơ bản</Option>
                    <Option value="INTERMEDIATE">Trung cấp</Option>
                    <Option value="UPPER_INTERMEDIATE">Trung-Cao cấp</Option>
                    <Option value="ADVANCED">Cao cấp</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Nguồn sách (URL, tên tệp vien...)" name="source">
              <Input placeholder="Nguồn sách (URL, tên tệp vien...)" />
            </Form.Item>

            <Form.Item label="Mô tả" name="description">
              <TextArea rows={4} placeholder="Mô tả ngắn về nội dung sách" />
            </Form.Item>

            <Form.Item label="Thumbnail" name="thumbnail">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={({ fileList: newFileList }) => setFileList(newFileList)}
                beforeUpload={() => false}
                maxCount={1}
              >
                {fileList.length === 0 && (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default StaffBookManagement;
