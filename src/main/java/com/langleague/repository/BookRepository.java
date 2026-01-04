package com.langleague.repository;

import com.langleague.domain.Book;
import com.langleague.domain.enumeration.Level;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Book entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    /**
     * Find book by ID with chapters eagerly loaded to prevent N+1 queries.
     * Use case: Get book details with all chapters
     */
    @EntityGraph(attributePaths = { "chapters" })
    Optional<Book> findWithChaptersById(Long id);

    /**
     * Find book by ID with full details (chapters and their exercises) to prevent N+1 queries.
     * Use case: Get complete book details for learning
     */
    @EntityGraph(
        attributePaths = {
            "chapters",
            "chapters.listeningExercises",
            "chapters.speakingExercises",
            "chapters.readingExercises",
            "chapters.writingExercises",
        }
    )
    Optional<Book> findWithFullDetailsById(Long id);

    /**
     * Find all activated books with chapters eagerly loaded.
     * Use case: Display book list with chapter count
     */
    @EntityGraph(attributePaths = { "chapters" })
    @Query("SELECT b FROM Book b WHERE b.isActivate = true")
    Page<Book> findActivatedWithChapters(Pageable pageable);

    /**
     * Find books waiting for approval (isActivate = false).
     */
    List<Book> findByIsActivateFalse();

    /**
     * Find books by title or description containing keyword (case-insensitive).
     * Use case 18: Search lessons
     */
    Page<Book> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description, Pageable pageable);

    /**
     * Find books by level.
     * Use case 27: Get lesson recommendation
     */
    List<Book> findByLevel(Level level);

    /**
     * Find books by multiple levels.
     * Use case 27: Get lesson recommendation for multiple levels
     */
    List<Book> findByLevelIn(List<Level> levels);

    /**
     * Count books by level.
     * Use case: Statistics and analytics
     */
    long countByLevel(Level level);

    /**
     * Check if book exists by title.
     * Use case: Prevent duplicate book titles
     */
    boolean existsByTitle(String title);

    /**
     * Check if book exists by title and id not equal.
     * Use case: Prevent duplicate book titles when updating
     */
    boolean existsByTitleAndIdNot(String title, Long id);

    /**
     * Find only activated books.
     * Use case: Display only activated books to users
     */
    Page<Book> findByIsActivateTrue(Pageable pageable);

    /**
     * Find activated books by level.
     */
    List<Book> findByIsActivateTrueAndLevel(Level level);

    /**
     * Find activated books by multiple levels.
     */
    List<Book> findByIsActivateTrueAndLevelIn(List<Level> levels);

    /**
     * Search activated books only.
     */
    Page<Book> findByIsActivateTrueAndTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
        String title,
        String description,
        Pageable pageable
    );

    /**
     * Find only inactivated books.
     * Use case: Display only inactivated books to admins
     */
    Page<Book> findByIsActivateFalse(Pageable pageable);
}
