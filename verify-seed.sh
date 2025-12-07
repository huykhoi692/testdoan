#!/bin/bash

# Test script to verify seed data
echo "Checking LangLeague database..."
echo "==============================="

docker exec langleague-mysql-1 mysql -uroot -p123456 langleague << EOF
SELECT "Books:" as info, COUNT(*) as count FROM book;
SELECT "Chapters:" as info, COUNT(*) as count FROM chapter;
SELECT "Words:" as info, COUNT(*) as count FROM word;
EOF

echo ""
echo "Sample data from book table:"
docker exec langleague-mysql-1 mysql -uroot -p123456 langleague -e "SELECT id, title, level FROM book LIMIT 5;"

echo ""
echo "Sample data from word table:"
docker exec langleague-mysql-1 mysql -uroot -p123456 langleague -e "SELECT id, text, meaning, pronunciation FROM word LIMIT 5;"

