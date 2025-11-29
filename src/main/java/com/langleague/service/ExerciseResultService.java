package com.langleague.service;

import com.langleague.domain.ExerciseResult;
import com.langleague.repository.ExerciseResultRepository;
import com.langleague.service.dto.ExerciseResultDTO;
import com.langleague.service.mapper.ExerciseResultMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.langleague.domain.ExerciseResult}.
 */
@Service
@Transactional
public class ExerciseResultService {

    private static final Logger LOG = LoggerFactory.getLogger(ExerciseResultService.class);

    private final ExerciseResultRepository exerciseResultRepository;

    private final ExerciseResultMapper exerciseResultMapper;

    public ExerciseResultService(ExerciseResultRepository exerciseResultRepository, ExerciseResultMapper exerciseResultMapper) {
        this.exerciseResultRepository = exerciseResultRepository;
        this.exerciseResultMapper = exerciseResultMapper;
    }

    /**
     * Save a exerciseResult.
     *
     * @param exerciseResultDTO the entity to save.
     * @return the persisted entity.
     */
    public ExerciseResultDTO save(ExerciseResultDTO exerciseResultDTO) {
        LOG.debug("Request to save ExerciseResult : {}", exerciseResultDTO);
        ExerciseResult exerciseResult = exerciseResultMapper.toEntity(exerciseResultDTO);
        exerciseResult = exerciseResultRepository.save(exerciseResult);
        return exerciseResultMapper.toDto(exerciseResult);
    }

    /**
     * Update a exerciseResult.
     *
     * @param exerciseResultDTO the entity to save.
     * @return the persisted entity.
     */
    public ExerciseResultDTO update(ExerciseResultDTO exerciseResultDTO) {
        LOG.debug("Request to update ExerciseResult : {}", exerciseResultDTO);
        ExerciseResult exerciseResult = exerciseResultMapper.toEntity(exerciseResultDTO);
        exerciseResult = exerciseResultRepository.save(exerciseResult);
        return exerciseResultMapper.toDto(exerciseResult);
    }

    /**
     * Partially update a exerciseResult.
     *
     * @param exerciseResultDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ExerciseResultDTO> partialUpdate(ExerciseResultDTO exerciseResultDTO) {
        LOG.debug("Request to partially update ExerciseResult : {}", exerciseResultDTO);

        return exerciseResultRepository
            .findById(exerciseResultDTO.getId())
            .map(existingExerciseResult -> {
                exerciseResultMapper.partialUpdate(existingExerciseResult, exerciseResultDTO);

                return existingExerciseResult;
            })
            .map(exerciseResultRepository::save)
            .map(exerciseResultMapper::toDto);
    }

    /**
     * Get all the exerciseResults.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ExerciseResultDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all ExerciseResults");
        return exerciseResultRepository.findAll(pageable).map(exerciseResultMapper::toDto);
    }

    /**
     * Get one exerciseResult by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ExerciseResultDTO> findOne(Long id) {
        LOG.debug("Request to get ExerciseResult : {}", id);
        return exerciseResultRepository.findById(id).map(exerciseResultMapper::toDto);
    }

    /**
     * Delete the exerciseResult by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete ExerciseResult : {}", id);
        exerciseResultRepository.deleteById(id);
    }
}
