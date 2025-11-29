package com.langleague.web.rest;

import com.langleague.repository.StreakIconRepository;
import com.langleague.service.StreakIconService;
import com.langleague.service.dto.StreakIconDTO;
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
 * REST controller for managing {@link com.langleague.domain.StreakIcon}.
 */
@RestController
@RequestMapping("/api/streak-icons")
public class StreakIconResource {

    private static final Logger LOG = LoggerFactory.getLogger(StreakIconResource.class);

    private static final String ENTITY_NAME = "streakIcon";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StreakIconService streakIconService;

    private final StreakIconRepository streakIconRepository;

    public StreakIconResource(StreakIconService streakIconService, StreakIconRepository streakIconRepository) {
        this.streakIconService = streakIconService;
        this.streakIconRepository = streakIconRepository;
    }

    /**
     * {@code POST  /streak-icons} : Create a new streakIcon.
     *
     * @param streakIconDTO the streakIconDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new streakIconDTO, or with status {@code 400 (Bad Request)} if the streakIcon has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<StreakIconDTO> createStreakIcon(@Valid @RequestBody StreakIconDTO streakIconDTO) throws URISyntaxException {
        LOG.debug("REST request to save StreakIcon : {}", streakIconDTO);
        if (streakIconDTO.getId() != null) {
            throw new BadRequestAlertException("A new streakIcon cannot already have an ID", ENTITY_NAME, "idexists");
        }
        streakIconDTO = streakIconService.save(streakIconDTO);
        return ResponseEntity.created(new URI("/api/streak-icons/" + streakIconDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, streakIconDTO.getId().toString()))
            .body(streakIconDTO);
    }

    /**
     * {@code PUT  /streak-icons/:id} : Updates an existing streakIcon.
     *
     * @param id the id of the streakIconDTO to save.
     * @param streakIconDTO the streakIconDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated streakIconDTO,
     * or with status {@code 400 (Bad Request)} if the streakIconDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the streakIconDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<StreakIconDTO> updateStreakIcon(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody StreakIconDTO streakIconDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update StreakIcon : {}, {}", id, streakIconDTO);
        if (streakIconDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, streakIconDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!streakIconRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        streakIconDTO = streakIconService.update(streakIconDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, streakIconDTO.getId().toString()))
            .body(streakIconDTO);
    }

    /**
     * {@code PATCH  /streak-icons/:id} : Partial updates given fields of an existing streakIcon, field will ignore if it is null
     *
     * @param id the id of the streakIconDTO to save.
     * @param streakIconDTO the streakIconDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated streakIconDTO,
     * or with status {@code 400 (Bad Request)} if the streakIconDTO is not valid,
     * or with status {@code 404 (Not Found)} if the streakIconDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the streakIconDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<StreakIconDTO> partialUpdateStreakIcon(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody StreakIconDTO streakIconDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update StreakIcon partially : {}, {}", id, streakIconDTO);
        if (streakIconDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, streakIconDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!streakIconRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<StreakIconDTO> result = streakIconService.partialUpdate(streakIconDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, streakIconDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /streak-icons} : get all the streakIcons.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of streakIcons in body.
     */
    @GetMapping("")
    public ResponseEntity<List<StreakIconDTO>> getAllStreakIcons(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of StreakIcons");
        Page<StreakIconDTO> page = streakIconService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /streak-icons/:id} : get the "id" streakIcon.
     *
     * @param id the id of the streakIconDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the streakIconDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<StreakIconDTO> getStreakIcon(@PathVariable("id") Long id) {
        LOG.debug("REST request to get StreakIcon : {}", id);
        Optional<StreakIconDTO> streakIconDTO = streakIconService.findOne(id);
        return ResponseUtil.wrapOrNotFound(streakIconDTO);
    }

    /**
     * {@code DELETE  /streak-icons/:id} : delete the "id" streakIcon.
     *
     * @param id the id of the streakIconDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStreakIcon(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete StreakIcon : {}", id);
        streakIconService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
