package com.langleague.repository;

import com.langleague.domain.UserProgress;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the UserProgress entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    // Use case 24, 25, 26: Track user progress
    Optional<UserProgress> findByAppUserIdAndLessonId(Long appUserId, Long lessonId);

    Page<UserProgress> findByAppUserId(Long appUserId, Pageable pageable);

    // Use case 41: Learning history view - ordered by last accessed
    Page<UserProgress> findByAppUserIdOrderByLastAccessedDesc(Long appUserId, Pageable pageable);
}
