package com.langleague.service;

import com.langleague.domain.Comment;
import com.langleague.repository.CommentRepository;
import com.langleague.service.dto.CommentDTO;
import com.langleague.service.mapper.CommentMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.langleague.domain.Comment}.
 */
@Service
@Transactional
public class CommentService {

    private static final Logger LOG = LoggerFactory.getLogger(CommentService.class);

    private final CommentRepository commentRepository;

    private final CommentMapper commentMapper;

    public CommentService(CommentRepository commentRepository, CommentMapper commentMapper) {
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
    }

    /**
     * Save a comment.
     *
     * @param commentDTO the entity to save.
     * @return the persisted entity.
     */
    public CommentDTO save(CommentDTO commentDTO) {
        LOG.debug("Request to save Comment : {}", commentDTO);
        Comment comment = commentMapper.toEntity(commentDTO);
        comment = commentRepository.save(comment);
        return commentMapper.toDto(comment);
    }

    /**
     * Update a comment.
     *
     * @param commentDTO the entity to save.
     * @return the persisted entity.
     */
    public CommentDTO update(CommentDTO commentDTO) {
        LOG.debug("Request to update Comment : {}", commentDTO);
        Comment comment = commentMapper.toEntity(commentDTO);
        comment = commentRepository.save(comment);
        return commentMapper.toDto(comment);
    }

    /**
     * Partially update a comment.
     *
     * @param commentDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<CommentDTO> partialUpdate(CommentDTO commentDTO) {
        LOG.debug("Request to partially update Comment : {}", commentDTO);

        return commentRepository
            .findById(commentDTO.getId())
            .map(existingComment -> {
                commentMapper.partialUpdate(existingComment, commentDTO);

                return existingComment;
            })
            .map(commentRepository::save)
            .map(commentMapper::toDto);
    }

    /**
     * Get all the comments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<CommentDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Comments");
        return commentRepository.findAll(pageable).map(commentMapper::toDto);
    }

    /**
     * Get one comment by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CommentDTO> findOne(Long id) {
        LOG.debug("Request to get Comment : {}", id);
        return commentRepository.findById(id).map(commentMapper::toDto);
    }

    /**
     * Delete the comment by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete Comment : {}", id);
        commentRepository.deleteById(id);
    }

    /**
     * Use case 34: Post question/comment
     * Ask questions or leave comments in a lesson
     *
     * @param lessonId lesson ID
     * @param appUserId user ID
     * @param content comment content
     * @return the saved comment
     */
    public CommentDTO postComment(Long lessonId, Long appUserId, String content) {
        LOG.debug("Request to post comment on lesson {} by user {}", lessonId, appUserId);

        CommentDTO commentDTO = new CommentDTO();
        commentDTO.setContent(content);
        commentDTO.setCreatedAt(java.time.Instant.now());
        // Set lesson and appUser references

        Comment comment = commentMapper.toEntity(commentDTO);
        comment = commentRepository.save(comment);
        return commentMapper.toDto(comment);
    }

    /**
     * Use case 35, 36: Join discussion / Reply to comments
     * Get all comments for a lesson
     *
     * @param lessonId lesson ID
     * @param pageable pagination info
     * @return page of comments
     */
    @Transactional(readOnly = true)
    public Page<CommentDTO> findByLessonId(Long lessonId, Pageable pageable) {
        LOG.debug("Request to get comments for lesson {}", lessonId);
        return commentRepository.findByLessonId(lessonId, pageable).map(commentMapper::toDto);
    }

    /**
     * Use case 61: Moderate comments/discussions (Admin)
     * Delete comment by admin
     *
     * @param id comment ID
     */
    public void moderateDelete(Long id) {
        LOG.debug("Request to moderate delete comment {}", id);
        commentRepository.deleteById(id);
    }

    /**
     * Use case 61: Moderate comments/discussions (Admin)
     * Edit comment content by admin
     *
     * @param id comment ID
     * @param newContent new content
     * @return updated comment
     */
    public Optional<CommentDTO> moderateEdit(Long id, String newContent) {
        LOG.debug("Request to moderate edit comment {}", id);
        return commentRepository
            .findById(id)
            .map(comment -> {
                comment.setContent(newContent);
                commentRepository.save(comment);
                return commentMapper.toDto(comment);
            });
    }
}
