package com.langleague.web.rest;

import com.langleague.repository.ExerciseResultRepository;
import com.langleague.service.ExerciseResultService;
import com.langleague.service.dto.ExerciseResultDTO;
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
 * REST controller for managing {@link com.langleague.domain.ExerciseResult}.
 */
@RestController
@RequestMapping("/api/exercise-results")
public class ExerciseResultResource {

    private static final Logger LOG = LoggerFactory.getLogger(ExerciseResultResource.class);

    private static final String ENTITY_NAME = "exerciseResult";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExerciseResultService exerciseResultService;

    private final ExerciseResultRepository exerciseResultRepository;

    public ExerciseResultResource(ExerciseResultService exerciseResultService, ExerciseResultRepository exerciseResultRepository) {
        this.exerciseResultService = exerciseResultService;
        this.exerciseResultRepository = exerciseResultRepository;
    }

    /**
     * {@code POST  /exercise-results} : Create a new exerciseResult.
     *
     * @param exerciseResultDTO the exerciseResultDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new exerciseResultDTO, or with status {@code 400 (Bad Request)} if the exerciseResult has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ExerciseResultDTO> createExerciseResult(@Valid @RequestBody ExerciseResultDTO exerciseResultDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save ExerciseResult : {}", exerciseResultDTO);
        if (exerciseResultDTO.getId() != null) {
            throw new BadRequestAlertException("A new exerciseResult cannot already have an ID", ENTITY_NAME, "idexists");
        }
        exerciseResultDTO = exerciseResultService.save(exerciseResultDTO);
        return ResponseEntity.created(new URI("/api/exercise-results/" + exerciseResultDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, exerciseResultDTO.getId().toString()))
            .body(exerciseResultDTO);
    }

    /**
     * {@code PUT  /exercise-results/:id} : Updates an existing exerciseResult.
     *
     * @param id the id of the exerciseResultDTO to save.
     * @param exerciseResultDTO the exerciseResultDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated exerciseResultDTO,
     * or with status {@code 400 (Bad Request)} if the exerciseResultDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the exerciseResultDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ExerciseResultDTO> updateExerciseResult(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ExerciseResultDTO exerciseResultDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update ExerciseResult : {}, {}", id, exerciseResultDTO);
        if (exerciseResultDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, exerciseResultDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!exerciseResultRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        exerciseResultDTO = exerciseResultService.update(exerciseResultDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, exerciseResultDTO.getId().toString()))
            .body(exerciseResultDTO);
    }

    /**
     * {@code PATCH  /exercise-results/:id} : Partial updates given fields of an existing exerciseResult, field will ignore if it is null
     *
     * @param id the id of the exerciseResultDTO to save.
     * @param exerciseResultDTO the exerciseResultDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated exerciseResultDTO,
     * or with status {@code 400 (Bad Request)} if the exerciseResultDTO is not valid,
     * or with status {@code 404 (Not Found)} if the exerciseResultDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the exerciseResultDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ExerciseResultDTO> partialUpdateExerciseResult(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ExerciseResultDTO exerciseResultDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update ExerciseResult partially : {}, {}", id, exerciseResultDTO);
        if (exerciseResultDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, exerciseResultDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!exerciseResultRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ExerciseResultDTO> result = exerciseResultService.partialUpdate(exerciseResultDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, exerciseResultDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /exercise-results} : get all the exerciseResults.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of exerciseResults in body.
     */
    @GetMapping("")
    public ResponseEntity<List<ExerciseResultDTO>> getAllExerciseResults(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of ExerciseResults");
        Page<ExerciseResultDTO> page = exerciseResultService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /exercise-results/:id} : get the "id" exerciseResult.
     *
     * @param id the id of the exerciseResultDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the exerciseResultDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ExerciseResultDTO> getExerciseResult(@PathVariable("id") Long id) {
        LOG.debug("REST request to get ExerciseResult : {}", id);
        Optional<ExerciseResultDTO> exerciseResultDTO = exerciseResultService.findOne(id);
        return ResponseUtil.wrapOrNotFound(exerciseResultDTO);
    }

    /**
     * {@code DELETE  /exercise-results/:id} : delete the "id" exerciseResult.
     *
     * @param id the id of the exerciseResultDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExerciseResult(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete ExerciseResult : {}", id);
        exerciseResultService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
