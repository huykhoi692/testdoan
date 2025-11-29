import React, { useState } from 'react';
import {
  Card,
  Button,
  Input,
  Row,
  Col,
  Tag,
  Typography,
  Space,
  Modal,
  Form,
  Select,
  InputNumber,
  Upload,
  message,
  Tabs,
  Divider,
  Popconfirm,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  BookOutlined,
  UserOutlined,
  ClockCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  lesson: number;
  student: number;
  level: string;
  chapters?: { id: number; name: string; lessons: number }[];
  lessons?: { id: number; name: string; chapterId?: number }[];
  vocabularies?: { id: number; word: string; meaning: string; example?: string; chapterId?: number }[];
}

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form] = Form.useForm();
  const [chapters, setChapters] = useState<{ id: number; name: string; lessons: number }[]>([]);
  const [chapterName, setChapterName] = useState('');
  const [lessonsList, setLessonsList] = useState<{ id: number; name: string; chapterId?: number }[]>([]);
  const [lessonName, setLessonName] = useState('');
  const [lessonChapterId, setLessonChapterId] = useState<number | undefined>(undefined);
  const [vocabularies, setVocabularies] = useState<
    {
      id: number;
      word: string;
      meaning: string;
      example?: string;
      chapterId?: number;
    }[]
  >([]);
  const [vocabWord, setVocabWord] = useState('');
  const [vocabMeaning, setVocabMeaning] = useState('');
  const [vocabExample, setVocabExample] = useState('');
  const [vocabChapterId, setVocabChapterId] = useState<number | undefined>(undefined);
  const [grammars, setGrammars] = useState<
    {
      id: number;
      pattern: string;
      meaning: string;
      example?: string;
      lessonId?: number;
    }[]
  >([]);
  const [grammarPattern, setGrammarPattern] = useState('');
  const [grammarMeaning, setGrammarMeaning] = useState('');
  const [grammarExample, setGrammarExample] = useState('');
  const [grammarLessonId, setGrammarLessonId] = useState<number | undefined>(undefined);

  React.useEffect(() => {
    // Sample data matching the image - moved inside useEffect to avoid dependency issue
    const sampleCourses: Course[] = [
      {
        id: '1',
        title: 'Learning historical words and sentences',
        description: 'Khóa học tiếng hàn',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400',
        lesson: 6,
        student: 198,
        level: 'Advanced',
      },
      {
        id: '2',
        title: 'Learning historical words and sentences',
        description: 'Khóa học tiếng hàn',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
        lesson: 4,
        student: 186,
        level: 'Advanced',
      },
      {
        id: '3',
        title: 'Learning historical words and sentences',
        description: 'Khóa học tiếng hàn',
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400',
        lesson: 6,
        student: 186,
        level: 'Advanced',
      },
      {
        id: '4',
        title: 'Learning historical words and sentences',
        description: 'Khóa học tiếng hàn',
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400',
        lesson: 6,
        student: 201,
        level: 'Advanced',
      },
      {
        id: '5',
        title: 'Learning historical words and sentences',
        description: 'Khóa học tiếng hàn',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400',
        lesson: 6,
        student: 186,
        level: 'Advanced',
      },
      {
        id: '6',
        title: 'Learning historical words and sentences',
        description: 'Khóa học tiếng hàn',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400',
        lesson: 6,
        student: 186,
        level: 'Advanced',
      },
    ];
    setCourses(sampleCourses);
  }, []); // Empty dependency array since sampleCourses is now local

  const handleAddCourse = () => {
    form.resetFields();
    setEditingCourse(null);
    setChapters([]);
    setChapterName('');
    setLessonsList([]);
    setLessonName('');
    setLessonChapterId(undefined);
    setVocabularies([]);
    setVocabWord('');
    setVocabMeaning('');
    setVocabExample('');
    setVocabChapterId(undefined);
    setIsModalVisible(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    form.setFieldsValue(course);
    setChapters(course.chapters || []);
    setLessonsList(course.lessons || []);
    setVocabularies((course as any).vocabularies || []);
    setChapterName('');
    setIsModalVisible(true);
  };

  const handleDeleteCourse = (course: Course) => {
    Modal.confirm({
      title: 'Delete Course',
      content: `Are you sure you want to delete "${course.title}"?`,
      okText: 'Delete',
      okType: 'danger',
      onOk() {
        setCourses(courses.filter(c => c.id !== course.id));
        message.success('Course deleted successfully');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingCourse) {
        // Update existing course and attach chapters & lessons
        setCourses(courses.map(c => (c.id === editingCourse.id ? { ...c, ...values, chapters, lessons: lessonsList } : c)));
        message.success('Course updated successfully');
      } else {
        // Add new course with chapters
        const newCourse: Course = {
          id: Date.now().toString(),
          ...values,
          image: values.image || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400',
          chapters,
          lessons: lessonsList,
        };
        setCourses([...courses, newCourse]);
        message.success('Course added successfully');
      }
      setIsModalVisible(false);
    });
  };

  const filteredCourses = courses.filter(
    course =>
      course.title.toLowerCase().includes(searchText.toLowerCase()) || course.description.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div style={{ padding: '32px', background: '#f5f5f7', minHeight: '100vh' }}>
      {/* Header Banner */}
      <Card
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 16,
          marginBottom: 24,
          border: 'none',
        }}
        bodyStyle={{ padding: '40px' }}
      >
        <Row align="middle" justify="space-between">
          <Col>
            <Title level={2} style={{ color: 'white', margin: 0, marginBottom: 8 }}>
              Hi Admin, Good Afternoon !
            </Title>
          </Col>
          <Col>
            <img
              src="https://img.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg"
              alt="Admin"
              style={{ height: 120, objectFit: 'contain' }}
            />
          </Col>
        </Row>
      </Card>

      {/* Page Header */}
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0, marginBottom: 8 }}>
          Quản lý khóa học
        </Title>
        <Title level={4} style={{ margin: 0, fontWeight: 500, color: '#595959' }}>
          Khóa học tiếng hàn
        </Title>
      </div>

      {/* Search and Add Button */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Input
            placeholder="Search courses..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 300, borderRadius: 8 }}
            size="large"
          />
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCourse} size="large" style={{ borderRadius: 8 }}>
            Add Course
          </Button>
        </Col>
      </Row>

      {/* Course Cards Grid */}
      <Row gutter={[24, 24]}>
        {filteredCourses.map(course => (
          <Col key={course.id} xs={24} sm={12} lg={8}>
            <Card
              hoverable
              cover={
                <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                  <img
                    alt={course.title}
                    src={course.image}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      display: 'flex',
                      gap: 8,
                    }}
                  >
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditCourse(course)} style={{ borderRadius: 6 }} />
                    <Button danger icon={<DeleteOutlined />} onClick={() => handleDeleteCourse(course)} style={{ borderRadius: 6 }} />
                  </div>
                </div>
              }
              style={{ borderRadius: 12, overflow: 'hidden' }}
              bodyStyle={{ padding: 20 }}
            >
              <Title level={5} style={{ marginBottom: 8, minHeight: 48 }}>
                {course.title}
              </Title>
              <Space direction="vertical" size={12} style={{ width: '100%' }}>
                <Space size={16}>
                  <Space size={4}>
                    <BookOutlined style={{ color: '#667eea' }} />
                    <Text type="secondary">Lesson: {course.lesson}</Text>
                  </Space>
                  <Space size={4}>
                    <UserOutlined style={{ color: '#667eea' }} />
                    <Text type="secondary">Student: {course.student}</Text>
                  </Space>
                </Space>
                <Space size={4}>
                  <ClockCircleOutlined style={{ color: '#667eea' }} />
                  <Text type="secondary">{course.level}</Text>
                </Space>
                <Button type="primary" block style={{ borderRadius: 8, marginTop: 8 }}>
                  Edit Course →
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add/Edit Course Modal with Tabs (detailed admin form) */}
      <Modal
        title={editingCourse ? 'Edit Course' : 'Add New Course'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={1000}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" style={{ marginTop: 8 }}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab={<span>Thông tin sách</span>} key="1">
              <div
                style={{
                  border: '2px dashed #d9d9d9',
                  borderRadius: 8,
                  padding: 28,
                  marginBottom: 20,
                  textAlign: 'center',
                  background: '#fafafa',
                }}
              >
                <Upload
                  accept=".pdf,.txt,image/*"
                  maxCount={1}
                  beforeUpload={() => {
                    message.info('File selection (upload disabled in demo)');
                    return false;
                  }}
                >
                  <Button icon={<UploadOutlined />}>Chọn file / Kéo thả</Button>
                </Upload>
                <div style={{ marginTop: 16, color: '#8c8c8c' }}>Hỗ trợ: TXT, PDF, JPG, PNG</div>
              </div>

              <Form.Item name="title" label="Tên sách" rules={[{ required: true, message: 'Vui lòng nhập tên sách' }]}>
                <Input placeholder="Tên sách" size="large" />
              </Form.Item>

              <Form.Item name="description" label="Mô tả">
                <Input.TextArea rows={6} placeholder="Mô tả sách" />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="author" label="Tác giả">
                    <Input placeholder="Tác giả" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="category" label="Thể loại sách">
                    <Input placeholder="Thể loại" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="publishYear" label="Năm xuất bản">
                    <Input placeholder="2025" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="publisher" label="Nhà xuất bản">
                    <Input placeholder="Nhà xuất bản" />
                  </Form.Item>
                </Col>
              </Row>
            </Tabs.TabPane>

            <Tabs.TabPane tab={<span>Chapters</span>} key="2">
              <Row gutter={12} style={{ marginBottom: 12 }} align="middle">
                <Col flex="auto">
                  <Input
                    placeholder="Chapter name"
                    value={chapterName}
                    onChange={e => setChapterName(e.target.value)}
                    onPressEnter={() => {
                      if (!chapterName.trim()) return;
                      setChapters([...chapters, { id: Date.now(), name: chapterName.trim(), lessons: 0 }]);
                      setChapterName('');
                    }}
                  />
                </Col>
                <Col>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      if (!chapterName.trim()) return;
                      setChapters([...chapters, { id: Date.now(), name: chapterName.trim(), lessons: 0 }]);
                      setChapterName('');
                    }}
                  >
                    Thêm chapters
                  </Button>
                </Col>
              </Row>
              <Divider />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {chapters.length === 0 ? (
                  <div style={{ color: '#8c8c8c' }}>Chưa có chapter nào. Thêm chapter để bắt đầu.</div>
                ) : (
                  chapters.map(ch => (
                    <div
                      key={ch.id}
                      style={{
                        border: '1px solid #e8e8e8',
                        borderRadius: 6,
                        padding: 12,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'white',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600 }}>{ch.name}</div>
                        <div style={{ color: '#8c8c8c', marginTop: 8 }}>{ch.lessons} lessons</div>
                      </div>
                      <div>
                        <Popconfirm
                          title="Bạn có chắc muốn xóa chapter này?"
                          onConfirm={() => setChapters(chapters.filter(x => x.id !== ch.id))}
                          okText="Xóa"
                          cancelText="Hủy"
                        >
                          <Button danger> Xóa </Button>
                        </Popconfirm>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Tabs.TabPane>

            {/* Lesson tab removed - using chapters only */}

            <Tabs.TabPane tab={<span>Từ vựng</span>} key="4">
              <Row gutter={12} style={{ marginBottom: 12 }} align="middle">
                <Col span={5}>
                  <Input placeholder="Từ vựng" value={vocabWord} onChange={e => setVocabWord(e.target.value)} />
                </Col>
                <Col span={5}>
                  <Input placeholder="Dịch nghĩa" value={vocabMeaning} onChange={e => setVocabMeaning(e.target.value)} />
                </Col>
                <Col span={6}>
                  <Input placeholder="Ví dụ" value={vocabExample} onChange={e => setVocabExample(e.target.value)} />
                </Col>
                <Col span={6}>
                  <Select
                    placeholder="Chapters"
                    value={vocabChapterId}
                    onChange={val => setVocabChapterId(val)}
                    allowClear
                    style={{ width: '100%' }}
                  >
                    {chapters.map(ch => (
                      <Option key={ch.id} value={ch.id}>
                        {ch.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      if (!vocabWord.trim()) return;
                      const newV = {
                        id: Date.now(),
                        word: vocabWord.trim(),
                        meaning: vocabMeaning.trim(),
                        example: vocabExample.trim(),
                        chapterId: vocabChapterId,
                      };
                      setVocabularies([...vocabularies, newV]);
                      setVocabWord('');
                      setVocabMeaning('');
                      setVocabExample('');
                      setVocabChapterId(undefined);
                    }}
                  >
                    Thêm Từ vựng
                  </Button>
                </Col>
              </Row>
              <Divider />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {vocabularies.length === 0 ? (
                  <div style={{ color: '#8c8c8c' }}>Chưa có từ vựng nào. Thêm từ vựng để bắt đầu.</div>
                ) : (
                  vocabularies.map(v => (
                    <div
                      key={v.id}
                      style={{
                        border: '1px solid #e8e8e8',
                        borderRadius: 6,
                        padding: 12,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'white',
                      }}
                    >
                      <div style={{ width: '75%' }}>
                        <div style={{ fontWeight: 600 }}>{v.word}</div>
                        <div style={{ color: '#8c8c8c', marginTop: 6 }}>Meaning: {v.meaning}</div>
                        {v.example && <div style={{ marginTop: 6, color: '#8c8c8c' }}>Example: {v.example}</div>}
                        <div style={{ marginTop: 8 }}>
                          <Select
                            value={v.chapterId}
                            onChange={val => setVocabularies(vocabularies.map(x => (x.id === v.id ? { ...x, chapterId: val } : x)))}
                            style={{ width: 220 }}
                            allowClear
                          >
                            {chapters.map(ch => (
                              <Option key={ch.id} value={ch.id}>
                                {ch.name}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Popconfirm
                          title="Bạn có chắc muốn xóa từ vựng này?"
                          onConfirm={() => setVocabularies(vocabularies.filter(x => x.id !== v.id))}
                          okText="Xóa"
                          cancelText="Hủy"
                        >
                          <Button danger> Xóa </Button>
                        </Popconfirm>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tab={<span>Ngữ pháp</span>} key="5">
              <Row justify="space-between" align="middle" style={{ marginBottom: 12 }}>
                <Col>
                  <Title level={4} style={{ margin: 0 }}>
                    Danh sách Ngữ pháp
                  </Title>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      if (!grammarPattern.trim()) {
                        message.warning('Vui lòng nhập Mẫu câu');
                        return;
                      }
                      const newG = {
                        id: Date.now(),
                        pattern: grammarPattern.trim(),
                        meaning: grammarMeaning.trim(),
                        example: grammarExample.trim(),
                        lessonId: grammarLessonId,
                      };
                      setGrammars([...(grammars || []), newG]);
                      setGrammarPattern('');
                      setGrammarMeaning('');
                      setGrammarExample('');
                      setGrammarLessonId(undefined);
                      message.success('Đã thêm ngữ pháp');
                    }}
                  >
                    Thêm Ngữ pháp
                  </Button>
                </Col>
              </Row>

              <Form layout="vertical">
                <Form.Item label="Mẫu câu">
                  <Input value={grammarPattern} onChange={e => setGrammarPattern(e.target.value)} placeholder="Mẫu câu" />
                </Form.Item>
                <Form.Item label="Ý nghĩa">
                  <Input value={grammarMeaning} onChange={e => setGrammarMeaning(e.target.value)} placeholder="Ý nghĩa" />
                </Form.Item>
                <Form.Item label="Ví dụ">
                  <Input.TextArea value={grammarExample} onChange={e => setGrammarExample(e.target.value)} rows={4} placeholder="Ví dụ" />
                </Form.Item>

                <Row gutter={12} align="middle">
                  <Col span={12}>
                    <Select
                      placeholder="Chapters"
                      value={grammarLessonId}
                      onChange={val => setGrammarLessonId(val)}
                      allowClear
                      style={{ width: '100%' }}
                    >
                      {chapters.map(ch => (
                        <Option key={ch.id} value={ch.id}>
                          {ch.name}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Row>
              </Form>

              <Divider />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {grammars.length === 0 ? (
                  <div style={{ color: '#8c8c8c' }}>Chưa có ngữ pháp nào. Thêm ngữ pháp để bắt đầu.</div>
                ) : (
                  grammars.map(g => (
                    <div
                      key={g.id}
                      style={{
                        border: '1px solid #e8e8e8',
                        borderRadius: 6,
                        padding: 12,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        background: 'white',
                      }}
                    >
                      <div style={{ width: '75%' }}>
                        <div style={{ fontWeight: 600 }}>{g.pattern}</div>
                        <div style={{ color: '#8c8c8c', marginTop: 8 }}>{g.meaning}</div>
                        {g.example && <div style={{ marginTop: 8, color: '#8c8c8c' }}>Ví dụ: {g.example}</div>}
                        <div style={{ marginTop: 8 }}>
                          <Select
                            value={g.lessonId}
                            onChange={val => setGrammars(grammars.map(x => (x.id === g.id ? { ...x, lessonId: val } : x)))}
                            style={{ width: 200 }}
                            allowClear
                          >
                            {lessonsList.map(ls => (
                              <Option key={ls.id} value={ls.id}>
                                {ls.name}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Popconfirm
                          title="Bạn có chắc muốn xóa ngữ pháp này?"
                          onConfirm={() => setGrammars(grammars.filter(x => x.id !== g.id))}
                          okText="Xóa"
                          cancelText="Hủy"
                        >
                          <Button danger> Xóa </Button>
                        </Popconfirm>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tab={<span>Kỹ năng</span>} key="6">
              <div style={{ minHeight: 120 }}>
                <Row gutter={[12, 12]}>
                  {['Reading', 'Listening', 'Writing', 'Speaking'].map((s, i) => (
                    <Col key={i} span={6}>
                      <Card hoverable style={{ textAlign: 'center' }}>
                        <div style={{ fontWeight: 600 }}>{s}</div>
                        <div style={{ color: '#8c8c8c', marginTop: 8 }}>25 bài</div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tab={<span>Bài tập</span>} key="7">
              <div style={{ minHeight: 120, border: '1px solid #f0f0f0', padding: 12 }}>Quản lý Bài tập (coming soon)</div>
            </Tabs.TabPane>
          </Tabs>
        </Form>
      </Modal>
    </div>
  );
};

export default CourseManagement;
