package com.langleague.repository;

import com.langleague.domain.WordRelation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the WordRelation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WordRelationRepository extends JpaRepository<WordRelation, Long> {}
