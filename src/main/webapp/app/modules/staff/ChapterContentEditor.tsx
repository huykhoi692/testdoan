import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Tabs,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Typography,
  message,
  Popconfirm,
  Row,
  Col,
  Tag,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  BookOutlined,
  FileTextOutlined,
  AudioOutlined,
  SoundOutlined,
  ReadOutlined,
  FormOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/config/store';
import { getChapter, getChapterWords, getChapterGrammars, getChapterExercises } from 'app/shared/services/chapter.service';
import { IChapter } from 'app/shared/model/chapter.model';
import { IWord } from 'app/shared/model/word.model';
import { IGrammar } from 'app/shared/model/grammar.model';
import { IListeningExercise } from 'app/shared/model/listening-exercise.model';
import { ISpeakingExercise } from 'app/shared/model/speaking-exercise.model';
import { IReadingExercise } from 'app/shared/model/reading-exercise.model';
import { IWritingExercise } from 'app/shared/model/writing-exercise.model';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const ChapterContentEditor: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [chapter, setChapter] = useState<IChapter | null>(null);
  const [words, setWords] = useState<IWord[]>([]);
  const [grammars, setGrammars] = useState<IGrammar[]>([]);
  const [exercises, setExercises] = useState<{
    listening: IListeningExercise[];
    speaking: ISpeakingExercise[];
    reading: IReadingExercise[];
    writing: IWritingExercise[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('vocabulary');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [modalType, setModalType] = useState<'word' | 'grammar' | 'listening' | 'speaking' | 'reading' | 'writing'>('word');

  const [form] = Form.useForm();

  const fetchData = useCallback(async () => {
    if (!chapterId) return;
    setLoading(true);
    try {
      const chapterData = await dispatch(getChapter(parseInt(chapterId, 10))).unwrap();
      setChapter(chapterData);

      const wordsData = await dispatch(getChapterWords(parseInt(chapterId, 10))).unwrap();
      setWords(wordsData);

      const grammarsData = await dispatch(getChapterGrammars(parseInt(chapterId, 10))).unwrap();
      setGrammars(grammarsData);

      const exercisesData = await dispatch(getChapterExercises(parseInt(chapterId, 10))).unwrap();
      setExercises(exercisesData);
    } catch (error) {
      message.error('Không thể tải dữ liệu chương');
    } finally {
      setLoading(false);
    }
  }, [chapterId, dispatch]);

  useEffect(() => {
    if (!chapterId) return;
    fetchData();
  }, [chapterId, fetchData]); // Added fetchData to the dependency array

  // Show modal for create/edit
  const showModal = (type: typeof modalType, item?: any) => {
    setModalType(type);
    setEditingItem(item || null);

    if (item) {
      form.setFieldsValue(item);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // Handle save
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // TODO: Call API to create/update based on modalType and values
      console.log('Saving:', modalType, values);
      message.success(editingItem ? 'Cập nhật thành công' : 'Thêm mới thành công');

      setIsModalVisible(false);
      form.resetFields();
      fetchData();
    } catch (error: any) {
      message.error(error.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = useCallback(
    (_type: string, _id: number) => {
      try {
        setLoading(true);
        // TODO: Call API to delete based on type and id
        console.log('Deleting:', _type, _id);
        message.success('Xóa thành công');
        fetchData();
      } catch (error) {
        message.error('Không thể xóa');
      } finally {
        setLoading(false);
      }
    },
    [fetchData],
  );

  // Vocabulary columns
  const vocabularyColumns: ColumnsType<IWord> = [
    {
      title: 'STT',
      key: 'stt',
      width: 60,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: 'Từ tiếng Hàn',
      dataIndex: 'text',
      key: 'text',
      render: text => (
        <Text strong style={{ fontSize: 16 }}>
          {text}
        </Text>
      ),
    },
    {
      title: 'Phiên âm',
      dataIndex: 'pronunciation',
      key: 'pronunciation',
      render: text => <Text type="secondary">/{text}/</Text>,
    },
    {
      title: 'Nghĩa',
      dataIndex: 'meaning',
      key: 'meaning',
    },
    {
      title: 'Từ loại',
      dataIndex: 'partOfSpeech',
      key: 'partOfSpeech',
      render: text => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => showModal('word', record)} size="small">
            Sửa
          </Button>
          {/* <Popconfirm title="Xác nhận xóa?" onConfirm={() => handleDelete(type, record.id || 0)} okText="Xóa" cancelText="Hủy">
            <Button type="link" danger icon={<DeleteOutlined />} size="small">
              Xóa
            </Button>
          </Popconfirm> */}
        </Space>
      ),
    },
  ];

  // Grammar columns
  const grammarColumns: ColumnsType<IGrammar> = [
    {
      title: 'STT',
      key: 'stt',
      width: 60,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: text => <Text strong>{text}</Text>,
    },
    {
      title: 'Ý nghĩa',
      dataIndex: 'meaning',
      key: 'meaning',
      ellipsis: true,
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => showModal('grammar', record)} size="small">
            Sửa
          </Button>
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => handleDelete('grammar', record.id || 0)} okText="Xóa" cancelText="Hủy">
            <Button type="link" danger icon={<DeleteOutlined />} size="small">
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Exercise columns (generic)
  const exerciseColumns = (type: string): ColumnsType<any> => [
    {
      title: 'STT',
      key: 'stt',
      width: 60,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: 'Câu hỏi/Yêu cầu',
      key: 'content',
      render: (_, record) => (
        <Paragraph ellipsis={{ rows: 2 }}>{record.question || record.prompt || record.passage?.substring(0, 100)}</Paragraph>
      ),
    },
    {
      title: 'Điểm tối đa',
      dataIndex: 'maxScore',
      key: 'maxScore',
      width: 100,
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => showModal(type as any, record)} size="small">
            Sửa
          </Button>
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => handleDelete(type, record.id || 0)} okText="Xóa" cancelText="Hủy">
            <Button type="link" danger icon={<DeleteOutlined />} size="small">
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Render modal form based on type
  const renderModalForm = () => {
    switch (modalType) {
      case 'word':
        return (
          <>
            <Form.Item label="Từ tiếng Hàn" name="text" rules={[{ required: true, message: 'Vui lòng nhập từ' }]}>
              <Input placeholder="예: 만남" size="large" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Phiên âm" name="pronunciation">
                  <Input placeholder="man-nam" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Từ loại" name="partOfSpeech">
                  <Select placeholder="Chọn từ loại">
                    <Option value="danh từ">Danh từ</Option>
                    <Option value="động từ">Động từ</Option>
                    <Option value="tính từ">Tính từ</Option>
                    <Option value="trạng từ">Trạng từ</Option>
                    <Option value="đại từ">Đại từ</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Nghĩa tiếng Việt" name="meaning" rules={[{ required: true, message: 'Vui lòng nhập nghĩa' }]}>
              <Input placeholder="cuộc gặp, sự gặp gỡ" />
            </Form.Item>
            <Form.Item label="URL hình ảnh" name="imageUrl">
              <Input placeholder="https://example.com/image.jpg" />
            </Form.Item>
            <Form.Item label="Thứ tự" name="orderIndex">
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
          </>
        );

      case 'grammar':
        return (
          <>
            <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
              <Input placeholder="예: -았/었어요 (Thì quá khứ)" size="large" />
            </Form.Item>
            <Form.Item label="Ý nghĩa" name="meaning">
              <Input placeholder="Diễn tả hành động đã xảy ra trong quá khứ" />
            </Form.Item>
            <Form.Item label="Giải thích chi tiết" name="explanation">
              <TextArea rows={3} placeholder="Dùng 았어요 sau nguyên âm sáng (ㅏ, ㅗ)..." />
            </Form.Item>
            <Form.Item label="Thứ tự" name="orderIndex">
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
          </>
        );

      case 'listening':
        return (
          <>
            <Form.Item label="Câu hỏi" name="question" rules={[{ required: true, message: 'Vui lòng nhập câu hỏi' }]}>
              <TextArea rows={2} placeholder="Nghe đoạn hội thoại và chọn câu trả lời đúng..." />
            </Form.Item>
            <Form.Item label="URL Audio" name="audioUrl" rules={[{ required: true, message: 'Vui lòng nhập URL audio' }]}>
              <Input placeholder="/audio/chapter1-listening1.mp3" />
            </Form.Item>
            <Form.Item label="URL Hình ảnh" name="imageUrl">
              <Input placeholder="/images/listening1.jpg" />
            </Form.Item>
            <Form.Item label="Đáp án đúng" name="correctAnswer" rules={[{ required: true }]}>
              <Input placeholder="A" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Điểm tối đa" name="maxScore">
                  <InputNumber min={1} style={{ width: '100%' }} placeholder="10" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Thứ tự" name="orderIndex">
                  <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          </>
        );

      case 'speaking':
        return (
          <>
            <Form.Item label="Yêu cầu" name="prompt" rules={[{ required: true, message: 'Vui lòng nhập yêu cầu' }]}>
              <TextArea rows={3} placeholder="Hãy giới thiệu về cuộc gặp đầu tiên..." />
            </Form.Item>
            <Form.Item label="URL Audio mẫu" name="sampleAudio">
              <Input placeholder="/audio/sample.mp3" />
            </Form.Item>
            <Form.Item label="Cụm từ mục tiêu" name="targetPhrase">
              <Input placeholder="처음 만났을 때 정말 설렜어요" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Điểm tối đa" name="maxScore">
                  <InputNumber min={1} style={{ width: '100%' }} placeholder="15" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Thứ tự" name="orderIndex">
                  <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          </>
        );

      case 'reading':
        return (
          <>
            <Form.Item label="Đoạn văn tiếng Hàn" name="passage" rules={[{ required: true, message: 'Vui lòng nhập đoạn văn' }]}>
              <TextArea rows={4} placeholder="김지영은 대학교에서 처음 그를 만났다..." />
            </Form.Item>
            <Form.Item label="Câu hỏi" name="question" rules={[{ required: true, message: 'Vui lòng nhập câu hỏi' }]}>
              <Input placeholder="김지영은 어디서 그를 처음 만났나요?" />
            </Form.Item>
            <Form.Item label="Đáp án đúng" name="correctAnswer" rules={[{ required: true }]}>
              <Input placeholder="A" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Điểm tối đa" name="maxScore">
                  <InputNumber min={1} style={{ width: '100%' }} placeholder="10" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Thứ tự" name="orderIndex">
                  <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          </>
        );

      case 'writing':
        return (
          <>
            <Form.Item label="Yêu cầu đề bài" name="prompt" rules={[{ required: true, message: 'Vui lòng nhập đề bài' }]}>
              <TextArea rows={3} placeholder="Viết một đoạn văn ngắn (50-80 từ) về cuộc gặp gỡ đầu tiên..." />
            </Form.Item>
            <Form.Item label="Bài mẫu" name="sampleAnswer">
              <TextArea rows={3} placeholder="작년 봄에 친구 소개로 새로운 사람을 만났어요..." />
            </Form.Item>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Số từ tối thiểu" name="minWords">
                  <InputNumber min={0} style={{ width: '100%' }} placeholder="50" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Điểm tối đa" name="maxScore">
                  <InputNumber min={1} style={{ width: '100%' }} placeholder="20" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Thứ tự" name="orderIndex">
                  <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          </>
        );

      default:
        return null;
    }
  };

  const getModalTitle = () => {
    const typeMap = {
      word: 'Từ vựng',
      grammar: 'Ngữ pháp',
      listening: 'Bài tập Nghe',
      speaking: 'Bài tập Nói',
      reading: 'Bài tập Đọc',
      writing: 'Bài tập Viết',
    };
    return `${editingItem ? 'Chỉnh sửa' : 'Thêm'} ${typeMap[modalType]}`;
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <Card style={{ marginBottom: 16, borderRadius: 12, border: 'none' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Button type="link" onClick={() => navigate(-1)} style={{ padding: 0, marginBottom: 8 }}>
              ← Quay lại
            </Button>
            <Title level={3} style={{ margin: 0 }}>
              {chapter?.title || 'Chỉnh sửa nội dung chương'}
            </Title>
            <Text type="secondary">{chapter?.content}</Text>
          </Col>
          <Col>
            <Tag color="blue">Chương {chapter?.id}</Tag>
          </Col>
        </Row>
      </Card>

      {/* Content Tabs */}
      <Card style={{ borderRadius: 12, border: 'none' }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab} size="large">
          {/* Vocabulary Tab */}
          <Tabs.TabPane
            tab={
              <span>
                <BookOutlined />
                Từ vựng ({words.length})
              </span>
            }
            key="vocabulary"
          >
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal('word')} style={{ marginBottom: 16 }}>
              Thêm từ vựng
            </Button>
            <Table columns={vocabularyColumns} dataSource={words} loading={loading} rowKey="id" pagination={false} />
          </Tabs.TabPane>

          {/* Grammar Tab */}
          <Tabs.TabPane
            tab={
              <span>
                <FileTextOutlined />
                Ngữ pháp ({grammars.length})
              </span>
            }
            key="grammar"
          >
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal('grammar')} style={{ marginBottom: 16 }}>
              Thêm ngữ pháp
            </Button>
            <Table columns={grammarColumns} dataSource={grammars} loading={loading} rowKey="id" pagination={false} />
          </Tabs.TabPane>

          {/* Listening Tab */}
          <Tabs.TabPane
            tab={
              <span>
                <AudioOutlined />
                Luyện nghe ({exercises?.listening.length || 0})
              </span>
            }
            key="listening"
          >
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal('listening')} style={{ marginBottom: 16 }}>
              Thêm bài nghe
            </Button>
            <Table
              columns={exerciseColumns('listening')}
              dataSource={exercises?.listening || []}
              loading={loading}
              rowKey="id"
              pagination={false}
            />
          </Tabs.TabPane>

          {/* Speaking Tab */}
          <Tabs.TabPane
            tab={
              <span>
                <SoundOutlined />
                Luyện nói ({exercises?.speaking.length || 0})
              </span>
            }
            key="speaking"
          >
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal('speaking')} style={{ marginBottom: 16 }}>
              Thêm bài nói
            </Button>
            <Table
              columns={exerciseColumns('speaking')}
              dataSource={exercises?.speaking || []}
              loading={loading}
              rowKey="id"
              pagination={false}
            />
          </Tabs.TabPane>

          {/* Reading Tab */}
          <Tabs.TabPane
            tab={
              <span>
                <ReadOutlined />
                Luyện đọc ({exercises?.reading.length || 0})
              </span>
            }
            key="reading"
          >
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal('reading')} style={{ marginBottom: 16 }}>
              Thêm bài đọc
            </Button>
            <Table
              columns={exerciseColumns('reading')}
              dataSource={exercises?.reading || []}
              loading={loading}
              rowKey="id"
              pagination={false}
            />
          </Tabs.TabPane>

          {/* Writing Tab */}
          <Tabs.TabPane
            tab={
              <span>
                <FormOutlined />
                Luyện viết ({exercises?.writing.length || 0})
              </span>
            }
            key="writing"
          >
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal('writing')} style={{ marginBottom: 16 }}>
              Thêm bài viết
            </Button>
            <Table
              columns={exerciseColumns('writing')}
              dataSource={exercises?.writing || []}
              loading={loading}
              rowKey="id"
              pagination={false}
            />
          </Tabs.TabPane>
        </Tabs>
      </Card>

      {/* Edit Modal */}
      <Modal
        title={getModalTitle()}
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        okText={editingItem ? 'Cập nhật' : 'Thêm mới'}
        cancelText="Hủy"
        width={700}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 24 }}>
          {renderModalForm()}
        </Form>
      </Modal>
    </div>
  );
};

export default ChapterContentEditor;
