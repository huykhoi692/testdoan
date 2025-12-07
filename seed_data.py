#!/usr/bin/env python3
"""
Seed vocabulary data for LangLeague application
"""
import mysql.connector
from datetime import datetime

# Database configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '123456',
    'database': 'langleague',
    'port': 3306
}

def connect_db():
    """Connect to MySQL database"""
    try:
        conn = mysql.connector.connect(**db_config)
        return conn
    except mysql.connector.Error as err:
        print(f"Error connecting to database: {err}")
        return None

def seed_data(conn):
    """Seed vocabulary and related data"""
    cursor = conn.cursor()

    try:
        # 1. Insert books
        books_data = [
            (1, '기초 한국어 (Basic Korean)', '한국어 교육원', 'Giáo trình tiếng Hàn cơ bản dành cho người mới bắt đầu', 'BEGINNER', 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=400'),
            (2, '일상 대화 (Daily Conversations)', '이지영', 'Học tiếng Hàn giao tiếp hàng ngày', 'BEGINNER', 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=400'),
        ]

        for book in books_data:
            sql = "INSERT IGNORE INTO book (id, title, author, description, level, thumbnail_url, created_at, created_by, updated_at, is_published) VALUES (%s, %s, %s, %s, %s, %s, NOW(), 'system', NOW(), TRUE)"
            cursor.execute(sql, book)

        print(f"✓ Inserted {len(books_data)} books")

        # 2. Insert chapters
        chapters_data = [
            (1, 1, 1, 'Insa wa Soggae (Greetings & Introductions)', 'Greetings chapter', 1, True),
            (2, 1, 2, 'Family (Gajok)', 'Family vocabulary', 2, True),
            (3, 2, 1, 'Restaurant (Sikdang)', 'Restaurant vocabulary', 1, True),
            (4, 2, 2, 'Shopping (Syoping)', 'Shopping vocabulary', 2, True),
        ]

        for chapter in chapters_data:
            sql = "INSERT IGNORE INTO chapter (id, book_id, chapter_number, title, content, order_index, is_published, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s, NOW())"
            cursor.execute(sql, chapter)

        print(f"✓ Inserted {len(chapters_data)} chapters")

        # 3. Insert vocabulary words
        words_data = [
            # Chapter 1: Greetings
            (1, 'Annyeonghaseyo', 'Hello (formal)', 'an-nyong-ha-say-yo', 'Greeting', 'https://images.unsplash.com/photo-1582610116397-edb318620f90?w=300', 1, 1),
            (2, 'Annyeong', 'Hello (casual)', 'an-nyong', 'Greeting', 'https://images.unsplash.com/photo-1591035897819-f4bdf739f446?w=300', 1, 2),
            (3, 'Gamsahamnida', 'Thank you (formal)', 'gam-sa-ham-ni-da', 'Expression', 'https://images.unsplash.com/photo-1607827448387-a67db1383b59?w=300', 1, 3),
            (4, 'Joesonghamnida', 'Sorry (formal)', 'joe-song-ham-ni-da', 'Expression', 'https://images.unsplash.com/photo-1579532537902-1e50099867b4?w=300', 1, 4),
            (5, 'Ne', 'Yes/Okay', 'ne', 'Response', None, 1, 5),
            (6, 'Aniyo', 'No', 'a-ni-yo', 'Response', None, 1, 6),
            (7, 'Gwaenchanayo', 'Its okay/Fine', 'gwane-cha-na-yo', 'Expression', None, 1, 7),
            (8, 'Cheoeum boepgesseumnida', 'Nice to meet you', 'cheo-um bwep-ges-seum-ni-da', 'Greeting', None, 1, 8),
            (9, 'Mianhaeyo', 'Sorry (casual)', 'mi-an-hae-yo', 'Expression', None, 1, 9),
            (10, 'Joeseoyo', 'Good/Fine', 'joe-se-yo', 'Adjective', None, 1, 10),

            # Chapter 2: Family
            (11, 'Gajok', 'Family', 'ga-jok', 'Noun', 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300', 2, 1),
            (12, 'Abeoji', 'Father (formal)', 'a-be-o-ji', 'Noun', 'https://images.unsplash.com/photo-1542909168-82c3e7fdca44?w=300', 2, 2),
            (13, 'Appa', 'Dad (casual)', 'ap-pa', 'Noun', 'https://images.unsplash.com/photo-1542909168-82c3e7fdca44?w=300', 2, 3),
            (14, 'Eomeoni', 'Mother (formal)', 'eo-me-o-ni', 'Noun', 'https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?w=300', 2, 4),
            (15, 'Eomma', 'Mom (casual)', 'eom-ma', 'Noun', 'https://images.unsplash.com/photo-1571844307880-751c6d86f3f3?w=300', 2, 5),
            (16, 'Hyeong', 'Older brother (male)', 'hyong', 'Noun', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300', 2, 6),
            (17, 'Oppa', 'Older brother (female)', 'op-pa', 'Noun', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', 2, 7),
            (18, 'Nuna', 'Older sister (male)', 'nu-na', 'Noun', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300', 2, 8),
            (19, 'Eonni', 'Older sister (female)', 'eon-ni', 'Noun', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300', 2, 9),
            (20, 'Dongsaeng', 'Younger sibling', 'dong-saeng', 'Noun', 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300', 2, 10),

            # Chapter 3: Restaurant
            (21, 'Eumsik', 'Food', 'eum-sik', 'Noun', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300', 3, 1),
            (22, 'Mul', 'Water', 'mul', 'Noun', 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300', 3, 2),
            (23, 'Gimchi', 'Kimchi', 'gim-chi', 'Noun', 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=300', 3, 3),
            (24, 'Bibimbap', 'Mixed rice bowl', 'bi-bim-bap', 'Noun', 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=300', 3, 4),
            (25, 'Bulgogi', 'Grilled meat', 'bul-go-gi', 'Noun', 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=300', 3, 5),
            (26, 'Ramyeon', 'Ramen noodles', 'ram-yeon', 'Noun', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300', 3, 6),
            (27, 'Keopi', 'Coffee', 'ke-o-pi', 'Noun', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300', 3, 7),
            (28, 'Jyuseu', 'Juice', 'jyu-seu', 'Noun', 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300', 3, 8),
            (29, 'Massisseoyo', 'Delicious', 'ma-siss-eo-yo', 'Adjective', None, 3, 9),
            (30, 'Jumunhada', 'To order', 'ju-mun-ha-da', 'Verb', None, 3, 10),

            # Chapter 4: Shopping
            (31, 'Gage', 'Store', 'ga-ge', 'Noun', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300', 4, 1),
            (32, 'Don', 'Money', 'don', 'Noun', 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=300', 4, 2),
            (33, 'Bissada', 'Expensive', 'bis-sa-da', 'Adjective', None, 4, 3),
            (34, 'Ssada', 'Cheap', 'ssa-da', 'Adjective', None, 4, 4),
            (35, 'Eolmayeyo', 'How much?', 'eol-ma-ye-yo', 'Question', None, 4, 5),
            (36, 'Sada', 'To buy', 'sa-da', 'Verb', None, 4, 6),
            (37, 'Palda', 'To sell', 'pal-da', 'Verb', None, 4, 7),
            (38, 'Ot', 'Clothes', 'ot', 'Noun', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300', 4, 8),
            (39, 'Sinbal', 'Shoes', 'sin-bal', 'Noun', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300', 4, 9),
            (40, 'Gabang', 'Bag', 'ga-bang', 'Noun', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300', 4, 10),
        ]

        for word in words_data:
            sql = "INSERT IGNORE INTO word (id, text, meaning, pronunciation, part_of_speech, image_url, chapter_id, order_index, created_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW())"
            cursor.execute(sql, word)

        print(f"✓ Inserted {len(words_data)} vocabulary words")

        # Commit changes
        conn.commit()

        # Verify
        cursor.execute("SELECT COUNT(*) FROM book")
        books_count = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM chapter")
        chapters_count = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM word")
        words_count = cursor.fetchone()[0]

        print("\n✓ Data verification:")
        print(f"  Books: {books_count}")
        print(f"  Chapters: {chapters_count}")
        print(f"  Vocabulary Words: {words_count}")
        print(f"\nTotal: {books_count + chapters_count + words_count} records")

    except mysql.connector.Error as err:
        print(f"Error inserting data: {err}")
        conn.rollback()
    finally:
        cursor.close()

if __name__ == '__main__':
    print("Seeding LangLeague vocabulary data...")
    print("-" * 50)

    conn = connect_db()
    if conn:
        seed_data(conn)
        conn.close()
        print("\n✓ Seed completed successfully!")
    else:
        print("✗ Failed to connect to database")

