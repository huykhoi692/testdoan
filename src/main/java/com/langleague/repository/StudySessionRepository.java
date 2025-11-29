package com.langleague.repository;

import com.langleague.domain.StudySession;
import java.time.Instant;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the StudySession entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudySessionRepository extends JpaRepository<StudySession, Long> {
    @Query("select s from StudySession s where s.user.login = ?#{principal.username}")
    Page<StudySession> findByUserIsCurrentUser(Pageable pageable);

    Page<StudySession> findByUserId(Long userId, Pageable pageable);

    List<StudySession> findByStartTimeBetween(Instant startDate, Instant endDate);

    List<StudySession> findByUserIdAndStartTimeBetween(Long userId, Instant startDate, Instant endDate);

    @Query("SELECT COUNT(DISTINCT s.user.id) FROM StudySession s WHERE s.startTime BETWEEN ?1 AND ?2")
    Long countActiveUsersInPeriod(Instant startDate, Instant endDate);

    @Query("SELECT COUNT(DISTINCT s.lesson.id) FROM StudySession s WHERE s.startTime BETWEEN ?1 AND ?2")
    Long countActiveLessonsInPeriod(Instant startDate, Instant endDate);

    @Query("SELECT AVG(CASE WHEN s.status = 'COMPLETED' THEN 1.0 ELSE 0.0 END) FROM StudySession s WHERE s.startTime BETWEEN ?1 AND ?2")
    Double calculateCompletionRate(Instant startDate, Instant endDate);
}
