-- ============================================
-- Seed Data for LangLeague Vocabulary & TTS
-- ============================================

USE langleague;

-- Insert test users if not exists
INSERT IGNORE INTO jhi_user (id, login, password_hash, first_name, last_name, email, activated, lang_key, created_by, created_date)
VALUES
(1, 'admin', '$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC', 'Admin', 'User', 'admin@localhost', TRUE, 'en', 'system', NOW()),
(2, 'user', '$2a$10$VEjxo0jq2YG9Rbk2HmX9S.k1uZBGYUHdUcid3g/vfiEl7lwWgOH/K', 'User', 'Test', 'user@localhost', TRUE, 'en', 'system', NOW());

-- Insert authorities if not exists
INSERT IGNORE INTO jhi_authority (name) VALUES ('ROLE_USER'), ('ROLE_ADMIN');

-- Insert user authorities
INSERT IGNORE INTO jhi_user_authority (user_id, authority_name)
VALUES (1, 'ROLE_ADMIN'), (1, 'ROLE_USER'), (2, 'ROLE_USER');

-- Insert app_user (extended user info)
INSERT IGNORE INTO app_user (id, user_id, display_name, avatar_url, bio, learning_streak, total_study_time, level_current, experience_points, created_at)
VALUES
(1, 1, 'Admin', NULL, 'Administrator account', 0, 0, 'BEGINNER', 0, NOW()),
(2, 2, 'Test User', NULL, 'Test user for vocabulary learning', 5, 120, 'BEGINNER', 150, NOW());

