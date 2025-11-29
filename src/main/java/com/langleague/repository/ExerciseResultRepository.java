package com.langleague.repository;

import com.langleague.domain.ExerciseResult;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ExerciseResult entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExerciseResultRepository extends JpaRepository<ExerciseResult, Long> {}
