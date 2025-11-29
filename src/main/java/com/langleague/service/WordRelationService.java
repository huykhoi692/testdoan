package com.langleague.service;

import com.langleague.domain.WordRelation;
import com.langleague.repository.WordRelationRepository;
import com.langleague.service.dto.WordRelationDTO;
import com.langleague.service.mapper.WordRelationMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.langleague.domain.WordRelation}.
 */
@Service
@Transactional
public class WordRelationService {

    private static final Logger LOG = LoggerFactory.getLogger(WordRelationService.class);

    private final WordRelationRepository wordRelationRepository;

    private final WordRelationMapper wordRelationMapper;

    public WordRelationService(WordRelationRepository wordRelationRepository, WordRelationMapper wordRelationMapper) {
        this.wordRelationRepository = wordRelationRepository;
        this.wordRelationMapper = wordRelationMapper;
    }

    /**
     * Save a wordRelation.
     *
     * @param wordRelationDTO the entity to save.
     * @return the persisted entity.
     */
    public WordRelationDTO save(WordRelationDTO wordRelationDTO) {
        LOG.debug("Request to save WordRelation : {}", wordRelationDTO);
        WordRelation wordRelation = wordRelationMapper.toEntity(wordRelationDTO);
        wordRelation = wordRelationRepository.save(wordRelation);
        return wordRelationMapper.toDto(wordRelation);
    }

    /**
     * Update a wordRelation.
     *
     * @param wordRelationDTO the entity to save.
     * @return the persisted entity.
     */
    public WordRelationDTO update(WordRelationDTO wordRelationDTO) {
        LOG.debug("Request to update WordRelation : {}", wordRelationDTO);
        WordRelation wordRelation = wordRelationMapper.toEntity(wordRelationDTO);
        wordRelation = wordRelationRepository.save(wordRelation);
        return wordRelationMapper.toDto(wordRelation);
    }

    /**
     * Partially update a wordRelation.
     *
     * @param wordRelationDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<WordRelationDTO> partialUpdate(WordRelationDTO wordRelationDTO) {
        LOG.debug("Request to partially update WordRelation : {}", wordRelationDTO);

        return wordRelationRepository
            .findById(wordRelationDTO.getId())
            .map(existingWordRelation -> {
                wordRelationMapper.partialUpdate(existingWordRelation, wordRelationDTO);

                return existingWordRelation;
            })
            .map(wordRelationRepository::save)
            .map(wordRelationMapper::toDto);
    }

    /**
     * Get all the wordRelations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<WordRelationDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all WordRelations");
        return wordRelationRepository.findAll(pageable).map(wordRelationMapper::toDto);
    }

    /**
     * Get one wordRelation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<WordRelationDTO> findOne(Long id) {
        LOG.debug("Request to get WordRelation : {}", id);
        return wordRelationRepository.findById(id).map(wordRelationMapper::toDto);
    }

    /**
     * Delete the wordRelation by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete WordRelation : {}", id);
        wordRelationRepository.deleteById(id);
    }
}
