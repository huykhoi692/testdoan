package com.langleague.repository;

import com.langleague.domain.ListeningExercise;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ListeningExercise entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListeningExerciseRepository extends JpaRepository<ListeningExercise, Long> {}
