package com.langleague.service;

import com.langleague.domain.LearningStreak;
import com.langleague.repository.LearningStreakRepository;
import com.langleague.service.dto.LearningStreakDTO;
import com.langleague.service.mapper.LearningStreakMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.langleague.domain.LearningStreak}.
 */
@Service
@Transactional
public class LearningStreakService {

    private static final Logger LOG = LoggerFactory.getLogger(LearningStreakService.class);

    private final LearningStreakRepository learningStreakRepository;

    private final LearningStreakMapper learningStreakMapper;

    public LearningStreakService(LearningStreakRepository learningStreakRepository, LearningStreakMapper learningStreakMapper) {
        this.learningStreakRepository = learningStreakRepository;
        this.learningStreakMapper = learningStreakMapper;
    }

    /**
     * Save a learningStreak.
     *
     * @param learningStreakDTO the entity to save.
     * @return the persisted entity.
     */
    public LearningStreakDTO save(LearningStreakDTO learningStreakDTO) {
        LOG.debug("Request to save LearningStreak : {}", learningStreakDTO);
        LearningStreak learningStreak = learningStreakMapper.toEntity(learningStreakDTO);
        learningStreak = learningStreakRepository.save(learningStreak);
        return learningStreakMapper.toDto(learningStreak);
    }

    /**
     * Update a learningStreak.
     *
     * @param learningStreakDTO the entity to save.
     * @return the persisted entity.
     */
    public LearningStreakDTO update(LearningStreakDTO learningStreakDTO) {
        LOG.debug("Request to update LearningStreak : {}", learningStreakDTO);
        LearningStreak learningStreak = learningStreakMapper.toEntity(learningStreakDTO);
        learningStreak = learningStreakRepository.save(learningStreak);
        return learningStreakMapper.toDto(learningStreak);
    }

    /**
     * Partially update a learningStreak.
     *
     * @param learningStreakDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<LearningStreakDTO> partialUpdate(LearningStreakDTO learningStreakDTO) {
        LOG.debug("Request to partially update LearningStreak : {}", learningStreakDTO);

        return learningStreakRepository
            .findById(learningStreakDTO.getId())
            .map(existingLearningStreak -> {
                learningStreakMapper.partialUpdate(existingLearningStreak, learningStreakDTO);

                return existingLearningStreak;
            })
            .map(learningStreakRepository::save)
            .map(learningStreakMapper::toDto);
    }

    /**
     * Get all the learningStreaks.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<LearningStreakDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all LearningStreaks");
        return learningStreakRepository.findAll(pageable).map(learningStreakMapper::toDto);
    }

    /**
     * Get one learningStreak by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LearningStreakDTO> findOne(Long id) {
        LOG.debug("Request to get LearningStreak : {}", id);
        return learningStreakRepository.findById(id).map(learningStreakMapper::toDto);
    }

    /**
     * Delete the learningStreak by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete LearningStreak : {}", id);
        learningStreakRepository.deleteById(id);
    }
}
