package com.langleague.repository;

import com.langleague.domain.MediaFile;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the MediaFile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MediaFileRepository extends JpaRepository<MediaFile, Long> {}
