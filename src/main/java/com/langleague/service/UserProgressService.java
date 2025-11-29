package com.langleague.service;

import com.langleague.domain.UserProgress;
import com.langleague.repository.UserProgressRepository;
import com.langleague.service.dto.UserProgressDTO;
import com.langleague.service.mapper.UserProgressMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.langleague.domain.UserProgress}.
 */
@Service
@Transactional
public class UserProgressService {

    private static final Logger LOG = LoggerFactory.getLogger(UserProgressService.class);

    private final UserProgressRepository userProgressRepository;

    private final UserProgressMapper userProgressMapper;

    public UserProgressService(UserProgressRepository userProgressRepository, UserProgressMapper userProgressMapper) {
        this.userProgressRepository = userProgressRepository;
        this.userProgressMapper = userProgressMapper;
    }

    /**
     * Save a userProgress.
     *
     * @param userProgressDTO the entity to save.
     * @return the persisted entity.
     */
    public UserProgressDTO save(UserProgressDTO userProgressDTO) {
        LOG.debug("Request to save UserProgress : {}", userProgressDTO);
        UserProgress userProgress = userProgressMapper.toEntity(userProgressDTO);
        userProgress = userProgressRepository.save(userProgress);
        return userProgressMapper.toDto(userProgress);
    }

    /**
     * Update a userProgress.
     *
     * @param userProgressDTO the entity to save.
     * @return the persisted entity.
     */
    public UserProgressDTO update(UserProgressDTO userProgressDTO) {
        LOG.debug("Request to update UserProgress : {}", userProgressDTO);
        UserProgress userProgress = userProgressMapper.toEntity(userProgressDTO);
        userProgress = userProgressRepository.save(userProgress);
        return userProgressMapper.toDto(userProgress);
    }

    /**
     * Partially update a userProgress.
     *
     * @param userProgressDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<UserProgressDTO> partialUpdate(UserProgressDTO userProgressDTO) {
        LOG.debug("Request to partially update UserProgress : {}", userProgressDTO);

        return userProgressRepository
            .findById(userProgressDTO.getId())
            .map(existingUserProgress -> {
                if (userProgressDTO.getPercent() != null) {
                    existingUserProgress.setPercent(userProgressDTO.getPercent());
                }
                if (userProgressDTO.getLastAccessed() != null) {
                    existingUserProgress.setLastAccessed(userProgressDTO.getLastAccessed());
                }
                return existingUserProgress;
            })
            .map(userProgressRepository::save)
            .map(userProgressMapper::toDto);
    }

    /**
     * Get all the userProgresses.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<UserProgressDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all UserProgresses");
        return userProgressRepository.findAll(pageable).map(userProgressMapper::toDto);
    }

    /**
     * Get one userProgress by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<UserProgressDTO> findOne(Long id) {
        LOG.debug("Request to get UserProgress : {}", id);
        return userProgressRepository.findById(id).map(userProgressMapper::toDto);
    }

    /**
     * Delete the userProgress by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete UserProgress : {}", id);
        userProgressRepository.deleteById(id);
    }

    /**
     * Use case 24: Mark lesson as completed
     * Mark a lesson as learned or to review
     *
     * @param appUserId user ID
     * @param lessonId lesson ID
     * @param percent completion percentage (0-100)
     * @return the saved user progress
     */
    public UserProgressDTO markLessonProgress(Long appUserId, Long lessonId, Integer percent) {
        LOG.debug("Request to mark lesson {} progress for user {} at {}%", lessonId, appUserId, percent);

        Optional<UserProgress> existing = userProgressRepository.findByAppUserIdAndLessonId(appUserId, lessonId);

        UserProgress userProgress;
        if (existing.isPresent()) {
            userProgress = existing.orElseThrow();
            userProgress.setPercent(percent);
        } else {
            userProgress = new UserProgress();
            // Set appUser and lesson references here
            userProgress.setPercent(percent);
        }

        userProgress.setLastAccessed(java.time.Instant.now());
        userProgress = userProgressRepository.save(userProgress);
        return userProgressMapper.toDto(userProgress);
    }

    /**
     * Use case 25: Save progress
     * Continue learning from where you left off
     *
     * @param appUserId user ID
     * @param lessonId lesson ID
     * @param percent current progress percentage
     * @return the saved user progress
     */
    public UserProgressDTO saveProgress(Long appUserId, Long lessonId, Integer percent) {
        LOG.debug("Request to save progress for lesson {} and user {}", lessonId, appUserId);
        return markLessonProgress(appUserId, lessonId, percent);
    }

    /**
     * Use case 26: View learning progress
     * Track completion by percentage
     *
     * @param appUserId user ID
     * @return list of user progress
     */
    @Transactional(readOnly = true)
    public Page<UserProgressDTO> getUserProgress(Long appUserId, Pageable pageable) {
        LOG.debug("Request to get progress for user {}", appUserId);
        return userProgressRepository.findByAppUserId(appUserId, pageable).map(userProgressMapper::toDto);
    }

    /**
     * Use case 26: View learning progress for a specific lesson
     *
     * @param appUserId user ID
     * @param lessonId lesson ID
     * @return user progress for the lesson
     */
    @Transactional(readOnly = true)
    public Optional<UserProgressDTO> getLessonProgress(Long appUserId, Long lessonId) {
        LOG.debug("Request to get progress for lesson {} and user {}", lessonId, appUserId);
        return userProgressRepository.findByAppUserIdAndLessonId(appUserId, lessonId).map(userProgressMapper::toDto);
    }

    /**
     * Use case 41: Learning history view
     * Review all study activities in a timeline
     *
     * @param appUserId user ID
     * @param pageable pagination
     * @return paginated learning history
     */
    @Transactional(readOnly = true)
    public Page<UserProgressDTO> getLearningHistory(Long appUserId, Pageable pageable) {
        LOG.debug("Request to get learning history for user {}", appUserId);
        return userProgressRepository.findByAppUserIdOrderByLastAccessedDesc(appUserId, pageable).map(userProgressMapper::toDto);
    }

    /**
     * Get current authenticated user's progress
     *
     * @return list of user progress
     */
    @Transactional(readOnly = true)
    public java.util.List<UserProgressDTO> getCurrentUserProgress() {
        LOG.debug("Request to get current user's progress");
        // TODO: Get current user from SecurityContext
        // For now, return empty list or mock data
        return userProgressRepository.findAll().stream().map(userProgressMapper::toDto).collect(java.util.stream.Collectors.toList());
    }
}
