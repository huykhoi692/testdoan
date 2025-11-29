package com.langleague.web.rest;

import com.langleague.repository.UserVocabularyRepository;
import com.langleague.service.UserVocabularyService;
import com.langleague.service.dto.UserVocabularyDTO;
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
 * REST controller for managing {@link com.langleague.domain.UserVocabulary}.
 */
@RestController
@RequestMapping("/api/user-vocabularies")
public class UserVocabularyResource {

    private static final Logger LOG = LoggerFactory.getLogger(UserVocabularyResource.class);

    private static final String ENTITY_NAME = "userVocabulary";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserVocabularyService userVocabularyService;

    private final UserVocabularyRepository userVocabularyRepository;

    public UserVocabularyResource(UserVocabularyService userVocabularyService, UserVocabularyRepository userVocabularyRepository) {
        this.userVocabularyService = userVocabularyService;
        this.userVocabularyRepository = userVocabularyRepository;
    }

    /**
     * {@code POST  /user-vocabularies} : Create a new userVocabulary.
     *
     * @param userVocabularyDTO the userVocabularyDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userVocabularyDTO, or with status {@code 400 (Bad Request)} if the userVocabulary has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<UserVocabularyDTO> createUserVocabulary(@RequestBody UserVocabularyDTO userVocabularyDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save UserVocabulary : {}", userVocabularyDTO);
        if (userVocabularyDTO.getId() != null) {
            throw new BadRequestAlertException("A new userVocabulary cannot already have an ID", ENTITY_NAME, "idexists");
        }
        userVocabularyDTO = userVocabularyService.save(userVocabularyDTO);
        return ResponseEntity.created(new URI("/api/user-vocabularies/" + userVocabularyDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, userVocabularyDTO.getId().toString()))
            .body(userVocabularyDTO);
    }

    /**
     * {@code PUT  /user-vocabularies/:id} : Updates an existing userVocabulary.
     *
     * @param id the id of the userVocabularyDTO to save.
     * @param userVocabularyDTO the userVocabularyDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userVocabularyDTO,
     * or with status {@code 400 (Bad Request)} if the userVocabularyDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userVocabularyDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserVocabularyDTO> updateUserVocabulary(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody UserVocabularyDTO userVocabularyDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update UserVocabulary : {}, {}", id, userVocabularyDTO);
        if (userVocabularyDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userVocabularyDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userVocabularyRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        userVocabularyDTO = userVocabularyService.update(userVocabularyDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userVocabularyDTO.getId().toString()))
            .body(userVocabularyDTO);
    }

    /**
     * {@code PATCH  /user-vocabularies/:id} : Partial updates given fields of an existing userVocabulary, field will ignore if it is null
     *
     * @param id the id of the userVocabularyDTO to save.
     * @param userVocabularyDTO the userVocabularyDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userVocabularyDTO,
     * or with status {@code 400 (Bad Request)} if the userVocabularyDTO is not valid,
     * or with status {@code 404 (Not Found)} if the userVocabularyDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the userVocabularyDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<UserVocabularyDTO> partialUpdateUserVocabulary(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody UserVocabularyDTO userVocabularyDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update UserVocabulary partially : {}, {}", id, userVocabularyDTO);
        if (userVocabularyDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userVocabularyDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userVocabularyRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<UserVocabularyDTO> result = userVocabularyService.partialUpdate(userVocabularyDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userVocabularyDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /user-vocabularies} : get all the userVocabularies.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userVocabularies in body.
     */
    @GetMapping("")
    public ResponseEntity<List<UserVocabularyDTO>> getAllUserVocabularies(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of UserVocabularies");
        Page<UserVocabularyDTO> page = userVocabularyService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /user-vocabularies/:id} : get the "id" userVocabulary.
     *
     * @param id the id of the userVocabularyDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userVocabularyDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserVocabularyDTO> getUserVocabulary(@PathVariable("id") Long id) {
        LOG.debug("REST request to get UserVocabulary : {}", id);
        Optional<UserVocabularyDTO> userVocabularyDTO = userVocabularyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userVocabularyDTO);
    }

    /**
     * {@code DELETE  /user-vocabularies/:id} : delete the "id" userVocabulary.
     *
     * @param id the id of the userVocabularyDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserVocabulary(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete UserVocabulary : {}", id);
        userVocabularyService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
