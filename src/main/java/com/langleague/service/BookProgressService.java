package com.langleague.service;

import com.langleague.domain.BookProgress;
import com.langleague.repository.BookProgressRepository;
import com.langleague.security.SecurityUtils;
import com.langleague.service.dto.BookProgressDTO;
import com.langleague.service.mapper.BookProgressMapper;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing
 * {@link com.langleague.domain.BookProgress}.
 */
@Service
@Transactional
public class BookProgressService {

    private static final Logger LOG = LoggerFactory.getLogger(BookProgressService.class);

    private final BookProgressRepository bookProgressRepository;
    private final BookProgressMapper bookProgressMapper;
    private final UserService userService;
    private final com.langleague.repository.AppUserRepository appUserRepository;

    public BookProgressService(
        BookProgressRepository bookProgressRepository,
        BookProgressMapper bookProgressMapper,
        UserService userService,
        com.langleague.repository.AppUserRepository appUserRepository
    ) {
        this.bookProgressRepository = bookProgressRepository;
        this.bookProgressMapper = bookProgressMapper;
        this.userService = userService;
        this.appUserRepository = appUserRepository;
    }

    /**
     * Save a bookProgress.
     *
     * @param bookProgressDTO the entity to save.
     * @return the persisted entity.
     */
    public BookProgressDTO save(BookProgressDTO bookProgressDTO) {
        LOG.debug("Request to save BookProgress : {}", bookProgressDTO);
        BookProgress bookProgress = bookProgressMapper.toEntity(bookProgressDTO);
        bookProgress = bookProgressRepository.save(bookProgress);
        return bookProgressMapper.toDto(bookProgress);
    }

    /**
     * Update a bookProgress.
     *
     * @param bookProgressDTO the entity to save.
     * @return the persisted entity.
     */
    public BookProgressDTO update(BookProgressDTO bookProgressDTO) {
        LOG.debug("Request to update BookProgress : {}", bookProgressDTO);
        BookProgress bookProgress = bookProgressMapper.toEntity(bookProgressDTO);
        bookProgress = bookProgressRepository.save(bookProgress);
        return bookProgressMapper.toDto(bookProgress);
    }

    /**
     * Partially update a bookProgress.
     *
     * @param bookProgressDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<BookProgressDTO> partialUpdate(BookProgressDTO bookProgressDTO) {
        LOG.debug("Request to partially update BookProgress : {}", bookProgressDTO);

        return bookProgressRepository
            .findById(bookProgressDTO.getId())
            .map(existingBookProgress -> {
                bookProgressMapper.partialUpdate(existingBookProgress, bookProgressDTO);

                return existingBookProgress;
            })
            .map(bookProgressRepository::save)
            .map(bookProgressMapper::toDto);
    }

    /**
     * Get all the bookProgresses.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<BookProgressDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all BookProgresses");
        return bookProgressRepository.findAll(pageable).map(bookProgressMapper::toDto);
    }

    /**
     * Get one bookProgress by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<BookProgressDTO> findOne(Long id) {
        LOG.debug("Request to get BookProgress : {}", id);
        return bookProgressRepository.findById(id).map(bookProgressMapper::toDto);
    }

    /**
     * Delete the bookProgress by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete BookProgress : {}", id);
        bookProgressRepository.deleteById(id);
    }

    /**
     * Get all book progresses for the current user.
     * Use case 25: Save progress, UC 26: View learning progress, UC 41: Learning
     * history view
     *
     * @return list of book progresses
     */
    @Transactional(readOnly = true)
    public List<BookProgressDTO> findByCurrentUser() {
        LOG.debug("Request to get all BookProgresses for current user");
        return SecurityUtils.getCurrentUserId()
            .map(userId -> bookProgressRepository.findByUserId(userId).stream().map(bookProgressMapper::toDto).toList())
            .orElse(List.of());
    }

    /**
     * Get book progress for the current user and specific book.
     * Use case 25: Save progress, UC 26: View learning progress
     *
     * @param bookId the book ID
     * @return the book progress if found
     */
    @Transactional(readOnly = true)
    public Optional<BookProgressDTO> findByCurrentUserAndBookId(Long bookId) {
        LOG.debug("Request to get BookProgress for current user and book : {}", bookId);
        return SecurityUtils.getCurrentUserId()
            .flatMap(userId -> bookProgressRepository.findByUserIdAndBookId(userId, bookId))
            .map(bookProgressMapper::toDto);
    }

    /**
     * Save or update book progress for the current user.
     * Use case 25: Save progress
     * FIXED: Added @Retryable to handle optimistic locking conflicts
     *
     * @param bookProgressDTO the progress data
     * @return the saved progress
     */
    @Retryable(retryFor = ObjectOptimisticLockingFailureException.class, maxAttempts = 3, backoff = @Backoff(delay = 100))
    public BookProgressDTO saveOrUpdateForCurrentUser(BookProgressDTO bookProgressDTO) {
        LOG.debug("Request to save or update BookProgress for current user : {}", bookProgressDTO);
        return SecurityUtils.getCurrentUserId()
            .map(userId -> {
                // Try to find existing progress
                Long bookId = bookProgressDTO.getBook() != null ? bookProgressDTO.getBook().getId() : null;
                if (bookId == null) {
                    throw new RuntimeException("Book ID is required");
                }
                Optional<com.langleague.domain.BookProgress> existing = bookProgressRepository.findByUserIdAndBookId(userId, bookId);

                com.langleague.domain.BookProgress bookProgress;
                if (existing.isPresent()) {
                    // Update existing
                    bookProgress = existing.orElseThrow();
                    if (bookProgressDTO.getPercent() != null) {
                        bookProgress.setPercent(bookProgressDTO.getPercent());
                    }
                    if (bookProgressDTO.getCompleted() != null) {
                        bookProgress.setCompleted(bookProgressDTO.getCompleted());
                    }
                } else {
                    // Create new
                    bookProgress = bookProgressMapper.toEntity(bookProgressDTO);
                    com.langleague.domain.AppUser appUser = appUserRepository
                        .findByInternalUserId(userId)
                        .orElseThrow(() -> new RuntimeException("AppUser not found for user: " + userId));
                    bookProgress.setAppUser(appUser);
                }

                bookProgress.setLastAccessed(Instant.now());
                bookProgress = bookProgressRepository.save(bookProgress);
                return bookProgressMapper.toDto(bookProgress);
            })
            .orElseThrow(() -> new RuntimeException("User not authenticated"));
    }
}
