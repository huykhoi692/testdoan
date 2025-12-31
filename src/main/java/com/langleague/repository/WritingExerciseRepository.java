package com.langleague.repository;

import com.langleague.domain.WritingExercise;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the WritingExercise entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WritingExerciseRepository extends JpaRepository<WritingExercise, Long> {
    /**
     * Find all writing exercises by chapter ID.
     *
     * @param chapterId the chapter ID
     * @return list of writing exercises
     */
    @Query("SELECT e FROM WritingExercise e WHERE e.writingTask.chapter.id = :chapterId")
    List<WritingExercise> findByChapterId(@Param("chapterId") Long chapterId);

    /**
     * Count all writing exercises by chapter ID.
     *
     * @param chapterId the chapter ID
     * @return count of writing exercises
     */
    @Query("SELECT COUNT(e) FROM WritingExercise e WHERE e.writingTask.chapter.id = :chapterId")
    long countByChapter_Id(@Param("chapterId") Long chapterId);
}
