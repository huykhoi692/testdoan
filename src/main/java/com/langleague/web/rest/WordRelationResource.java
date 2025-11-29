package com.langleague.web.rest;

import com.langleague.repository.WordRelationRepository;
import com.langleague.service.WordRelationService;
import com.langleague.service.dto.WordRelationDTO;
import com.langleague.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.langleague.domain.WordRelation}.
 */
@RestController
@RequestMapping("/api/word-relations")
public class WordRelationResource {

    private static final Logger LOG = LoggerFactory.getLogger(WordRelationResource.class);

    private static final String ENTITY_NAME = "wordRelation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WordRelationService wordRelationService;

    private final WordRelationRepository wordRelationRepository;

    public WordRelationResource(WordRelationService wordRelationService, WordRelationRepository wordRelationRepository) {
        this.wordRelationService = wordRelationService;
        this.wordRelationRepository = wordRelationRepository;
    }

    /**
     * {@code POST  /word-relations} : Create a new wordRelation.
     *
     * @param wordRelationDTO the wordRelationDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new wordRelationDTO, or with status {@code 400 (Bad Request)} if the wordRelation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<WordRelationDTO> createWordRelation(@Valid @RequestBody WordRelationDTO wordRelationDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save WordRelation : {}", wordRelationDTO);
        if (wordRelationDTO.getId() != null) {
            throw new BadRequestAlertException("A new wordRelation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        wordRelationDTO = wordRelationService.save(wordRelationDTO);
        return ResponseEntity.created(new URI("/api/word-relations/" + wordRelationDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, wordRelationDTO.getId().toString()))
            .body(wordRelationDTO);
    }

    /**
     * {@code PUT  /word-relations/:id} : Updates an existing wordRelation.
     *
     * @param id the id of the wordRelationDTO to save.
     * @param wordRelationDTO the wordRelationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated wordRelationDTO,
     * or with status {@code 400 (Bad Request)} if the wordRelationDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the wordRelationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<WordRelationDTO> updateWordRelation(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody WordRelationDTO wordRelationDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update WordRelation : {}, {}", id, wordRelationDTO);
        if (wordRelationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, wordRelationDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!wordRelationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        wordRelationDTO = wordRelationService.update(wordRelationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, wordRelationDTO.getId().toString()))
            .body(wordRelationDTO);
    }

    /**
     * {@code PATCH  /word-relations/:id} : Partial updates given fields of an existing wordRelation, field will ignore if it is null
     *
     * @param id the id of the wordRelationDTO to save.
     * @param wordRelationDTO the wordRelationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated wordRelationDTO,
     * or with status {@code 400 (Bad Request)} if the wordRelationDTO is not valid,
     * or with status {@code 404 (Not Found)} if the wordRelationDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the wordRelationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<WordRelationDTO> partialUpdateWordRelation(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody WordRelationDTO wordRelationDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update WordRelation partially : {}, {}", id, wordRelationDTO);
        if (wordRelationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, wordRelationDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!wordRelationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<WordRelationDTO> result = wordRelationService.partialUpdate(wordRelationDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, wordRelationDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /word-relations} : get all the wordRelations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of wordRelations in body.
     */
    @GetMapping("")
    public ResponseEntity<List<WordRelationDTO>> getAllWordRelations(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of WordRelations");
        Page<WordRelationDTO> page = wordRelationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /word-relations/:id} : get the "id" wordRelation.
     *
     * @param id the id of the wordRelationDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the wordRelationDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<WordRelationDTO> getWordRelation(@PathVariable("id") Long id) {
        LOG.debug("REST request to get WordRelation : {}", id);
        Optional<WordRelationDTO> wordRelationDTO = wordRelationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(wordRelationDTO);
    }

    /**
     * {@code DELETE  /word-relations/:id} : delete the "id" wordRelation.
     *
     * @param id the id of the wordRelationDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWordRelation(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete WordRelation : {}", id);
        wordRelationService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
