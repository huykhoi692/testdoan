package com.langleague.web.rest;

import com.langleague.repository.StreakMilestoneRepository;
import com.langleague.service.StreakMilestoneService;
import com.langleague.service.dto.StreakMilestoneDTO;
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
 * REST controller for managing {@link com.langleague.domain.StreakMilestone}.
 */
@RestController
@RequestMapping("/api/streak-milestones")
public class StreakMilestoneResource {

    private static final Logger LOG = LoggerFactory.getLogger(StreakMilestoneResource.class);

    private static final String ENTITY_NAME = "streakMilestone";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StreakMilestoneService streakMilestoneService;

    private final StreakMilestoneRepository streakMilestoneRepository;

    public StreakMilestoneResource(StreakMilestoneService streakMilestoneService, StreakMilestoneRepository streakMilestoneRepository) {
        this.streakMilestoneService = streakMilestoneService;
        this.streakMilestoneRepository = streakMilestoneRepository;
    }

    /**
     * {@code POST  /streak-milestones} : Create a new streakMilestone.
     *
     * @param streakMilestoneDTO the streakMilestoneDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new streakMilestoneDTO, or with status {@code 400 (Bad Request)} if the streakMilestone has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<StreakMilestoneDTO> createStreakMilestone(@Valid @RequestBody StreakMilestoneDTO streakMilestoneDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save StreakMilestone : {}", streakMilestoneDTO);
        if (streakMilestoneDTO.getId() != null) {
            throw new BadRequestAlertException("A new streakMilestone cannot already have an ID", ENTITY_NAME, "idexists");
        }
        streakMilestoneDTO = streakMilestoneService.save(streakMilestoneDTO);
        return ResponseEntity.created(new URI("/api/streak-milestones/" + streakMilestoneDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, streakMilestoneDTO.getId().toString()))
            .body(streakMilestoneDTO);
    }

    /**
     * {@code PUT  /streak-milestones/:id} : Updates an existing streakMilestone.
     *
     * @param id the id of the streakMilestoneDTO to save.
     * @param streakMilestoneDTO the streakMilestoneDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated streakMilestoneDTO,
     * or with status {@code 400 (Bad Request)} if the streakMilestoneDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the streakMilestoneDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<StreakMilestoneDTO> updateStreakMilestone(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody StreakMilestoneDTO streakMilestoneDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update StreakMilestone : {}, {}", id, streakMilestoneDTO);
        if (streakMilestoneDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, streakMilestoneDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!streakMilestoneRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        streakMilestoneDTO = streakMilestoneService.update(streakMilestoneDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, streakMilestoneDTO.getId().toString()))
            .body(streakMilestoneDTO);
    }

    /**
     * {@code PATCH  /streak-milestones/:id} : Partial updates given fields of an existing streakMilestone, field will ignore if it is null
     *
     * @param id the id of the streakMilestoneDTO to save.
     * @param streakMilestoneDTO the streakMilestoneDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated streakMilestoneDTO,
     * or with status {@code 400 (Bad Request)} if the streakMilestoneDTO is not valid,
     * or with status {@code 404 (Not Found)} if the streakMilestoneDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the streakMilestoneDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<StreakMilestoneDTO> partialUpdateStreakMilestone(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody StreakMilestoneDTO streakMilestoneDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update StreakMilestone partially : {}, {}", id, streakMilestoneDTO);
        if (streakMilestoneDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, streakMilestoneDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!streakMilestoneRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<StreakMilestoneDTO> result = streakMilestoneService.partialUpdate(streakMilestoneDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, streakMilestoneDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /streak-milestones} : get all the streakMilestones.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of streakMilestones in body.
     */
    @GetMapping("")
    public ResponseEntity<List<StreakMilestoneDTO>> getAllStreakMilestones(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of StreakMilestones");
        Page<StreakMilestoneDTO> page = streakMilestoneService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /streak-milestones/:id} : get the "id" streakMilestone.
     *
     * @param id the id of the streakMilestoneDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the streakMilestoneDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<StreakMilestoneDTO> getStreakMilestone(@PathVariable("id") Long id) {
        LOG.debug("REST request to get StreakMilestone : {}", id);
        Optional<StreakMilestoneDTO> streakMilestoneDTO = streakMilestoneService.findOne(id);
        return ResponseUtil.wrapOrNotFound(streakMilestoneDTO);
    }

    /**
     * {@code DELETE  /streak-milestones/:id} : delete the "id" streakMilestone.
     *
     * @param id the id of the streakMilestoneDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStreakMilestone(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete StreakMilestone : {}", id);
        streakMilestoneService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
