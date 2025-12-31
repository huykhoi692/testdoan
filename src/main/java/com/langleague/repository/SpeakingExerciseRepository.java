package com.langleague.repository;

import com.langleague.domain.SpeakingExercise;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SpeakingExercise entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpeakingExerciseRepository extends JpaRepository<SpeakingExercise, Long> {
    /**
     * Find all speaking exercises by chapter ID.
     *
     * @param chapterId the chapter ID
     * @return list of speaking exercises
     */
    @Query("SELECT e FROM SpeakingExercise e WHERE e.speakingTopic.chapter.id = :chapterId")
    List<SpeakingExercise> findByChapterId(@Param("chapterId") Long chapterId);

    /**
     * Count all speaking exercises by chapter ID.
     *
     * @param chapterId the chapter ID
     * @return count of speaking exercises
     */
    @Query("SELECT COUNT(e) FROM SpeakingExercise e WHERE e.speakingTopic.chapter.id = :chapterId")
    long countByChapter_Id(@Param("chapterId") Long chapterId);
}
