package com.langleague.repository;

import com.langleague.domain.Chapter;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Chapter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {
    /**
     * Find all chapters by book ID, ordered by order index
     */
    List<Chapter> findByBookIdOrderByOrderIndex(Long bookId);
}
