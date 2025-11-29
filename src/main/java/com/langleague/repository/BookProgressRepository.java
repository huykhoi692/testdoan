package com.langleague.repository;

import com.langleague.domain.BookProgress;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the BookProgress entity.
 */
@Repository
public interface BookProgressRepository extends JpaRepository<BookProgress, Long> {
    /**
     * Find all book progresses for a specific user.
     * Use case 25: Save progress, UC 26: View learning progress, UC 41: Learning history view
     */
    @Query("select bp from BookProgress bp where bp.appUser.internalUser.id = ?1")
    List<BookProgress> findByUserId(Long userId);

    /**
     * Find book progress for a specific user and book.
     * Use case 25: Save progress, UC 26: View learning progress
     */
    @org.springframework.data.jpa.repository.Query(
        "select bp from BookProgress bp where bp.appUser.internalUser.id = ?1 and bp.book.id = ?2"
    )
    Optional<BookProgress> findByUserIdAndBookId(Long userId, Long bookId);

    /**
     * Count total books started by user - optimized single query
     */
    @Query("SELECT COUNT(bp) FROM BookProgress bp WHERE bp.appUser.internalUser.id = :userId")
    long countByUserId(@Param("userId") Long userId);

    /**
     * Count completed books by user - optimized single query
     */
    @Query("SELECT COUNT(bp) FROM BookProgress bp WHERE bp.appUser.internalUser.id = :userId AND bp.completed = true")
    long countCompletedByUserId(@Param("userId") Long userId);
}
