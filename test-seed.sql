-- Simple test data
INSERT IGNORE INTO book (id, title, author, description, level, created_at, created_by, updated_at, is_published)
VALUES (1, 'Test Book', 'Author', 'Description', 'BEGINNER', NOW(), 'system', NOW(), TRUE);

INSERT IGNORE INTO chapter (id, book_id, chapter_number, title, content, order_index, is_published, created_at)
VALUES (1, 1, 1, 'Chapter 1', 'Content', 1, TRUE, NOW());

INSERT IGNORE INTO word (id, text, meaning, pronunciation, part_of_speech, chapter_id, order_index, created_at)
VALUES (1, 'Hello', 'Greeting in English', 'huh-LOH', 'Greeting', 1, 1, NOW());

SELECT 'Books:', (SELECT COUNT(*) FROM book);
SELECT 'Chapters:', (SELECT COUNT(*) FROM chapter);
SELECT 'Words:', (SELECT COUNT(*) FROM word);

