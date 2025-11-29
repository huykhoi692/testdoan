package com.langleague.web.rest;

import com.langleague.repository.LearningStreakRepository;
import com.langleague.service.LearningStreakService;
import com.langleague.service.dto.LearningStreakDTO;
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
 * REST controller for managing {@link com.langleague.domain.LearningStreak}.
 */
@RestController
@RequestMapping("/api/learning-streaks")
public class LearningStreakResource {

    private static final Logger LOG = LoggerFactory.getLogger(LearningStreakResource.class);

    private static final String ENTITY_NAME = "learningStreak";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LearningStreakService learningStreakService;

    private final LearningStreakRepository learningStreakRepository;

    public LearningStreakResource(LearningStreakService learningStreakService, LearningStreakRepository learningStreakRepository) {
        this.learningStreakService = learningStreakService;
        this.learningStreakRepository = learningStreakRepository;
    }

    /**
     * {@code POST  /learning-streaks} : Create a new learningStreak.
     *
     * @param learningStreakDTO the learningStreakDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new learningStreakDTO, or with status {@code 400 (Bad Request)} if the learningStreak has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<LearningStreakDTO> createLearningStreak(@Valid @RequestBody LearningStreakDTO learningStreakDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save LearningStreak : {}", learningStreakDTO);
        if (learningStreakDTO.getId() != null) {
            throw new BadRequestAlertException("A new learningStreak cannot already have an ID", ENTITY_NAME, "idexists");
        }
        learningStreakDTO = learningStreakService.save(learningStreakDTO);
        return ResponseEntity.created(new URI("/api/learning-streaks/" + learningStreakDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, learningStreakDTO.getId().toString()))
            .body(learningStreakDTO);
    }

    /**
     * {@code PUT  /learning-streaks/:id} : Updates an existing learningStreak.
     *
     * @param id the id of the learningStreakDTO to save.
     * @param learningStreakDTO the learningStreakDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated learningStreakDTO,
     * or with status {@code 400 (Bad Request)} if the learningStreakDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the learningStreakDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<LearningStreakDTO> updateLearningStreak(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody LearningStreakDTO learningStreakDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update LearningStreak : {}, {}", id, learningStreakDTO);
        if (learningStreakDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, learningStreakDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!learningStreakRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        learningStreakDTO = learningStreakService.update(learningStreakDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, learningStreakDTO.getId().toString()))
            .body(learningStreakDTO);
    }

    /**
     * {@code PATCH  /learning-streaks/:id} : Partial updates given fields of an existing learningStreak, field will ignore if it is null
     *
     * @param id the id of the learningStreakDTO to save.
     * @param learningStreakDTO the learningStreakDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated learningStreakDTO,
     * or with status {@code 400 (Bad Request)} if the learningStreakDTO is not valid,
     * or with status {@code 404 (Not Found)} if the learningStreakDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the learningStreakDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LearningStreakDTO> partialUpdateLearningStreak(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody LearningStreakDTO learningStreakDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update LearningStreak partially : {}, {}", id, learningStreakDTO);
        if (learningStreakDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, learningStreakDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!learningStreakRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LearningStreakDTO> result = learningStreakService.partialUpdate(learningStreakDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, learningStreakDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /learning-streaks} : get all the learningStreaks.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of learningStreaks in body.
     */
    @GetMapping("")
    public ResponseEntity<List<LearningStreakDTO>> getAllLearningStreaks(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of LearningStreaks");
        Page<LearningStreakDTO> page = learningStreakService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /learning-streaks/:id} : get the "id" learningStreak.
     *
     * @param id the id of the learningStreakDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the learningStreakDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<LearningStreakDTO> getLearningStreak(@PathVariable("id") Long id) {
        LOG.debug("REST request to get LearningStreak : {}", id);
        Optional<LearningStreakDTO> learningStreakDTO = learningStreakService.findOne(id);
        return ResponseUtil.wrapOrNotFound(learningStreakDTO);
    }

    /**
     * {@code DELETE  /learning-streaks/:id} : delete the "id" learningStreak.
     *
     * @param id the id of the learningStreakDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLearningStreak(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete LearningStreak : {}", id);
        learningStreakService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
