package com.langleague.repository;

import com.langleague.domain.SpeakingTopic;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SpeakingTopic entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpeakingTopicRepository extends JpaRepository<SpeakingTopic, Long> {}
