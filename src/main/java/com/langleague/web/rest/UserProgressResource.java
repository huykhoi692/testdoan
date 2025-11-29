package com.langleague.web.rest;

import com.langleague.repository.UserProgressRepository;
import com.langleague.service.UserProgressService;
import com.langleague.service.dto.UserProgressDTO;
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
 * REST controller for managing {@link com.langleague.domain.UserProgress}.
 */
@RestController
@RequestMapping("/api/user-progresses")
public class UserProgressResource {

    private static final Logger LOG = LoggerFactory.getLogger(UserProgressResource.class);

    private static final String ENTITY_NAME = "userProgress";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserProgressService userProgressService;

    private final UserProgressRepository userProgressRepository;

    public UserProgressResource(UserProgressService userProgressService, UserProgressRepository userProgressRepository) {
        this.userProgressService = userProgressService;
        this.userProgressRepository = userProgressRepository;
    }

    /**
     * {@code POST  /user-progresses} : Create a new userProgress.
     *
     * @param userProgressDTO the userProgressDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userProgressDTO, or with status {@code 400 (Bad Request)} if the userProgress has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<UserProgressDTO> createUserProgress(@RequestBody UserProgressDTO userProgressDTO) throws URISyntaxException {
        LOG.debug("REST request to save UserProgress : {}", userProgressDTO);
        if (userProgressDTO.getId() != null) {
            throw new BadRequestAlertException("A new userProgress cannot already have an ID", ENTITY_NAME, "idexists");
        }
        userProgressDTO = userProgressService.save(userProgressDTO);
        return ResponseEntity.created(new URI("/api/user-progresses/" + userProgressDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, userProgressDTO.getId().toString()))
            .body(userProgressDTO);
    }

    /**
     * {@code PUT  /user-progresses/:id} : Updates an existing userProgress.
     *
     * @param id the id of the userProgressDTO to save.
     * @param userProgressDTO the userProgressDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userProgressDTO,
     * or with status {@code 400 (Bad Request)} if the userProgressDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userProgressDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserProgressDTO> updateUserProgress(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody UserProgressDTO userProgressDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update UserProgress : {}, {}", id, userProgressDTO);
        if (userProgressDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userProgressDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userProgressRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        userProgressDTO = userProgressService.update(userProgressDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userProgressDTO.getId().toString()))
            .body(userProgressDTO);
    }

    /**
     * {@code PATCH  /user-progresses/:id} : Partial updates given fields of an existing userProgress, field will ignore if it is null
     *
     * @param id the id of the userProgressDTO to save.
     * @param userProgressDTO the userProgressDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userProgressDTO,
     * or with status {@code 400 (Bad Request)} if the userProgressDTO is not valid,
     * or with status {@code 404 (Not Found)} if the userProgressDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the userProgressDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<UserProgressDTO> partialUpdateUserProgress(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody UserProgressDTO userProgressDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update UserProgress partially : {}, {}", id, userProgressDTO);
        if (userProgressDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userProgressDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userProgressRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<UserProgressDTO> result = userProgressService.partialUpdate(userProgressDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userProgressDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /user-progresses} : get all the userProgresses.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userProgresses in body.
     */
    @GetMapping("")
    public ResponseEntity<List<UserProgressDTO>> getAllUserProgresses(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of UserProgresses");
        Page<UserProgressDTO> page = userProgressService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /user-progresses/:id} : get the "id" userProgress.
     *
     * @param id the id of the userProgressDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userProgressDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserProgressDTO> getUserProgress(@PathVariable("id") Long id) {
        LOG.debug("REST request to get UserProgress : {}", id);
        Optional<UserProgressDTO> userProgressDTO = userProgressService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userProgressDTO);
    }

    /**
     * {@code DELETE  /user-progresses/:id} : delete the "id" userProgress.
     *
     * @param id the id of the userProgressDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserProgress(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete UserProgress : {}", id);
        userProgressService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    /**
     * {@code POST  /user-progresses/mark} : Mark lesson progress.
     * Use case 24: Mark lesson as completed
     *
     * @param progressData the progress data (appUserId, lessonId, percent).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userProgressDTO.
     */
    @PostMapping("/mark")
    public ResponseEntity<UserProgressDTO> markLessonProgress(@RequestBody java.util.Map<String, Object> progressData) {
        LOG.debug("REST request to mark lesson progress");
        Long appUserId = Long.valueOf(progressData.get("appUserId").toString());
        Long lessonId = Long.valueOf(progressData.get("lessonId").toString());
        Integer percent = Integer.valueOf(progressData.get("percent").toString());

        UserProgressDTO result = userProgressService.markLessonProgress(appUserId, lessonId, percent);
        return ResponseEntity.ok().body(result);
    }

    /**
     * {@code POST  /user-progresses/save} : Save lesson progress.
     * Use case 25: Save progress
     *
     * @param progressData the progress data (appUserId, lessonId, percent).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userProgressDTO.
     */
    @PostMapping("/save")
    public ResponseEntity<UserProgressDTO> saveProgress(@RequestBody java.util.Map<String, Object> progressData) {
        LOG.debug("REST request to save progress");
        Long appUserId = Long.valueOf(progressData.get("appUserId").toString());
        Long lessonId = Long.valueOf(progressData.get("lessonId").toString());
        Integer percent = Integer.valueOf(progressData.get("percent").toString());

        UserProgressDTO result = userProgressService.saveProgress(appUserId, lessonId, percent);
        return ResponseEntity.ok().body(result);
    }

    /**
     * {@code GET  /user-progresses/user/:appUserId} : Get progress for user.
     * Use case 26: View learning progress
     *
     * @param appUserId the user ID.
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of user progresses.
     */
    @GetMapping("/user/{appUserId}")
    public ResponseEntity<List<UserProgressDTO>> getUserProgress(
        @PathVariable Long appUserId,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get progress for user : {}", appUserId);
        Page<UserProgressDTO> page = userProgressService.getUserProgress(appUserId, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /user-progresses/user/:appUserId/lesson/:lessonId} : Get progress for specific lesson.
     * Use case 26: View learning progress for a lesson
     *
     * @param appUserId the user ID.
     * @param lessonId the lesson ID.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userProgressDTO.
     */
    @GetMapping("/user/{appUserId}/lesson/{lessonId}")
    public ResponseEntity<UserProgressDTO> getLessonProgress(@PathVariable Long appUserId, @PathVariable Long lessonId) {
        LOG.debug("REST request to get lesson progress for user {} and lesson {}", appUserId, lessonId);
        Optional<UserProgressDTO> result = userProgressService.getLessonProgress(appUserId, lessonId);
        return ResponseUtil.wrapOrNotFound(result);
    }

    /**
     * {@code GET  /user-progresses/myprogress} : Get current user's progress.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of user progresses.
     */
    @GetMapping("/myprogress")
    public ResponseEntity<List<UserProgressDTO>> getMyProgress() {
        LOG.debug("REST request to get current user's progress");
        List<UserProgressDTO> progresses = userProgressService.getCurrentUserProgress();
        return ResponseEntity.ok().body(progresses);
    }

    /**
     * {@code GET  /user-progresses/history/:appUserId} : Get learning history.
     * Use case 41: Learning history view
     *
     * @param appUserId the user ID.
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of user progresses.
     */
    @GetMapping("/history/{appUserId}")
    public ResponseEntity<List<UserProgressDTO>> getLearningHistory(
        @PathVariable Long appUserId,
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get learning history for user : {}", appUserId);
        Page<UserProgressDTO> page = userProgressService.getLearningHistory(appUserId, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
