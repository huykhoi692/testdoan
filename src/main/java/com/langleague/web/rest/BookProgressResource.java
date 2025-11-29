package com.langleague.web.rest;

import com.langleague.repository.BookProgressRepository;
import com.langleague.service.BookProgressService;
import com.langleague.service.dto.BookDTO;
import com.langleague.service.dto.BookProgressDTO;
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
 * REST controller for managing {@link com.langleague.domain.BookProgress}.
 */
@RestController
@RequestMapping("/api/book-progresses")
public class BookProgressResource {

    private static final Logger LOG = LoggerFactory.getLogger(BookProgressResource.class);

    private static final String ENTITY_NAME = "bookProgress";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BookProgressService bookProgressService;

    private final BookProgressRepository bookProgressRepository;

    public BookProgressResource(BookProgressService bookProgressService, BookProgressRepository bookProgressRepository) {
        this.bookProgressService = bookProgressService;
        this.bookProgressRepository = bookProgressRepository;
    }

    /**
     * {@code POST  /book-progresses} : Create a new bookProgress.
     *
     * @param bookProgressDTO the bookProgressDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bookProgressDTO, or with status {@code 400 (Bad Request)} if the bookProgress has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<BookProgressDTO> createBookProgress(@Valid @RequestBody BookProgressDTO bookProgressDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save BookProgress : {}", bookProgressDTO);
        if (bookProgressDTO.getId() != null) {
            throw new BadRequestAlertException("A new bookProgress cannot already have an ID", ENTITY_NAME, "idexists");
        }
        bookProgressDTO = bookProgressService.save(bookProgressDTO);
        return ResponseEntity.created(new URI("/api/book-progresses/" + bookProgressDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, bookProgressDTO.getId().toString()))
            .body(bookProgressDTO);
    }

    /**
     * {@code PUT  /book-progresses/:id} : Updates an existing bookProgress.
     *
     * @param id the id of the bookProgressDTO to save.
     * @param bookProgressDTO the bookProgressDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bookProgressDTO,
     * or with status {@code 400 (Bad Request)} if the bookProgressDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bookProgressDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<BookProgressDTO> updateBookProgress(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody BookProgressDTO bookProgressDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update BookProgress : {}, {}", id, bookProgressDTO);
        if (bookProgressDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bookProgressDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bookProgressRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        bookProgressDTO = bookProgressService.update(bookProgressDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bookProgressDTO.getId().toString()))
            .body(bookProgressDTO);
    }

    /**
     * {@code PATCH  /book-progresses/:id} : Partial updates given fields of an existing bookProgress, field will ignore if it is null
     *
     * @param id the id of the bookProgressDTO to save.
     * @param bookProgressDTO the bookProgressDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bookProgressDTO,
     * or with status {@code 400 (Bad Request)} if the bookProgressDTO is not valid,
     * or with status {@code 404 (Not Found)} if the bookProgressDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the bookProgressDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<BookProgressDTO> partialUpdateBookProgress(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody BookProgressDTO bookProgressDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update BookProgress partially : {}, {}", id, bookProgressDTO);
        if (bookProgressDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bookProgressDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bookProgressRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<BookProgressDTO> result = bookProgressService.partialUpdate(bookProgressDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, bookProgressDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /book-progresses} : get all the bookProgresses.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bookProgresses in body.
     */
    @GetMapping("")
    public ResponseEntity<List<BookProgressDTO>> getAllBookProgresses(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of BookProgresses");
        Page<BookProgressDTO> page = bookProgressService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /book-progresses/:id} : get the "id" bookProgress.
     *
     * @param id the id of the bookProgressDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bookProgressDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<BookProgressDTO> getBookProgress(@PathVariable("id") Long id) {
        LOG.debug("REST request to get BookProgress : {}", id);
        Optional<BookProgressDTO> bookProgressDTO = bookProgressService.findOne(id);
        return ResponseUtil.wrapOrNotFound(bookProgressDTO);
    }

    /**
     * {@code DELETE  /book-progresses/:id} : delete the "id" bookProgress.
     *
     * @param id the id of the bookProgress to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookProgress(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete BookProgress : {}", id);
        bookProgressService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    /**
     * {@code GET  /book-progresses/my-books} : get current user's book progresses.
     * Use case 25: Save progress, UC 26: View learning progress
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of book progresses in body.
     */
    @GetMapping("/my-books")
    public ResponseEntity<List<BookProgressDTO>> getMyBookProgresses() {
        LOG.debug("REST request to get current user's book progresses");
        List<BookProgressDTO> progresses = bookProgressService.findByCurrentUser();
        return ResponseEntity.ok().body(progresses);
    }

    /**
     * {@code GET  /book-progresses/book/:bookId} : get current user's progress for a specific book.
     * Use case 25: Save progress, UC 26: View learning progress
     *
     * @param bookId the id of the book.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bookProgressDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/book/{bookId}")
    public ResponseEntity<BookProgressDTO> getMyBookProgress(@PathVariable("bookId") Long bookId) {
        LOG.debug("REST request to get current user's progress for book : {}", bookId);
        Optional<BookProgressDTO> progress = bookProgressService.findByCurrentUserAndBookId(bookId);
        return ResponseUtil.wrapOrNotFound(progress);
    }

    /**
     * {@code PUT  /book-progresses/book/:bookId} : update or create current user's progress for a book.
     * Use case 25: Save progress
     *
     * @param bookId the id of the book.
     * @param bookProgressDTO the progress data to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bookProgressDTO.
     */
    @PutMapping("/book/{bookId}")
    public ResponseEntity<BookProgressDTO> updateMyBookProgress(
        @PathVariable("bookId") Long bookId,
        @RequestBody BookProgressDTO bookProgressDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update current user's progress for book : {}", bookId);
        // Set the book using BookDTO
        if (bookProgressDTO.getBook() == null) {
            BookDTO bookDTO = new BookDTO();
            bookDTO.setId(bookId);
            bookProgressDTO.setBook(bookDTO);
        } else {
            bookProgressDTO.getBook().setId(bookId);
        }
        BookProgressDTO result = bookProgressService.saveOrUpdateForCurrentUser(bookProgressDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
}
