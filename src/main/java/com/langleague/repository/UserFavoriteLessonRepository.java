package com.langleague.repository;

import com.langleague.domain.UserFavoriteLesson;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Repository for UserFavoriteLesson entity
 * Use case 38: Save favorite lessons
 */
@SuppressWarnings("unused")
@Repository
public interface UserFavoriteLessonRepository extends JpaRepository<UserFavoriteLesson, Long> {
    List<UserFavoriteLesson> findByAppUserId(Long appUserId);

    boolean existsByAppUserIdAndLessonId(Long appUserId, Long lessonId);

    void deleteByAppUserIdAndLessonId(Long appUserId, Long lessonId);
}
