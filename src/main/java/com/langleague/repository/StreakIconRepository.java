package com.langleague.repository;

import com.langleague.domain.StreakIcon;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the StreakIcon entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StreakIconRepository extends JpaRepository<StreakIcon, Long> {}
