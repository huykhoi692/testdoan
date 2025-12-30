package com.langleague.service;

import com.langleague.domain.AppUser;
import com.langleague.domain.Chapter;
import com.langleague.domain.ChapterProgress;
import com.langleague.repository.AppUserRepository;
import com.langleague.repository.ChapterProgressRepository;
import com.langleague.repository.ChapterRepository;
import com.langleague.security.SecurityUtils;
import com.langleague.service.dto.ChapterProgressDTO;
import com.langleague.service.dto.MyChapterDTO;
import com.langleague.service.mapper.ChapterProgressMapper;
import com.langleague.web.rest.errors.ResourceNotFoundException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.langleague.domain.ChapterProgress}.
 * REFACTORED: This service now focuses on high-level business use cases rather than generic CRUD.
 */
@Service
@Transactional
public class ChapterProgressService {

    private static final Logger LOG = LoggerFactory.getLogger(ChapterProgressService.class);

    private final ChapterProgressRepository chapterProgressRepository;
    private final AppUserRepository appUserRepository;
    private final ChapterRepository chapterRepository;
    private final ChapterProgressMapper chapterProgressMapper;

    public ChapterProgressService(
        ChapterProgressRepository chapterProgressRepository,
        AppUserRepository appUserRepository,
        ChapterRepository chapterRepository,
        ChapterProgressMapper chapterProgressMapper
    ) {
        this.chapterProgressRepository = chapterProgressRepository;
        this.appUserRepository = appUserRepository;
        this.chapterRepository = chapterRepository;
        this.chapterProgressMapper = chapterProgressMapper;
    }

    /**
     * Mark chapter as completed for a user.
     * Use case 24: Mark lesson as completed
     */
    public void markAsCompleted(Long chapterId, String userLogin) {
        LOG.debug("Request to mark chapter {} as completed for user {}", chapterId, userLogin);
        ChapterProgress progress = findOrCreateProgress(chapterId, userLogin);
        progress.setCompleted(true);
        progress.setPercent(100);
        progress.setLastAccessed(Instant.now());
        chapterProgressRepository.save(progress);
        LOG.info("Chapter {} marked as completed for user {}", chapterId, userLogin);
    }

    /**
     * Save a chapterProgress.
     *
     * @param chapterProgressDTO the entity to save.
     * @return the persisted entity.
     */
    public ChapterProgressDTO save(ChapterProgressDTO chapterProgressDTO) {
        LOG.debug("Request to save ChapterProgress : {}", chapterProgressDTO);
        ChapterProgress chapterProgress = chapterProgressMapper.toEntity(chapterProgressDTO);
        chapterProgress = chapterProgressRepository.save(chapterProgress);
        return chapterProgressMapper.toDto(chapterProgress);
    }

    /**
     * Update a chapterProgress.
     *
     * @param chapterProgressDTO the entity to update.
     * @return the persisted entity.
     */
    public ChapterProgressDTO update(ChapterProgressDTO chapterProgressDTO) {
        LOG.debug("Request to update ChapterProgress : {}", chapterProgressDTO);
        ChapterProgress chapterProgress = chapterProgressMapper.toEntity(chapterProgressDTO);
        chapterProgress = chapterProgressRepository.save(chapterProgress);
        return chapterProgressMapper.toDto(chapterProgress);
    }

    /**
     * Partially update a chapterProgress.
     *
     * @param chapterProgressDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ChapterProgressDTO> partialUpdate(ChapterProgressDTO chapterProgressDTO) {
        LOG.debug("Request to partially update ChapterProgress : {}", chapterProgressDTO);

        return chapterProgressRepository
            .findById(chapterProgressDTO.getId())
            .map(existingChapterProgress -> {
                chapterProgressMapper.partialUpdate(existingChapterProgress, chapterProgressDTO);
                return existingChapterProgress;
            })
            .map(chapterProgressRepository::save)
            .map(chapterProgressMapper::toDto);
    }

    /**
     * Get all the chapterProgresses.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ChapterProgressDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all ChapterProgresses");
        return chapterProgressRepository.findAll(pageable).map(chapterProgressMapper::toDto);
    }

    /**
     * Get one chapterProgress by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ChapterProgressDTO> findOne(Long id) {
        LOG.debug("Request to get ChapterProgress : {}", id);
        return chapterProgressRepository.findById(id).map(chapterProgressMapper::toDto);
    }

    /**
     * Delete the chapterProgress by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete ChapterProgress : {}", id);
        chapterProgressRepository.deleteById(id);
    }

    /**
     * Update progress percentage for a chapter.
     * Use case 25: Save progress
     */
    public void updateProgress(Long chapterId, String userLogin, Integer percent) {
        LOG.debug("Request to update progress for chapter {} to {}% for user {}", chapterId, percent, userLogin);
        ChapterProgress progress = findOrCreateProgress(chapterId, userLogin);
        progress.setPercent(percent);
        progress.setLastAccessed(Instant.now());
        if (percent >= 100) {
            progress.setCompleted(true);
        }
        chapterProgressRepository.save(progress);
        LOG.info("Progress updated for chapter {} to {}% for user {}", chapterId, percent, userLogin);
    }

