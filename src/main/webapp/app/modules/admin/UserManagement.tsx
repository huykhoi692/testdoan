import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Select,
  Space,
  Tag,
  Card,
  Avatar,
  Typography,
  Row,
  Col,
  Modal,
  Form,
  message,
  Popconfirm,
  Badge,
} from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { useAppDispatch } from 'app/config/store';
import { getUsers, createUser, updateUser, deleteUser } from 'app/shared/services/user.service';
import { IUser, UserRole } from 'app/shared/model/user.model';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { Title, Text } = Typography;
const { Option } = Select;

const UserManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });
  const [form] = Form.useForm();

  // Load users - wrapped in useCallback to fix react-hooks/exhaustive-deps warning
  const fetchUsers = React.useCallback(
    async (page = 0, size = 20) => {
      setLoading(true);
      try {
        const result = await dispatch(getUsers({ page, size })).unwrap();
        setUsers(result.content || result);
        setPagination({
          current: page + 1,
          pageSize: size,
          total: result.totalElements || result.length,
        });
      } catch (error) {
        message.error('Không thể tải danh sách người dùng');
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle table pagination
  const handleTableChange = (newPagination: TablePaginationConfig) => {
    fetchUsers((newPagination.current || 1) - 1, newPagination.pageSize || 20);
  };

  // Show modal for create/edit
  const showModal = (user?: IUser) => {
    if (user) {
      setIsEditMode(true);
      setSelectedUser(user);
      form.setFieldsValue({
        login: user.login,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        authorities: user.authorities,
        activated: user.activated,
      });
    } else {
      setIsEditMode(false);
      setSelectedUser(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // Handle form submit
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      if (isEditMode && selectedUser) {
        await dispatch(updateUser({ ...selectedUser, ...values })).unwrap();
        message.success('Cập nhật người dùng thành công');
      } else {
        await dispatch(createUser(values)).unwrap();
        message.success('Tạo người dùng thành công');
      }

      setIsModalVisible(false);
      form.resetFields();
      fetchUsers(pagination.current - 1, pagination.pageSize);
    } catch (error: any) {
      message.error(error.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (user: IUser) => {
    try {
      setLoading(true);
      await dispatch(deleteUser(user.login)).unwrap();
      message.success('Xóa người dùng thành công');
      fetchUsers(pagination.current - 1, pagination.pageSize);
    } catch (error) {
      message.error('Không thể xóa người dùng');
    } finally {
      setLoading(false);
    }
  };

  // Get role tag color
  const getRoleColor = (authorities?: string[]) => {
    if (!authorities || authorities.length === 0) return 'default';
    const role = authorities[0];
    if (role === 'ROLE_ADMIN') return 'red';
    if (role === 'ROLE_STAFF') return 'blue';
    return 'green';
  };

  // Get role display name
  const getRoleDisplay = (authorities?: string[]) => {
    if (!authorities || authorities.length === 0) return 'User';
    const role = authorities[0];
    if (role === 'ROLE_ADMIN') return 'Admin';
    if (role === 'ROLE_STAFF') return 'Staff';
    return 'User';
  };

  // Table columns
  const columns: ColumnsType<IUser> = [
    {
      title: 'Người dùng',
      key: 'user',
      render: (_, record) => (
        <Space>
          <Avatar size={40} src={record.imageUrl} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
          <div>
            <Text strong>
              {record.firstName} {record.lastName}
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              @{record.login}
            </Text>
          </div>
        </Space>
      ),
      width: 250,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'Vai trò',
      key: 'role',
      render: (_, record) => <Tag color={getRoleColor(record.authorities)}>{getRoleDisplay(record.authorities)}</Tag>,
      filters: [
        { text: 'Admin', value: UserRole.ADMIN },
        { text: 'Staff', value: UserRole.STAFF },
        { text: 'User', value: UserRole.USER },
      ],
      onFilter: (value: any, record) => record.authorities?.includes(value) || false,
      width: 120,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <Badge status={record.activated ? 'success' : 'default'} text={record.activated ? 'Hoạt động' : 'Không hoạt động'} />
      ),
      filters: [
        { text: 'Hoạt động', value: true },
        { text: 'Không hoạt động', value: false },
      ],
      onFilter: (value: any, record) => record.activated === value,
      width: 150,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: date => (date ? dayjs(date).format('DD/MM/YYYY') : '-'),
      sorter(a, b) {
        if (!a.createdDate || !b.createdDate) return 0;
        return dayjs(a.createdDate).unix() - dayjs(b.createdDate).unix();
      },
      width: 120,
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => showModal(record)} size="small">
            Sửa
          </Button>
          <Popconfirm
            title="Xác nhận xóa?"
            description="Bạn có chắc muốn xóa người dùng này?"
            onConfirm={() => handleDelete(record)}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ danger: true }}
          >
            <Button type="link" danger icon={<DeleteOutlined />} size="small">
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: 150,
      fixed: 'right',
    },
  ];

  // Filter users by search
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      !searchText ||
      user.login?.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      user.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchText.toLowerCase());

    const matchesRole = selectedRole === 'all' || user.authorities?.includes(selectedRole);

    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ padding: '24px' }}>
      <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {/* Header */}
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
          <Col>
            <Title level={3} style={{ margin: 0 }}>
              <UserOutlined style={{ marginRight: 8 }} />
              Quản lý người dùng
            </Title>
            <Text type="secondary">Quản lý tài khoản và phân quyền</Text>
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => showModal()} style={{ borderRadius: 8 }}>
              Thêm người dùng
            </Button>
          </Col>
        </Row>

        {/* Filters */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col flex="auto">
            <Input
              placeholder="Tìm kiếm theo tên, email, username..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              size="large"
              style={{ borderRadius: 8 }}
              allowClear
            />
          </Col>
          <Col>
            <Select placeholder="Vai trò" style={{ width: 150 }} size="large" value={selectedRole} onChange={setSelectedRole}>
              <Option value="all">Tất cả</Option>
              <Option value={UserRole.ADMIN}>Admin</Option>
              <Option value={UserRole.STAFF}>Staff</Option>
              <Option value={UserRole.USER}>User</Option>
            </Select>
          </Col>
          <Col>
            <Button icon={<ReloadOutlined />} size="large" onClick={() => fetchUsers(0, pagination.pageSize)} style={{ borderRadius: 8 }}>
              Làm mới
            </Button>
          </Col>
        </Row>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={filteredUsers}
          loading={loading}
          rowKey="id"
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showTotal: total => `Tổng ${total} người dùng`,
          }}
          onChange={handleTableChange}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        title={isEditMode ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        okText={isEditMode ? 'Cập nhật' : 'Tạo mới'}
        cancelText="Hủy"
        width={600}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 24 }}>
          <Form.Item
            label="Username"
            name="login"
            rules={[
              { required: true, message: 'Vui lòng nhập username' },
              { min: 3, message: 'Username phải có ít nhất 3 ký tự' },
            ]}
          >
            <Input placeholder="Username" disabled={isEditMode} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Họ" name="firstName" rules={[{ required: true, message: 'Vui lòng nhập họ' }]}>
                <Input placeholder="Họ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tên" name="lastName" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
                <Input placeholder="Tên" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input placeholder="email@example.com" />
          </Form.Item>

          <Form.Item label="Vai trò" name="authorities" rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}>
            <Select placeholder="Chọn vai trò" mode="multiple">
              <Option value={UserRole.ADMIN}>Admin</Option>
              <Option value={UserRole.STAFF}>Staff</Option>
              <Option value={UserRole.USER}>User</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Trạng thái" name="activated" valuePropName="checked" initialValue={true}>
            <Select>
              <Option value={true}>Hoạt động</Option>
              <Option value={false}>Không hoạt động</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
