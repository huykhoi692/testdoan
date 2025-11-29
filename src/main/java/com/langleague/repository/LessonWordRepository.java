package com.langleague.repository;

import com.langleague.domain.LessonWord;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the LessonWord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LessonWordRepository extends JpaRepository<LessonWord, Long> {
    List<LessonWord> findByLessonId(Long lessonId);
}
