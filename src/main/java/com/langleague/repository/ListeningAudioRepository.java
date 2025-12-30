package com.langleague.repository;

import com.langleague.domain.ListeningAudio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ListeningAudio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ListeningAudioRepository extends JpaRepository<ListeningAudio, Long> {}
