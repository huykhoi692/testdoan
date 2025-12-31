package com.langleague.repository;

import com.langleague.domain.ListeningExercise;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ListeningExercise entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListeningExerciseRepository extends JpaRepository<ListeningExercise, Long> {
    /**
     * Find all listening exercises by chapter ID.
     *
     * @param chapterId the chapter ID
     * @return list of listening exercises
     */
    @Query("SELECT e FROM ListeningExercise e WHERE e.listeningAudio.chapter.id = :chapterId")
    List<ListeningExercise> findByChapterId(@Param("chapterId") Long chapterId);

    /**
     * Count all listening exercises by chapter ID.
     *
     * @param chapterId the chapter ID
     * @return count of listening exercises
     */
    @Query("SELECT COUNT(e) FROM ListeningExercise e WHERE e.listeningAudio.chapter.id = :chapterId")
    long countByChapter_Id(@Param("chapterId") Long chapterId);
}
