package com.langleague.service;

import com.langleague.domain.UserVocabulary;
import com.langleague.repository.UserVocabularyRepository;
import com.langleague.service.dto.UserVocabularyDTO;
import com.langleague.service.mapper.UserVocabularyMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.langleague.domain.UserVocabulary}.
 */
@Service
@Transactional
public class UserVocabularyService {

    private static final Logger LOG = LoggerFactory.getLogger(UserVocabularyService.class);

    private final UserVocabularyRepository userVocabularyRepository;

    private final UserVocabularyMapper userVocabularyMapper;

    public UserVocabularyService(UserVocabularyRepository userVocabularyRepository, UserVocabularyMapper userVocabularyMapper) {
        this.userVocabularyRepository = userVocabularyRepository;
        this.userVocabularyMapper = userVocabularyMapper;
    }

    /**
     * Save a userVocabulary.
     *
     * @param userVocabularyDTO the entity to save.
     * @return the persisted entity.
     */
    public UserVocabularyDTO save(UserVocabularyDTO userVocabularyDTO) {
        LOG.debug("Request to save UserVocabulary : {}", userVocabularyDTO);
        UserVocabulary userVocabulary = userVocabularyMapper.toEntity(userVocabularyDTO);
        userVocabulary = userVocabularyRepository.save(userVocabulary);
        return userVocabularyMapper.toDto(userVocabulary);
    }

    /**
     * Update a userVocabulary.
     *
     * @param userVocabularyDTO the entity to save.
     * @return the persisted entity.
     */
    public UserVocabularyDTO update(UserVocabularyDTO userVocabularyDTO) {
        LOG.debug("Request to update UserVocabulary : {}", userVocabularyDTO);
        UserVocabulary userVocabulary = userVocabularyMapper.toEntity(userVocabularyDTO);
        userVocabulary = userVocabularyRepository.save(userVocabulary);
        return userVocabularyMapper.toDto(userVocabulary);
    }

    /**
     * Partially update a userVocabulary.
     *
     * @param userVocabularyDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<UserVocabularyDTO> partialUpdate(UserVocabularyDTO userVocabularyDTO) {
        LOG.debug("Request to partially update UserVocabulary : {}", userVocabularyDTO);

        return userVocabularyRepository
            .findById(userVocabularyDTO.getId())
            .map(existingUserVocabulary -> {
                userVocabularyMapper.partialUpdate(existingUserVocabulary, userVocabularyDTO);

                return existingUserVocabulary;
            })
            .map(userVocabularyRepository::save)
            .map(userVocabularyMapper::toDto);
    }

    /**
     * Get all the userVocabularies.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<UserVocabularyDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all UserVocabularies");
        return userVocabularyRepository.findAll(pageable).map(userVocabularyMapper::toDto);
    }

    /**
     * Get one userVocabulary by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<UserVocabularyDTO> findOne(Long id) {
        LOG.debug("Request to get UserVocabulary : {}", id);
        return userVocabularyRepository.findById(id).map(userVocabularyMapper::toDto);
    }

    /**
     * Delete the userVocabulary by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete UserVocabulary : {}", id);
        userVocabularyRepository.deleteById(id);
    }
}