    /**
     * Calculate overall completion percentage for a book.
     * Use case 26: View learning progress
     */
    @Transactional(readOnly = true)
    public Double getBookCompletionPercentage(Long bookId, String userLogin) {
        LOG.debug("Request to calculate completion for book {} and user {}", bookId, userLogin);
        Double percentage = chapterProgressRepository.getAverageCompletionPercentageForBook(bookId, userLogin);
        return percentage != null ? percentage : 0.0;
    }

    /**
     * Get all progress for chapters in a book.
     * Use case 26: View learning progress
     *
     * @param bookId the id of the book.
     * @param userLogin the login of the user.
     * @return the list of progress DTOs.
     */
    @Transactional(readOnly = true)
    public List<ChapterProgressDTO> getProgressByBook(Long bookId, String userLogin) {
        LOG.debug("Request to get progress for book {} and user {}", bookId, userLogin);
        return chapterProgressRepository
            .findByChapter_BookIdAndAppUser_InternalUser_Login(bookId, userLogin)
            .stream()
            .map(chapterProgressMapper::toDto)
            .collect(Collectors.toList());
    }

    /**
     * Get all chapters that the user has saved and is learning.
     */
    @Transactional(readOnly = true)
    public List<MyChapterDTO> getMyChapters(String userLogin) {
        LOG.debug("Request to get my chapters for user {}", userLogin);
        return chapterProgressRepository
            .findByAppUser_InternalUser_LoginOrderByLastAccessedDesc(userLogin)
            .stream()
            .map(this::toMyChapterDTO)
            .collect(Collectors.toList());
    }

    /**
     * Get chapters that the user is currently learning (not completed).
     */
    @Transactional(readOnly = true)
    public List<MyChapterDTO> getMyInProgressChapters(String userLogin) {
        LOG.debug("Request to get in-progress chapters for user {}", userLogin);
        return chapterProgressRepository
            .findByAppUser_InternalUser_LoginAndCompletedOrderByLastAccessedDesc(userLogin, false)
            .stream()
            .map(this::toMyChapterDTO)
            .collect(Collectors.toList());
    }

    /**
     * Get chapters that the user has completed.
     */
    @Transactional(readOnly = true)
    public List<MyChapterDTO> getMyCompletedChapters(String userLogin) {
        LOG.debug("Request to get completed chapters for user {}", userLogin);
        return chapterProgressRepository
            .findByAppUser_InternalUser_LoginAndCompletedOrderByLastAccessedDesc(userLogin, true)
            .stream()
            .map(this::toMyChapterDTO)
            .collect(Collectors.toList());
    }

    // --- Helper and Private Methods ---

    /**
     * Finds an existing ChapterProgress or creates a new one if not found.
     * This is crucial to ensure progress is always recorded.
     */
    private ChapterProgress findOrCreateProgress(Long chapterId, String userLogin) {
        // Validate ownership and access
        String currentUserLogin = SecurityUtils.getCurrentUserLogin().orElseThrow(() ->
            new AccessDeniedException("User not authenticated")
        );
        if (!currentUserLogin.equals(userLogin)) {
            throw new AccessDeniedException("Users can only update their own progress.");
        }

        return chapterProgressRepository
            .findByChapterIdAndAppUser_InternalUser_Login(chapterId, userLogin)
            .orElseGet(() -> {
                LOG.info("No existing progress found for chapter {} and user {}. Creating a new one.", chapterId, userLogin);
                AppUser appUser = appUserRepository
                    .findByUser_Login(userLogin)
                    .orElseThrow(() -> new ResourceNotFoundException("AppUser not found with login: " + userLogin));
                Chapter chapter = chapterRepository
                    .findById(chapterId)
                    .orElseThrow(() -> new ResourceNotFoundException("Chapter not found with id: " + chapterId));

                ChapterProgress newProgress = new ChapterProgress();
                newProgress.setAppUser(appUser);
                newProgress.setChapter(chapter);
                newProgress.setCompleted(false);
                newProgress.setPercent(0);
                newProgress.setLastAccessed(Instant.now());
                return newProgress;
            });
    }

    /**
     * Helper to map ChapterProgress entity to MyChapterDTO.
     */
    private MyChapterDTO toMyChapterDTO(ChapterProgress progress) {
        return new MyChapterDTO(
            progress.getChapter().getId(),
            progress.getChapter().getTitle(),
            progress.getChapter().getOrderIndex(),
            progress.getChapter().getBook().getId(),
            progress.getChapter().getBook().getTitle(),
            progress.getChapter().getBook().getThumbnail(),
            progress.getChapter().getBook().getLevel() != null ? progress.getChapter().getBook().getLevel().name() : null,
            progress.getPercent() != null ? progress.getPercent() : 0,
            progress.getCompleted() != null ? progress.getCompleted() : false,
            progress.getLastAccessed()
        );
    }
}
