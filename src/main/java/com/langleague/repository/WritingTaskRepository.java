package com.langleague.repository;

import com.langleague.domain.WritingTask;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the WritingTask entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WritingTaskRepository extends JpaRepository<WritingTask, Long> {}
