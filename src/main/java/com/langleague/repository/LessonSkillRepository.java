package com.langleague.repository;

import com.langleague.domain.LessonSkill;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the LessonSkill entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LessonSkillRepository extends JpaRepository<LessonSkill, Long> {}
