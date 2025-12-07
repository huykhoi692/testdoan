-- Simple seed data for LangLeague - English version for testing
USE langleague;

-- Insert books
INSERT IGNORE INTO book (id, title, author, description, level, created_at, created_by, updated_at, is_published)
VALUES
(1, 'Basic Korean', 'Korean Institute', 'Basic Korean course for beginners', 'BEGINNER', NOW(), 'system', NOW(), TRUE),
(2, 'Daily Conversations', 'Lee Ji Young', 'Learn Korean daily conversations', 'BEGINNER', NOW(), 'system', NOW(), TRUE);

-- Insert chapters
INSERT IGNORE INTO chapter (id, book_id, chapter_number, title, content, order_index, is_published, created_at)
VALUES
(1, 1, 1, 'Greetings', 'Learn how to greet in Korean', 1, TRUE, NOW()),
(2, 1, 2, 'Family', 'Learn family vocabulary', 2, TRUE, NOW()),
(3, 2, 1, 'Restaurant', 'Learn restaurant vocabulary', 1, TRUE, NOW()),
(4, 2, 2, 'Shopping', 'Learn shopping vocabulary', 2, TRUE, NOW());

-- Insert vocabulary words
INSERT IGNORE INTO word (id, text, meaning, pronunciation, part_of_speech, image_url, chapter_id, order_index, created_at)
VALUES
-- Chapter 1: Greetings
(1, 'Hello', 'Greeting', 'huh-LOH', 'Greeting', 'https://images.unsplash.com/photo-1582610116397-edb318620f90?w=300', 1, 1, NOW()),
(2, 'Good morning', 'Morning greeting', 'joh anum', 'Greeting', 'https://images.unsplash.com/photo-1591035897819-f4bdf739f446?w=300', 1, 2, NOW()),
(3, 'Thank you', 'Expression of gratitude', 'GAHM-sah-hahm-ni-dah', 'Expression', 'https://images.unsplash.com/photo-1607827448387-a67db1383b59?w=300', 1, 3, NOW()),
(4, 'Sorry', 'Apology', 'joe-SONG-hahm-ni-dah', 'Expression', 'https://images.unsplash.com/photo-1579532537902-1e50099867b4?w=300', 1, 4, NOW()),
(5, 'Yes', 'Affirmative response', 'nay', 'Response', NULL, 1, 5, NOW()),
(6, 'No', 'Negative response', 'ah-nee-yoh', 'Response', NULL, 1, 6, NOW()),
(7, 'Fine', 'Expression of well-being', 'gwahn-chahn-ah-yoh', 'Expression', NULL, 1, 7, NOW()),
(8, 'Nice to meet you', 'Polite greeting', 'choh-eum bwep-ges-seum-ni-dah', 'Greeting', NULL, 1, 8, NOW()),

-- Chapter 2: Family
(11, 'Father', 'Male parent', 'ah-buh-jee', 'Noun', 'https://images.unsplash.com/photo-1542909168-82c3e7fdca44?w=300', 2, 1, NOW()),
(12, 'Mother', 'Female parent', 'uh-muh-nee', 'Noun', 'https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?w=300', 2, 2, NOW()),
(13, 'Brother', 'Male sibling', 'hyung', 'Noun', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300', 2, 3, NOW()),
(14, 'Sister', 'Female sibling', 'noo-nah', 'Noun', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300', 2, 4, NOW()),
(15, 'Family', 'Group of relatives', 'gah-jok', 'Noun', 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300', 2, 5, NOW()),

-- Chapter 3: Restaurant
(21, 'Food', 'Edible substance', 'eum-shik', 'Noun', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300', 3, 1, NOW()),
(22, 'Water', 'Liquid drink', 'mul', 'Noun', 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300', 3, 2, NOW()),
(23, 'Kimchi', 'Korean side dish', 'gim-chee', 'Noun', 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=300', 3, 3, NOW()),
(24, 'Rice bowl', 'Mixed rice dish', 'bee-bee-bahp', 'Noun', 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=300', 3, 4, NOW()),
(25, 'Coffee', 'Hot beverage', 'kuh-oh-pee', 'Noun', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300', 3, 5, NOW()),

-- Chapter 4: Shopping
(31, 'Store', 'Place to buy items', 'gah-geh', 'Noun', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300', 4, 1, NOW()),
(32, 'Money', 'Currency', 'don', 'Noun', 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=300', 4, 2, NOW()),
(33, 'Expensive', 'High cost', 'bis-sah-dah', 'Adjective', NULL, 4, 3, NOW()),
(34, 'Cheap', 'Low cost', 'ssah-dah', 'Adjective', NULL, 4, 4, NOW()),
(35, 'How much', 'Question about price', 'uh-mah-yeh-yo', 'Question', NULL, 4, 5, NOW()),
(36, 'Clothes', 'Wearable fabric', 'oht', 'Noun', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300', 4, 6, NOW()),
(37, 'Shoes', 'Footwear', 'shin-bahl', 'Noun', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300', 4, 7, NOW());

-- Show final counts
SELECT 'SEED DATA SUMMARY' as result UNION ALL
SELECT CONCAT('Books: ', COUNT(*)) FROM book UNION ALL
SELECT CONCAT('Chapters: ', COUNT(*)) FROM chapter UNION ALL
SELECT CONCAT('Vocabulary Words: ', COUNT(*)) FROM word;

