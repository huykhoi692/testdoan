package com.langleague.repository;

import com.langleague.domain.Lesson;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    @EntityGraph(attributePaths = { "words", "skills" })
    @Query("SELECT l FROM Lesson l WHERE l.chapterEntity.id = :chapterId AND l.isPublished = true ORDER BY l.orderIndex")
    List<Lesson> findPublishedLessonsByChapter(@Param("chapterId") Long chapterId);

    @EntityGraph(attributePaths = { "chapter" })
    @Query("SELECT l FROM Lesson l WHERE l.isPublished = true ORDER BY l.chapterEntity.orderIndex, l.orderIndex")
    Page<Lesson> findAllPublishedLessons(Pageable pageable);

    @Query(
        "SELECT l FROM Lesson l LEFT JOIN FETCH l.words w LEFT JOIN FETCH l.skills s LEFT JOIN FETCH l.listeningExercises le LEFT JOIN FETCH l.speakingExercises se WHERE l.id = :id"
    )
    Optional<Lesson> findByIdWithDetails(@Param("id") Long id);

    @Query(
        "SELECT l FROM Lesson l WHERE l.chapterEntity.id = :chapterId AND l.orderIndex > :currentOrderIndex AND l.isPublished = true ORDER BY l.orderIndex ASC"
    )
    Optional<Lesson> findNextLesson(@Param("chapterId") Long chapterId, @Param("currentOrderIndex") Integer currentOrderIndex);

    @Query("SELECT COUNT(l) FROM Lesson l WHERE l.chapterEntity.id = :chapterId AND l.orderIndex = :orderIndex")
    boolean existsByChapterAndOrderIndex(@Param("chapterId") Long chapterId, @Param("orderIndex") Integer orderIndex);

    // Use case 18: Search lessons
    @Query(
        "SELECT DISTINCT l FROM Lesson l LEFT JOIN l.words w WHERE l.isPublished = true AND (LOWER(l.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(CAST(l.description AS string)) LIKE LOWER(CONCAT('%', :keyword, '%')))"
    )
    List<Lesson> searchByKeyword(@Param("keyword") String keyword);

    // Use case 27: Get recommendations by level
    @Query("SELECT l FROM Lesson l WHERE l.isPublished = true AND l.level = :level ORDER BY l.orderIndex")
    List<Lesson> findByLevel(@Param("level") String level);

    // Use case 16: Get all published lessons
    @Query("SELECT l FROM Lesson l WHERE l.isPublished = true ORDER BY l.orderIndex")
    List<Lesson> findAllPublished();

    // Find lessons by chapter ID
    List<Lesson> findByChapterEntityId(Long chapterId);

    @Query("SELECT COUNT(l) FROM Lesson l WHERE l.chapterEntity.id = :chapterId AND l.isPublished = true")
    long countPublishedLessonsByChapter(@Param("chapterId") Long chapterId);
}