-- Insert Korean books
INSERT INTO book (id, title, author, description, level, thumbnail_url, created_at, created_by, updated_at, is_published)
VALUES
(1, '기초 한국어 (Basic Korean)', '한국어 교육원', 'Giáo trình tiếng Hàn cơ bản dành cho người mới bắt đầu. Học từ vựng, ngữ pháp và văn hóa Hàn Quốc.', 'BEGINNER', 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=400', NOW(), 'system', NOW(), TRUE),
(2, '일상 대화 (Daily Conversations)', '이지영', 'Học tiếng Hàn giao tiếp hàng ngày qua các tình huống thực tế. Từ chào hỏi đến mua sắm, ăn uống.', 'BEGINNER', 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=400', NOW(), 'system', NOW(), TRUE);

-- Insert chapters
INSERT INTO chapter (id, book_id, chapter_number, title, content, order_index, is_published, created_at)
VALUES
(1, 1, 1, '인사와 소개 (Greetings & Introductions)', 'Chương này giới thiệu các cách chào hỏi và tự giới thiệu bản thân trong tiếng Hàn.', 1, TRUE, NOW()),
(2, 1, 2, '가족 (Family)', 'Học từ vựng về gia đình và cách nói về các thành viên trong gia đình.', 2, TRUE, NOW()),
(3, 2, 1, '식당에서 (At the Restaurant)', 'Từ vựng và câu giao tiếp khi đi ăn nhà hàng.', 1, TRUE, NOW()),
(4, 2, 2, '쇼핑 (Shopping)', 'Các từ vựng và câu hỏi khi mua sắm.', 2, TRUE, NOW());

-- Insert vocabulary words - Chapter 1: Greetings
INSERT INTO word (id, text, meaning, pronunciation, part_of_speech, image_url, chapter_id, order_index, created_at)
VALUES
-- Greetings
(1, '안녕하세요', 'Xin chào (lịch sự)', 'annyeonghaseyo', 'Greeting', 'https://images.unsplash.com/photo-1582610116397-edb318620f90?w=300', 1, 1, NOW()),
(2, '안녕', 'Chào (thân mật)', 'annyeong', 'Greeting', 'https://images.unsplash.com/photo-1591035897819-f4bdf739f446?w=300', 1, 2, NOW()),
(3, '감사합니다', 'Cảm ơn (lịch sự)', 'gamsahamnida', 'Expression', 'https://images.unsplash.com/photo-1607827448387-a67db1383b59?w=300', 1, 3, NOW()),
(4, '고맙습니다', 'Cảm ơn (thân thiện)', 'gomapseumnida', 'Expression', 'https://images.unsplash.com/photo-1607827448387-a67db1383b59?w=300', 1, 4, NOW()),
(5, '죄송합니다', 'Xin lỗi (lịch sự)', 'joesonghamnida', 'Expression', 'https://images.unsplash.com/photo-1579532537902-1e50099867b4?w=300', 1, 5, NOW()),
(6, '미안해요', 'Xin lỗi (thường)', 'mianhaeyo', 'Expression', 'https://images.unsplash.com/photo-1579532537902-1e50099867b4?w=300', 1, 6, NOW()),
(7, '네', 'Vâng / Có', 'ne', 'Response', NULL, 1, 7, NOW()),
(8, '아니요', 'Không', 'aniyo', 'Response', NULL, 1, 8, NOW()),
(9, '괜찮아요', 'Không sao / Được', 'gwaenchanayo', 'Expression', NULL, 1, 9, NOW()),
(10, '처음 뵙겠습니다', 'Rất hân hạnh được gặp bạn', 'cheoeum boepgesseumnida', 'Greeting', NULL, 1, 10, NOW()),

-- Chapter 2: Family
(11, '가족', 'Gia đình', 'gajok', 'Noun', 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300', 2, 1, NOW()),
(12, '아버지', 'Cha / Bố (tôn trọng)', 'abeoji', 'Noun', 'https://images.unsplash.com/photo-1542909168-82c3e7fdca44?w=300', 2, 2, NOW()),
(13, '아빠', 'Bố (thân mật)', 'appa', 'Noun', 'https://images.unsplash.com/photo-1542909168-82c3e7fdca44?w=300', 2, 3, NOW()),
(14, '어머니', 'Mẹ (tôn trọng)', 'eomeoni', 'Noun', 'https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?w=300', 2, 4, NOW()),
(15, '엄마', 'Mẹ (thân mật)', 'eomma', 'Noun', 'https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?w=300', 2, 5, NOW()),
(16, '형', 'Anh trai (nam gọi)', 'hyeong', 'Noun', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300', 2, 6, NOW()),
(17, '오빠', 'Anh trai (nữ gọi)', 'oppa', 'Noun', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', 2, 7, NOW()),
(18, '누나', 'Chị gái (nam gọi)', 'nuna', 'Noun', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300', 2, 8, NOW()),
(19, '언니', 'Chị gái (nữ gọi)', 'eonni', 'Noun', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300', 2, 9, NOW()),
(20, '동생', 'Em', 'dongsaeng', 'Noun', 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300', 2, 10, NOW()),

-- Chapter 3: Restaurant
(21, '음식', 'Đồ ăn', 'eumsik', 'Noun', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300', 3, 1, NOW()),
(22, '물', 'Nước', 'mul', 'Noun', 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300', 3, 2, NOW()),
(23, '김치', 'Kim chi', 'gimchi', 'Noun', 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=300', 3, 3, NOW()),
(24, '비빔밥', 'Cơm trộn', 'bibimbap', 'Noun', 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=300', 3, 4, NOW()),
(25, '불고기', 'Thịt nướng', 'bulgogi', 'Noun', 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=300', 3, 5, NOW()),
(26, '라면', 'Mì gói', 'ramyeon', 'Noun', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300', 3, 6, NOW()),
(27, '커피', 'Cà phê', 'keopi', 'Noun', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300', 3, 7, NOW()),
(28, '주스', 'Nước ép', 'juseu', 'Noun', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300', 3, 8, NOW()),
(29, '맛있어요', 'Ngon', 'masisseoyo', 'Adjective', NULL, 3, 9, NOW()),
(30, '주문하다', 'Đặt món', 'jumunhada', 'Verb', NULL, 3, 10, NOW()),

-- Chapter 4: Shopping
(31, '가게', 'Cửa hàng', 'gage', 'Noun', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300', 4, 1, NOW()),
(32, '돈', 'Tiền', 'don', 'Noun', 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=300', 4, 2, NOW()),
(33, '비싸다', 'Đắt', 'bissada', 'Adjective', NULL, 4, 3, NOW()),
(34, '싸다', 'Rẻ', 'ssada', 'Adjective', NULL, 4, 4, NOW()),
(35, '얼마예요', 'Bao nhiêu tiền?', 'eolmayeyo', 'Question', NULL, 4, 5, NOW()),
(36, '사다', 'Mua', 'sada', 'Verb', NULL, 4, 6, NOW()),
(37, '팔다', 'Bán', 'palda', 'Verb', NULL, 4, 7, NOW()),
(38, '옷', 'Quần áo', 'ot', 'Noun', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300', 4, 8, NOW()),
(39, '신발', 'Giày', 'sinbal', 'Noun', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300', 4, 9, NOW()),
(40, '가방', 'Túi xách', 'gabang', 'Noun', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300', 4, 10, NOW());

-- Insert user_book (user's library)
INSERT INTO user_book (id, app_user_id, book_id, learning_status, progress_percent, last_accessed, is_favorite, created_at)
VALUES
(1, 2, 1, 'IN_PROGRESS', 45, NOW(), TRUE, NOW()),
(2, 2, 2, 'IN_PROGRESS', 20, NOW(), FALSE, NOW());

-- Insert chapter_progress
INSERT INTO chapter_progress (id, user_id, chapter_id, progress_percentage, last_read_position, is_completed, last_accessed, total_time_spent)
VALUES
(1, 2, 1, 80, 500, FALSE, NOW(), 1200),
(2, 2, 2, 30, 200, FALSE, NOW(), 600),
(3, 2, 3, 15, 100, FALSE, NOW(), 300);

-- Insert some user_vocabulary (saved words)
INSERT INTO user_vocabulary (id, app_user_id, word_id, memorization_level, last_reviewed, next_review_date, review_count, is_favorite, created_at)
VALUES
(1, 2, 1, 'LEARNING', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 3, TRUE, NOW()),
(2, 2, 2, 'LEARNING', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 2, FALSE, NOW()),
(3, 2, 3, 'MASTERED', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 10, TRUE, NOW()),
(4, 2, 11, 'LEARNING', NOW(), DATE_ADD(NOW(), INTERVAL 2 DAY), 5, FALSE, NOW()),
(5, 2, 21, 'LEARNING', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY), 1, TRUE, NOW());

-- Insert grammar points for chapters
INSERT INTO grammar (id, title, description, explanation, example, example_translation, level, chapter_id, order_index, created_at)
VALUES
(1, '이에요/예요', 'Trợ từ chỉ định "là"', 'Dùng để nói "là" trong tiếng Hàn. Dùng 이에요 sau phụ âm, 예요 sau nguyên âm.',
   '저는 학생이에요.', 'Tôi là học sinh.', 'BEGINNER', 1, 1, NOW()),

(2, '은/는', 'Trợ từ chủ đề', 'Đánh dấu chủ đề của câu. Dùng 은 sau phụ âm, 는 sau nguyên âm.',
   '저는 한국 사람입니다.', 'Tôi là người Hàn Quốc.', 'BEGINNER', 1, 2, NOW()),

(3, '을/를', 'Trợ từ tân ngữ', 'Đánh dấu tân ngữ trực tiếp. Dùng 을 sau phụ âm, 를 sau nguyên âm.',
   '저는 김치를 좋아해요.', 'Tôi thích kim chi.', 'BEGINNER', 3, 1, NOW());

COMMIT;

-- Verify data
SELECT
    'Books' as table_name, COUNT(*) as count FROM book
UNION ALL
SELECT 'Chapters', COUNT(*) FROM chapter
UNION ALL
SELECT 'Words', COUNT(*) FROM word
UNION ALL
SELECT 'Users', COUNT(*) FROM app_user
UNION ALL
SELECT 'User Books', COUNT(*) FROM user_book
UNION ALL
SELECT 'User Vocabulary', COUNT(*) FROM user_vocabulary
UNION ALL
SELECT 'Grammar', COUNT(*) FROM grammar;

