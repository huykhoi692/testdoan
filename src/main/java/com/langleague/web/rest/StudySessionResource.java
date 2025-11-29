package com.langleague.web.rest;

import com.langleague.domain.StudySession;
import com.langleague.repository.StudySessionRepository;
import com.langleague.security.AuthoritiesConstants;
import com.langleague.service.StudySessionService;
import com.langleague.service.dto.StudySessionDTO;
import jakarta.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class StudySessionResource {

    private final Logger log = LoggerFactory.getLogger(StudySessionResource.class);
    private final StudySessionRepository studySessionRepository;
    private final StudySessionService studySessionService;

    public StudySessionResource(StudySessionRepository studySessionRepository, StudySessionService studySessionService) {
        this.studySessionRepository = studySessionRepository;
        this.studySessionService = studySessionService;
    }

    /**
     * USER: Start a study session
     */
    @PostMapping("/study-sessions/start")
    @PreAuthorize(
        "hasAnyAuthority(\"" +
        AuthoritiesConstants.ADMIN +
        "\", \"" +
        AuthoritiesConstants.STAFF +
        "\", \"" +
        AuthoritiesConstants.USER +
        "\")"
    )
    public ResponseEntity<StudySession> startStudySession(@RequestBody Long lessonId) throws URISyntaxException {
        StudySession result = studySessionService.startSession(lessonId);
        return ResponseEntity.created(new URI("/api/study-sessions/" + result.getId())).body(result);
    }

    /**
     * USER: Complete a study session
     */
    @PutMapping("/study-sessions/{id}/complete")
    @PreAuthorize(
        "hasAnyAuthority(\"" +
        AuthoritiesConstants.ADMIN +
        "\", \"" +
        AuthoritiesConstants.STAFF +
        "\", \"" +
        AuthoritiesConstants.USER +
        "\")"
    )
    public ResponseEntity<StudySession> completeStudySession(@PathVariable Long id) {
        StudySession result = studySessionService.completeSession(id);
        return ResponseEntity.ok(result);
    }

    /**
     * USER: Get my study sessions
     */
    @GetMapping("/study-sessions/my")
    @PreAuthorize(
        "hasAnyAuthority(\"" +
        AuthoritiesConstants.ADMIN +
        "\", \"" +
        AuthoritiesConstants.STAFF +
        "\", \"" +
        AuthoritiesConstants.USER +
        "\")"
    )
    public ResponseEntity<List<StudySession>> getMyStudySessions(Pageable pageable) {
        Page<StudySession> page = studySessionService.getCurrentUserSessions(pageable);
        return ResponseEntity.ok().body(page.getContent());
    }

    /**
     * USER: Get my study statistics
     */
    @GetMapping("/study-sessions/my/stats")
    @PreAuthorize(
        "hasAnyAuthority(\"" +
        AuthoritiesConstants.ADMIN +
        "\", \"" +
        AuthoritiesConstants.STAFF +
        "\", \"" +
        AuthoritiesConstants.USER +
        "\")"
    )
    public ResponseEntity<StudySessionDTO.Stats> getMyStudyStats(
        @RequestParam(required = false) Instant startDate,
        @RequestParam(required = false) Instant endDate
    ) {
        return ResponseEntity.ok(studySessionService.getCurrentUserStats(startDate, endDate));
    }

    /**
     * STAFF/ADMIN: Get user's study sessions
     */
    @GetMapping("/study-sessions/user/{userId}")
    @PreAuthorize("hasAnyAuthority(\"" + AuthoritiesConstants.ADMIN + "\", \"" + AuthoritiesConstants.STAFF + "\")")
    public ResponseEntity<List<StudySession>> getUserStudySessions(@PathVariable Long userId, Pageable pageable) {
        Page<StudySession> page = studySessionService.getUserSessions(userId, pageable);
        return ResponseEntity.ok().body(page.getContent());
    }

    /**
     * STAFF/ADMIN: Get user's study statistics
     */
    @GetMapping("/study-sessions/user/{userId}/stats")
    @PreAuthorize("hasAnyAuthority(\"" + AuthoritiesConstants.ADMIN + "\", \"" + AuthoritiesConstants.STAFF + "\")")
    public ResponseEntity<StudySessionDTO.Stats> getUserStudyStats(
        @PathVariable Long userId,
        @RequestParam(required = false) Instant startDate,
        @RequestParam(required = false) Instant endDate
    ) {
        return ResponseEntity.ok(studySessionService.getUserStats(userId, startDate, endDate));
    }

    /**
     * ADMIN: Get overall platform study statistics
     */
    @GetMapping("/study-sessions/platform-stats")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<StudySessionDTO.PlatformStats> getPlatformStats(
        @RequestParam(required = false) Instant startDate,
        @RequestParam(required = false) Instant endDate
    ) {
        return ResponseEntity.ok(studySessionService.getPlatformStats(startDate, endDate));
    }

    /**
     * ADMIN: Delete study session (for data cleanup)
     */
    @DeleteMapping("/study-sessions/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteStudySession(@PathVariable Long id) {
        studySessionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * USER: Update study session progress
     */
    @PutMapping("/study-sessions/{id}/progress")
    @PreAuthorize(
        "hasAnyAuthority(\"" +
        AuthoritiesConstants.ADMIN +
        "\", \"" +
        AuthoritiesConstants.STAFF +
        "\", \"" +
        AuthoritiesConstants.USER +
        "\")"
    )
    public ResponseEntity<StudySession> updateProgress(
        @PathVariable Long id,
        @Valid @RequestBody StudySessionDTO.ProgressUpdate progressUpdate
    ) {
        StudySession result = studySessionService.updateProgress(id, progressUpdate);
        return ResponseEntity.ok(result);
    }
}
