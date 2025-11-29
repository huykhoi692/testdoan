package com.langleague.service;

import com.langleague.domain.LessonSkill;
import com.langleague.repository.LessonSkillRepository;
import com.langleague.service.dto.LessonSkillDTO;
import com.langleague.service.mapper.LessonSkillMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.langleague.domain.LessonSkill}.
 */
@Service
@Transactional
public class LessonSkillService {

    private static final Logger LOG = LoggerFactory.getLogger(LessonSkillService.class);

    private final LessonSkillRepository lessonSkillRepository;

    private final LessonSkillMapper lessonSkillMapper;

    public LessonSkillService(LessonSkillRepository lessonSkillRepository, LessonSkillMapper lessonSkillMapper) {
        this.lessonSkillRepository = lessonSkillRepository;
        this.lessonSkillMapper = lessonSkillMapper;
    }

    /**
     * Save a lessonSkill.
     *
     * @param lessonSkillDTO the entity to save.
     * @return the persisted entity.
     */
    public LessonSkillDTO save(LessonSkillDTO lessonSkillDTO) {
        LOG.debug("Request to save LessonSkill : {}", lessonSkillDTO);
        LessonSkill lessonSkill = lessonSkillMapper.toEntity(lessonSkillDTO);
        lessonSkill = lessonSkillRepository.save(lessonSkill);
        return lessonSkillMapper.toDto(lessonSkill);
    }

    /**
     * Update a lessonSkill.
     *
     * @param lessonSkillDTO the entity to save.
     * @return the persisted entity.
     */
    public LessonSkillDTO update(LessonSkillDTO lessonSkillDTO) {
        LOG.debug("Request to update LessonSkill : {}", lessonSkillDTO);
        LessonSkill lessonSkill = lessonSkillMapper.toEntity(lessonSkillDTO);
        lessonSkill = lessonSkillRepository.save(lessonSkill);
        return lessonSkillMapper.toDto(lessonSkill);
    }

    /**
     * Partially update a lessonSkill.
     *
     * @param lessonSkillDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<LessonSkillDTO> partialUpdate(LessonSkillDTO lessonSkillDTO) {
        LOG.debug("Request to partially update LessonSkill : {}", lessonSkillDTO);

        return lessonSkillRepository
            .findById(lessonSkillDTO.getId())
            .map(existingLessonSkill -> {
                lessonSkillMapper.partialUpdate(existingLessonSkill, lessonSkillDTO);

                return existingLessonSkill;
            })
            .map(lessonSkillRepository::save)
            .map(lessonSkillMapper::toDto);
    }

    /**
     * Get all the lessonSkills.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<LessonSkillDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all LessonSkills");
        return lessonSkillRepository.findAll(pageable).map(lessonSkillMapper::toDto);
    }

    /**
     * Get one lessonSkill by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LessonSkillDTO> findOne(Long id) {
        LOG.debug("Request to get LessonSkill : {}", id);
        return lessonSkillRepository.findById(id).map(lessonSkillMapper::toDto);
    }

    /**
     * Delete the lessonSkill by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete LessonSkill : {}", id);
        lessonSkillRepository.deleteById(id);
    }
}
