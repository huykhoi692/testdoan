package com.langleague.web.rest;

import com.langleague.repository.LessonSkillRepository;
import com.langleague.service.LessonSkillService;
import com.langleague.service.dto.LessonSkillDTO;
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
 * REST controller for managing {@link com.langleague.domain.LessonSkill}.
 */
@RestController
@RequestMapping("/api/lesson-skills")
public class LessonSkillResource {

    private static final Logger LOG = LoggerFactory.getLogger(LessonSkillResource.class);

    private static final String ENTITY_NAME = "lessonSkill";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LessonSkillService lessonSkillService;

    private final LessonSkillRepository lessonSkillRepository;

    public LessonSkillResource(LessonSkillService lessonSkillService, LessonSkillRepository lessonSkillRepository) {
        this.lessonSkillService = lessonSkillService;
        this.lessonSkillRepository = lessonSkillRepository;
    }

    /**
     * {@code POST  /lesson-skills} : Create a new lessonSkill.
     *
     * @param lessonSkillDTO the lessonSkillDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lessonSkillDTO, or with status {@code 400 (Bad Request)} if the lessonSkill has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<LessonSkillDTO> createLessonSkill(@Valid @RequestBody LessonSkillDTO lessonSkillDTO) throws URISyntaxException {
        LOG.debug("REST request to save LessonSkill : {}", lessonSkillDTO);
        if (lessonSkillDTO.getId() != null) {
            throw new BadRequestAlertException("A new lessonSkill cannot already have an ID", ENTITY_NAME, "idexists");
        }
        lessonSkillDTO = lessonSkillService.save(lessonSkillDTO);
        return ResponseEntity.created(new URI("/api/lesson-skills/" + lessonSkillDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, lessonSkillDTO.getId().toString()))
            .body(lessonSkillDTO);
    }

    /**
     * {@code PUT  /lesson-skills/:id} : Updates an existing lessonSkill.
     *
     * @param id the id of the lessonSkillDTO to save.
     * @param lessonSkillDTO the lessonSkillDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lessonSkillDTO,
     * or with status {@code 400 (Bad Request)} if the lessonSkillDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lessonSkillDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<LessonSkillDTO> updateLessonSkill(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody LessonSkillDTO lessonSkillDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update LessonSkill : {}, {}", id, lessonSkillDTO);
        if (lessonSkillDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lessonSkillDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lessonSkillRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        lessonSkillDTO = lessonSkillService.update(lessonSkillDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lessonSkillDTO.getId().toString()))
            .body(lessonSkillDTO);
    }

    /**
     * {@code PATCH  /lesson-skills/:id} : Partial updates given fields of an existing lessonSkill, field will ignore if it is null
     *
     * @param id the id of the lessonSkillDTO to save.
     * @param lessonSkillDTO the lessonSkillDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lessonSkillDTO,
     * or with status {@code 400 (Bad Request)} if the lessonSkillDTO is not valid,
     * or with status {@code 404 (Not Found)} if the lessonSkillDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the lessonSkillDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LessonSkillDTO> partialUpdateLessonSkill(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody LessonSkillDTO lessonSkillDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update LessonSkill partially : {}, {}", id, lessonSkillDTO);
        if (lessonSkillDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lessonSkillDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lessonSkillRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LessonSkillDTO> result = lessonSkillService.partialUpdate(lessonSkillDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lessonSkillDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /lesson-skills} : get all the lessonSkills.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lessonSkills in body.
     */
    @GetMapping("")
    public ResponseEntity<List<LessonSkillDTO>> getAllLessonSkills(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of LessonSkills");
        Page<LessonSkillDTO> page = lessonSkillService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /lesson-skills/:id} : get the "id" lessonSkill.
     *
     * @param id the id of the lessonSkillDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lessonSkillDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<LessonSkillDTO> getLessonSkill(@PathVariable("id") Long id) {
        LOG.debug("REST request to get LessonSkill : {}", id);
        Optional<LessonSkillDTO> lessonSkillDTO = lessonSkillService.findOne(id);
        return ResponseUtil.wrapOrNotFound(lessonSkillDTO);
    }

    /**
     * {@code DELETE  /lesson-skills/:id} : delete the "id" lessonSkill.
     *
     * @param id the id of the lessonSkillDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLessonSkill(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete LessonSkill : {}", id);
        lessonSkillService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
