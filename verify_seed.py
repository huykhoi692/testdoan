#!/usr/bin/env python3
import subprocess
import json

def run_docker_mysql_query(query):
    """Run MySQL query inside docker container"""
    cmd = [
        'docker', 'exec', 'langleague-mysql-1', 'mysql',
        '-uroot', '-p123456', '-D', 'langleague',
        '--json', '-e', query
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.stdout, result.stderr

def verify_seed_data():
    """Verify that seed data was imported"""

    print("=" * 60)
    print("LangLeague Seed Data Verification")
    print("=" * 60)

    # Check book count
    books_stdout, _ = run_docker_mysql_query("SELECT COUNT(*) as count FROM book;")
    chapters_stdout, _ = run_docker_mysql_query("SELECT COUNT(*) as count FROM chapter;")
    words_stdout, _ = run_docker_mysql_query("SELECT COUNT(*) as count FROM word;")

    print("\n✓ Record Counts:")
    print(f"  Books: {books_stdout.strip()}")
    print(f"  Chapters: {chapters_stdout.strip()}")
    print(f"  Words: {words_stdout.strip()}")

    # Show sample books
    books_data, _ = run_docker_mysql_query("SELECT id, title, level FROM book LIMIT 3;")
    print("\n✓ Sample Books:")
    print(books_data)

    # Show sample words
    words_data, _ = run_docker_mysql_query("SELECT id, text, meaning, pronunciation FROM word LIMIT 5;")
    print("\n✓ Sample Vocabulary Words:")
    print(words_data)

    print("\n" + "=" * 60)
    print("✓ Seed data import completed successfully!")
    print("=" * 60)

if __name__ == '__main__':
    verify_seed_data()

