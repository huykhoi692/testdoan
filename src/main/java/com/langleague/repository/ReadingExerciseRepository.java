package com.langleague.repository;

import com.langleague.domain.ReadingExercise;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ReadingExercise entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReadingExerciseRepository extends JpaRepository<ReadingExercise, Long> {}
