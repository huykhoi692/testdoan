package com.langleague.app.service;

import com.langleague.app.domain.Grammar;
import com.langleague.app.repository.GrammarRepository;
import com.langleague.app.service.dto.GrammarDTO;
import com.langleague.app.service.mapper.GrammarMapper;
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
 * Service Implementation for managing {@link com.langleague.app.domain.Grammar}.
 */
@Service
@Transactional
public class GrammarService {

    private static final Logger LOG = LoggerFactory.getLogger(GrammarService.class);

    private final GrammarRepository grammarRepository;

    private final GrammarMapper grammarMapper;

    public GrammarService(GrammarRepository grammarRepository, GrammarMapper grammarMapper) {
        this.grammarRepository = grammarRepository;
        this.grammarMapper = grammarMapper;
    }

    /**
     * Save a grammar.
     *
     * @param grammarDTO the entity to save.
     * @return the persisted entity.
     */
    public GrammarDTO save(GrammarDTO grammarDTO) {
        LOG.debug("Request to save Grammar : {}", grammarDTO);
        Grammar grammar = grammarMapper.toEntity(grammarDTO);
        grammar = grammarRepository.save(grammar);
        return grammarMapper.toDto(grammar);
    }

    /**
     * Update a grammar.
     *
     * @param grammarDTO the entity to save.
     * @return the persisted entity.
     */
    public GrammarDTO update(GrammarDTO grammarDTO) {
        LOG.debug("Request to update Grammar : {}", grammarDTO);
        Grammar grammar = grammarMapper.toEntity(grammarDTO);
        grammar = grammarRepository.save(grammar);
        return grammarMapper.toDto(grammar);
    }

    /**
     * Partially update a grammar.
     *
     * @param grammarDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<GrammarDTO> partialUpdate(GrammarDTO grammarDTO) {
        LOG.debug("Request to partially update Grammar : {}", grammarDTO);

        return grammarRepository
            .findById(grammarDTO.getId())
            .map(existingGrammar -> {
                grammarMapper.partialUpdate(existingGrammar, grammarDTO);

                return existingGrammar;
            })
            .map(grammarRepository::save)
            .map(grammarMapper::toDto);
    }

    /**
     * Get all the grammars.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<GrammarDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all Grammars");
        return grammarRepository.findAll(pageable).map(grammarMapper::toDto);
    }

    /**
     * Get one grammar by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<GrammarDTO> findOne(Long id) {
        LOG.debug("Request to get Grammar : {}", id);
        return grammarRepository.findById(id).map(grammarMapper::toDto);
    }

    /**
     * Get all the grammars by unit id.
     *
     * @param unitId the id of the unit.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<GrammarDTO> findAllByUnitId(Long unitId) {
        LOG.debug("Request to get all Grammars by unitId : {}", unitId);
        return grammarRepository.findAllByUnitId(unitId).stream().map(grammarMapper::toDto).collect(Collectors.toList());
    }

    /**
     * Delete the grammar by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete Grammar : {}", id);
        grammarRepository.deleteById(id);
    }
}
