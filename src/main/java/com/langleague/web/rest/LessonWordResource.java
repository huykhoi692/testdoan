package com.langleague.web.rest;

import com.langleague.repository.LessonWordRepository;
import com.langleague.service.LessonWordService;
import com.langleague.service.dto.LessonWordDTO;
import com.langleague.web.rest.errors.BadRequestAlertException;
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
 * REST controller for managing {@link com.langleague.domain.LessonWord}.
 */
@RestController
@RequestMapping("/api/lesson-words")
public class LessonWordResource {

    private static final Logger LOG = LoggerFactory.getLogger(LessonWordResource.class);

    private static final String ENTITY_NAME = "lessonWord";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LessonWordService lessonWordService;

    private final LessonWordRepository lessonWordRepository;

    public LessonWordResource(LessonWordService lessonWordService, LessonWordRepository lessonWordRepository) {
        this.lessonWordService = lessonWordService;
        this.lessonWordRepository = lessonWordRepository;
    }

    /**
     * {@code POST  /lesson-words} : Create a new lessonWord.
     *
     * @param lessonWordDTO the lessonWordDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lessonWordDTO, or with status {@code 400 (Bad Request)} if the lessonWord has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<LessonWordDTO> createLessonWord(@RequestBody LessonWordDTO lessonWordDTO) throws URISyntaxException {
        LOG.debug("REST request to save LessonWord : {}", lessonWordDTO);
        if (lessonWordDTO.getId() != null) {
            throw new BadRequestAlertException("A new lessonWord cannot already have an ID", ENTITY_NAME, "idexists");
        }
        lessonWordDTO = lessonWordService.save(lessonWordDTO);
        return ResponseEntity.created(new URI("/api/lesson-words/" + lessonWordDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, lessonWordDTO.getId().toString()))
            .body(lessonWordDTO);
    }

    /**
     * {@code PUT  /lesson-words/:id} : Updates an existing lessonWord.
     *
     * @param id the id of the lessonWordDTO to save.
     * @param lessonWordDTO the lessonWordDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lessonWordDTO,
     * or with status {@code 400 (Bad Request)} if the lessonWordDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lessonWordDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<LessonWordDTO> updateLessonWord(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LessonWordDTO lessonWordDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update LessonWord : {}, {}", id, lessonWordDTO);
        if (lessonWordDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lessonWordDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lessonWordRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        lessonWordDTO = lessonWordService.update(lessonWordDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lessonWordDTO.getId().toString()))
            .body(lessonWordDTO);
    }

    /**
     * {@code PATCH  /lesson-words/:id} : Partial updates given fields of an existing lessonWord, field will ignore if it is null
     *
     * @param id the id of the lessonWordDTO to save.
     * @param lessonWordDTO the lessonWordDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lessonWordDTO,
     * or with status {@code 400 (Bad Request)} if the lessonWordDTO is not valid,
     * or with status {@code 404 (Not Found)} if the lessonWordDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the lessonWordDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LessonWordDTO> partialUpdateLessonWord(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LessonWordDTO lessonWordDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update LessonWord partially : {}, {}", id, lessonWordDTO);
        if (lessonWordDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lessonWordDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lessonWordRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LessonWordDTO> result = lessonWordService.partialUpdate(lessonWordDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lessonWordDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /lesson-words} : get all the lessonWords.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lessonWords in body.
     */
    @GetMapping("")
    public ResponseEntity<List<LessonWordDTO>> getAllLessonWords(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of LessonWords");
        Page<LessonWordDTO> page = lessonWordService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /lesson-words/:id} : get the "id" lessonWord.
     *
     * @param id the id of the lessonWordDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lessonWordDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<LessonWordDTO> getLessonWord(@PathVariable("id") Long id) {
        LOG.debug("REST request to get LessonWord : {}", id);
        Optional<LessonWordDTO> lessonWordDTO = lessonWordService.findOne(id);
        return ResponseUtil.wrapOrNotFound(lessonWordDTO);
    }

    /**
     * {@code DELETE  /lesson-words/:id} : delete the "id" lessonWord.
     *
     * @param id the id of the lessonWordDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLessonWord(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete LessonWord : {}", id);
        lessonWordService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
