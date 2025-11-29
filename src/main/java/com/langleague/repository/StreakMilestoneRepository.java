package com.langleague.repository;

import com.langleague.domain.StreakMilestone;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the StreakMilestone entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StreakMilestoneRepository extends JpaRepository<StreakMilestone, Long> {}
