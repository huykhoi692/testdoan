package com.langleague.service;

import com.langleague.domain.LessonWord;
import com.langleague.repository.LessonWordRepository;
import com.langleague.service.dto.LessonWordDTO;
import com.langleague.service.mapper.LessonWordMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.langleague.domain.LessonWord}.
 */
@Service
@Transactional
public class LessonWordService {

    private static final Logger LOG = LoggerFactory.getLogger(LessonWordService.class);

    private final LessonWordRepository lessonWordRepository;

    private final LessonWordMapper lessonWordMapper;

    public LessonWordService(LessonWordRepository lessonWordRepository, LessonWordMapper lessonWordMapper) {
        this.lessonWordRepository = lessonWordRepository;
        this.lessonWordMapper = lessonWordMapper;
    }

    /**
     * Save a lessonWord.
     *
     * @param lessonWordDTO the entity to save.
     * @return the persisted entity.
     */
    public LessonWordDTO save(LessonWordDTO lessonWordDTO) {
        LOG.debug("Request to save LessonWord : {}", lessonWordDTO);
        LessonWord lessonWord = lessonWordMapper.toEntity(lessonWordDTO);
        lessonWord = lessonWordRepository.save(lessonWord);
        return lessonWordMapper.toDto(lessonWord);
    }

    /**
     * Update a lessonWord.
     *
     * @param lessonWordDTO the entity to save.
     * @return the persisted entity.
     */
    public LessonWordDTO update(LessonWordDTO lessonWordDTO) {
        LOG.debug("Request to update LessonWord : {}", lessonWordDTO);
        LessonWord lessonWord = lessonWordMapper.toEntity(lessonWordDTO);
        lessonWord = lessonWordRepository.save(lessonWord);
        return lessonWordMapper.toDto(lessonWord);
    }

    /**
     * Partially update a lessonWord.
     *
     * @param lessonWordDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<LessonWordDTO> partialUpdate(LessonWordDTO lessonWordDTO) {
        LOG.debug("Request to partially update LessonWord : {}", lessonWordDTO);

        return lessonWordRepository
            .findById(lessonWordDTO.getId())
            .map(existingLessonWord -> {
                lessonWordMapper.partialUpdate(existingLessonWord, lessonWordDTO);

                return existingLessonWord;
            })
            .map(lessonWordRepository::save)
            .map(lessonWordMapper::toDto);
    }

    /**
     * Get all the lessonWords.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<LessonWordDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all LessonWords");
        return lessonWordRepository.findAll(pageable).map(lessonWordMapper::toDto);
    }

    /**
     * Get one lessonWord by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LessonWordDTO> findOne(Long id) {
        LOG.debug("Request to get LessonWord : {}", id);
        return lessonWordRepository.findById(id).map(lessonWordMapper::toDto);
    }

    /**
     * Delete the lessonWord by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete LessonWord : {}", id);
        lessonWordRepository.deleteById(id);
    }
}
