package com.langleague.repository;

import com.langleague.domain.WritingExercise;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the WritingExercise entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WritingExerciseRepository extends JpaRepository<WritingExercise, Long> {}
