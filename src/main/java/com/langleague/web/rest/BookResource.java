package com.langleague.web.rest;

import com.langleague.domain.Book;
import com.langleague.repository.BookRepository;
import com.langleague.security.AuthoritiesConstants;
import jakarta.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BookResource {

    private final Logger log = LoggerFactory.getLogger(BookResource.class);
    private final BookRepository bookRepository;

    public BookResource(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    /**
     * Admin only: Create a new book
     */
    @PostMapping("/books")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Book> createBook(@Valid @RequestBody Book book) throws URISyntaxException {
        log.debug("REST request to save Book : {}", book);
        Book result = bookRepository.save(book);
        return ResponseEntity.created(new URI("/api/books/" + result.getId())).body(result);
    }

    /**
     * Admin and Staff: Update a book
     */
    @PutMapping("/books/{id}")
    @PreAuthorize("hasAnyAuthority(\"" + AuthoritiesConstants.ADMIN + "\", \"" + AuthoritiesConstants.STAFF + "\")")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @Valid @RequestBody Book book) {
        log.debug("REST request to update Book : {}", book);
        book.setId(id);
        Book result = bookRepository.save(book);
        return ResponseEntity.ok().body(result);
    }

    /**
     * All authenticated users: Get all books
     */
    @GetMapping("/books")
    @PreAuthorize(
        "hasAnyAuthority(\"" +
        AuthoritiesConstants.ADMIN +
        "\", \"" +
        AuthoritiesConstants.STAFF +
        "\", \"" +
        AuthoritiesConstants.USER +
        "\")"
    )
    public ResponseEntity<List<Book>> getAllBooks(Pageable pageable) {
        log.debug("REST request to get all Books");
        Page<Book> page = bookRepository.findAll(pageable);
        return ResponseEntity.ok().body(page.getContent());
    }

    /**
     * All authenticated users: Get one book
     */
    @GetMapping("/books/{id}")
    @PreAuthorize(
        "hasAnyAuthority(\"" +
        AuthoritiesConstants.ADMIN +
        "\", \"" +
        AuthoritiesConstants.STAFF +
        "\", \"" +
        AuthoritiesConstants.USER +
        "\")"
    )
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        log.debug("REST request to get Book : {}", id);
        Optional<Book> book = bookRepository.findById(id);
        return ResponseEntity.of(book);
    }

    /**
     * Admin only: Delete a book
     */
    @DeleteMapping("/books/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        log.debug("REST request to delete Book : {}", id);
        bookRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Staff only: Mark book as reviewed
     */
    @PutMapping("/books/{id}/review")
    @PreAuthorize("hasAnyAuthority(\"" + AuthoritiesConstants.ADMIN + "\", \"" + AuthoritiesConstants.STAFF + "\")")
    public ResponseEntity<Book> reviewBook(@PathVariable Long id) {
        log.debug("REST request to review Book : {}", id);
        Optional<Book> book = bookRepository.findById(id);
        if (book.isPresent()) {
            Book bookEntity = book.orElseThrow();
            bookEntity.setReviewed(true);
            Book result = bookRepository.save(bookEntity);
            return ResponseEntity.ok().body(result);
        }
        return ResponseEntity.notFound().build();
    }
}
