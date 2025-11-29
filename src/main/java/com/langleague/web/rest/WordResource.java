package com.langleague.web.rest;

import com.langleague.service.WordService;
import com.langleague.service.dto.WordDTO;
import com.langleague.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
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

@RestController
@RequestMapping("/api")
public class WordResource {

    private final Logger log = LoggerFactory.getLogger(WordResource.class);
    private static final String ENTITY_NAME = "word";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WordService wordService;

    public WordResource(WordService wordService) {
        this.wordService = wordService;
    }

    @PostMapping("/words")
    public ResponseEntity<WordDTO> createWord(@Valid @RequestBody WordDTO wordDTO) throws URISyntaxException {
        log.debug("REST request to save Word : {}", wordDTO);
        if (wordDTO.getId() != null) {
            throw new BadRequestAlertException("A new word cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WordDTO result = wordService.save(wordDTO);
        return ResponseEntity.created(new URI("/api/words/" + result.getId())).body(result);
    }

    @PutMapping("/words/{id}")
    public ResponseEntity<WordDTO> updateWord(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody WordDTO wordDTO
    ) {
        log.debug("REST request to update Word : {}, {}", id, wordDTO);
        if (wordDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!id.equals(wordDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }
        WordDTO result = wordService.update(wordDTO);
        return ResponseEntity.ok().body(result);
    }

    @PatchMapping("/words/{id}")
    public ResponseEntity<WordDTO> partialUpdateWord(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody WordDTO wordDTO
    ) {
        log.debug("REST request to partially update Word : {}, {}", id, wordDTO);
        if (wordDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!id.equals(wordDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        Optional<WordDTO> result = wordService.partialUpdate(wordDTO);

        return result.map(ResponseEntity::ok).orElseThrow(() -> new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid"));
    }

    @GetMapping("/words")
    public ResponseEntity<Page<WordDTO>> getAllWords(Pageable pageable) {
        log.debug("REST request to get a page of Words");
        Page<WordDTO> page = wordService.findAll(pageable);
        return ResponseEntity.ok().body(page);
    }

    @GetMapping("/lessons/{lessonId}/words")
    public ResponseEntity<List<WordDTO>> getWordsByLessonId(@PathVariable Long lessonId) {
        log.debug("REST request to get Words by Lesson ID : {}", lessonId);
        List<WordDTO> words = wordService.findAllByLessonId(lessonId);
        return ResponseEntity.ok().body(words);
    }

    @GetMapping("/words/{id}")
    public ResponseEntity<WordDTO> getWord(@PathVariable Long id) {
        log.debug("REST request to get Word : {}", id);
        Optional<WordDTO> wordDTO = wordService.findOne(id);
        return wordDTO
            .map(ResponseEntity::ok)
            .orElseThrow(() -> new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
    }

    @DeleteMapping("/words/{id}")
    public ResponseEntity<Void> deleteWord(@PathVariable Long id) {
        log.debug("REST request to delete Word : {}", id);
        wordService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
