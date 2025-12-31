package com.langleague.repository;

import com.langleague.domain.ReadingExercise;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ReadingExercise entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReadingExerciseRepository extends JpaRepository<ReadingExercise, Long> {
    /**
     * Find all reading exercises by chapter ID.
     *
     * @param chapterId the chapter ID
     * @return list of reading exercises
     */
    @Query("SELECT e FROM ReadingExercise e WHERE e.readingPassage.chapter.id = :chapterId")
    List<ReadingExercise> findByChapterId(@Param("chapterId") Long chapterId);

    /**
     * Count all reading exercises by chapter ID.
     *
     * @param chapterId the chapter ID
     * @return count of reading exercises
     */
    @Query("SELECT COUNT(e) FROM ReadingExercise e WHERE e.readingPassage.chapter.id = :chapterId")
    long countByChapter_Id(@Param("chapterId") Long chapterId);
}
