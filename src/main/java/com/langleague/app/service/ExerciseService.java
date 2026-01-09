package com.langleague.app.service;

import com.langleague.app.domain.Exercise;
import com.langleague.app.repository.ExerciseRepository;
import com.langleague.app.service.dto.ExerciseDTO;
import com.langleague.app.service.mapper.ExerciseMapper;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.langleague.app.domain.Exercise}.
 */
@Service
@Transactional
public class ExerciseService {

    private static final Logger LOG = LoggerFactory.getLogger(ExerciseService.class);

    private final ExerciseRepository exerciseRepository;

    private final ExerciseMapper exerciseMapper;

    public ExerciseService(ExerciseRepository exerciseRepository, ExerciseMapper exerciseMapper) {
        this.exerciseRepository = exerciseRepository;
        this.exerciseMapper = exerciseMapper;
    }

    /**
     * Save a exercise.
     *
     * @param exerciseDTO the entity to save.
     * @return the persisted entity.
     */
    public ExerciseDTO save(ExerciseDTO exerciseDTO) {
        LOG.debug("Request to save Exercise : {}", exerciseDTO);
        Exercise exercise = exerciseMapper.toEntity(exerciseDTO);
        exercise = exerciseRepository.save(exercise);
        return exerciseMapper.toDto(exercise);
    }

    /**
     * Update a exercise.
     *
     * @param exerciseDTO the entity to save.
     * @return the persisted entity.
     */
    public ExerciseDTO update(ExerciseDTO exerciseDTO) {
        LOG.debug("Request to update Exercise : {}", exerciseDTO);
        Exercise exercise = exerciseMapper.toEntity(exerciseDTO);
        exercise = exerciseRepository.save(exercise);
        return exerciseMapper.toDto(exercise);
    }

    /**
     * Partially update a exercise.
     *
     * @param exerciseDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ExerciseDTO> partialUpdate(ExerciseDTO exerciseDTO) {
        LOG.debug("Request to partially update Exercise : {}", exerciseDTO);

        return exerciseRepository
            .findById(exerciseDTO.getId())
            .map(existingExercise -> {
                exerciseMapper.partialUpdate(existingExercise, exerciseDTO);

                return existingExercise;
            })
            .map(exerciseRepository::save)
            .map(exerciseMapper::toDto);
    }

    /**
     * Get all the exercises.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ExerciseDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Exercises");
        return exerciseRepository.findAll(pageable).map(exerciseMapper::toDto);
    }

    /**
     * Get one exercise by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ExerciseDTO> findOne(Long id) {
        LOG.debug("Request to get Exercise : {}", id);
        return exerciseRepository.findById(id).map(exerciseMapper::toDto);
    }

    /**
     * Get all the exercises by unit id.
     *
     * @param unitId the id of the unit.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ExerciseDTO> findAllByUnitId(Long unitId) {
        LOG.debug("Request to get all Exercises by unitId : {}", unitId);
        return exerciseRepository
            .findAllByUnitIdOrderByOrderIndexAsc(unitId)
            .stream()
            .map(exerciseMapper::toDto)
            .collect(Collectors.toList());
    }

    /**
     * Check the answer for an exercise.
     *
     * @param exerciseId the id of the exercise.
     * @param studentAnswer the student's answer.
     * @return 'CORRECT' or 'WRONG'.
     */
    @Transactional(readOnly = true)
    public String checkAnswer(Long exerciseId, String studentAnswer) {
        LOG.debug("Request to check answer for Exercise : {}", exerciseId);
        Optional<Exercise> exerciseOptional = exerciseRepository.findById(exerciseId);
        if (exerciseOptional.isPresent()) {
            String correctAnswer = exerciseOptional.get().getCorrectAnswerRaw();
            if (correctAnswer != null && correctAnswer.trim().equalsIgnoreCase(studentAnswer != null ? studentAnswer.trim() : "")) {
                return "CORRECT";
            }
        }
        return "WRONG";
    }

    /**
     * Delete the exercise by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete Exercise : {}", id);
        exerciseRepository.deleteById(id);
    }
}
