package com.langleague.app.repository;

import com.langleague.app.domain.ExerciseOption;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ExerciseOption entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExerciseOptionRepository extends JpaRepository<ExerciseOption, Long> {}
