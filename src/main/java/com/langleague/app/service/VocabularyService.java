package com.langleague.app.service;

import com.langleague.app.domain.Vocabulary;
import com.langleague.app.repository.VocabularyRepository;
import com.langleague.app.service.dto.VocabularyDTO;
import com.langleague.app.service.mapper.VocabularyMapper;
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
 * Service Implementation for managing {@link com.langleague.app.domain.Vocabulary}.
 */
@Service
@Transactional
public class VocabularyService {

    private static final Logger LOG = LoggerFactory.getLogger(VocabularyService.class);

    private final VocabularyRepository vocabularyRepository;

    private final VocabularyMapper vocabularyMapper;

    public VocabularyService(VocabularyRepository vocabularyRepository, VocabularyMapper vocabularyMapper) {
        this.vocabularyRepository = vocabularyRepository;
        this.vocabularyMapper = vocabularyMapper;
    }

    /**
     * Save a vocabulary.
     *
     * @param vocabularyDTO the entity to save.
     * @return the persisted entity.
     */
    public VocabularyDTO save(VocabularyDTO vocabularyDTO) {
        LOG.debug("Request to save Vocabulary : {}", vocabularyDTO);
        Vocabulary vocabulary = vocabularyMapper.toEntity(vocabularyDTO);
        vocabulary = vocabularyRepository.save(vocabulary);
        return vocabularyMapper.toDto(vocabulary);
    }

    /**
     * Update a vocabulary.
     *
     * @param vocabularyDTO the entity to save.
     * @return the persisted entity.
     */
    public VocabularyDTO update(VocabularyDTO vocabularyDTO) {
        LOG.debug("Request to update Vocabulary : {}", vocabularyDTO);
        Vocabulary vocabulary = vocabularyMapper.toEntity(vocabularyDTO);
        vocabulary = vocabularyRepository.save(vocabulary);
        return vocabularyMapper.toDto(vocabulary);
    }

    /**
     * Partially update a vocabulary.
     *
     * @param vocabularyDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<VocabularyDTO> partialUpdate(VocabularyDTO vocabularyDTO) {
        LOG.debug("Request to partially update Vocabulary : {}", vocabularyDTO);

        return vocabularyRepository
            .findById(vocabularyDTO.getId())
            .map(existingVocabulary -> {
                vocabularyMapper.partialUpdate(existingVocabulary, vocabularyDTO);

                return existingVocabulary;
            })
            .map(vocabularyRepository::save)
            .map(vocabularyMapper::toDto);
    }

    /**
     * Get all the vocabularies.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<VocabularyDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Vocabularies");
        return vocabularyRepository.findAll(pageable).map(vocabularyMapper::toDto);
    }

    /**
     * Get one vocabulary by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<VocabularyDTO> findOne(Long id) {
        LOG.debug("Request to get Vocabulary : {}", id);
        return vocabularyRepository.findById(id).map(vocabularyMapper::toDto);
    }

    /**
     * Get all the vocabularies by unit id.
     *
     * @param unitId the id of the unit.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<VocabularyDTO> findAllByUnitId(Long unitId) {
        LOG.debug("Request to get all Vocabularies by unitId : {}", unitId);
        return vocabularyRepository.findAllByUnitId(unitId).stream().map(vocabularyMapper::toDto).collect(Collectors.toList());
    }

    /**
     * Delete the vocabulary by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete Vocabulary : {}", id);
        vocabularyRepository.deleteById(id);
    }
}
