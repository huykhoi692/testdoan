package com.langleague.repository;

import com.langleague.domain.UserVocabulary;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the UserVocabulary entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserVocabularyRepository extends JpaRepository<UserVocabulary, Long> {}
