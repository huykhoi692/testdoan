package com.langleague.repository;

import com.langleague.domain.SpeakingExercise;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SpeakingExercise entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpeakingExerciseRepository extends JpaRepository<SpeakingExercise, Long> {}
