package com.langleague.repository;

import com.langleague.domain.LearningStreak;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the LearningStreak entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LearningStreakRepository extends JpaRepository<LearningStreak, Long> {}
