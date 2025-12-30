package com.langleague.repository;

import com.langleague.domain.ReadingPassage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ReadingPassage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReadingPassageRepository extends JpaRepository<ReadingPassage, Long> {}
