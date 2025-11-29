package com.langleague.repository;

import com.langleague.domain.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Comment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    // Use case 35: Join discussion - get comments by lesson
    Page<Comment> findByLessonId(Long lessonId, Pageable pageable);
}
