package com.langleague.web.rest;

import com.langleague.domain.Achievement;
import com.langleague.repository.AchievementRepository;
import com.langleague.security.AuthoritiesConstants;
import com.langleague.service.UserAchievementService;
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
public class AchievementResource {

    private final Logger log = LoggerFactory.getLogger(AchievementResource.class);
    private final AchievementRepository achievementRepository;
    private final UserAchievementService userAchievementService;

    public AchievementResource(AchievementRepository achievementRepository, UserAchievementService userAchievementService) {
        this.achievementRepository = achievementRepository;
        this.userAchievementService = userAchievementService;
    }

    /**
     * ADMIN: Create a new achievement
     */
    @PostMapping("/achievements")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Achievement> createAchievement(@Valid @RequestBody Achievement achievement) throws URISyntaxException {
        log.debug("REST request to save Achievement : {}", achievement);
        Achievement result = achievementRepository.save(achievement);
        return ResponseEntity.created(new URI("/api/achievements/" + result.getId())).body(result);
    }

    /**
     * ADMIN/STAFF: Update achievement details
     */
    @PutMapping("/achievements/{id}")
    @PreAuthorize("hasAnyAuthority(\"" + AuthoritiesConstants.ADMIN + "\", \"" + AuthoritiesConstants.STAFF + "\")")
    public ResponseEntity<Achievement> updateAchievement(@PathVariable Long id, @Valid @RequestBody Achievement achievement) {
        log.debug("REST request to update Achievement : {}", achievement);
        achievement.setId(id);
        Achievement result = achievementRepository.save(achievement);
        return ResponseEntity.ok().body(result);
    }

    /**
     * ALL AUTHENTICATED: Get all achievements
     */
    @GetMapping("/achievements")
    @PreAuthorize(
        "hasAnyAuthority(\"" +
        AuthoritiesConstants.ADMIN +
        "\", \"" +
        AuthoritiesConstants.STAFF +
        "\", \"" +
        AuthoritiesConstants.USER +
        "\")"
    )
    public ResponseEntity<List<Achievement>> getAllAchievements(Pageable pageable) {
        Page<Achievement> page = achievementRepository.findAll(pageable);
        return ResponseEntity.ok().body(page.getContent());
    }

    /**
     * ALL AUTHENTICATED: Get specific achievement
     */
    @GetMapping("/achievements/{id}")
    @PreAuthorize(
        "hasAnyAuthority(\"" +
        AuthoritiesConstants.ADMIN +
        "\", \"" +
        AuthoritiesConstants.STAFF +
        "\", \"" +
        AuthoritiesConstants.USER +
        "\")"
    )
    public ResponseEntity<Achievement> getAchievement(@PathVariable Long id) {
        Optional<Achievement> achievement = achievementRepository.findById(id);
        return ResponseEntity.of(achievement);
    }

    /**
     * ADMIN: Delete achievement
     */
    @DeleteMapping("/achievements/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteAchievement(@PathVariable Long id) {
        achievementRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * STAFF: Award achievement to user
     */
    @PostMapping("/achievements/{id}/award/{userId}")
    @PreAuthorize("hasAnyAuthority(\"" + AuthoritiesConstants.ADMIN + "\", \"" + AuthoritiesConstants.STAFF + "\")")
    public ResponseEntity<Void> awardAchievement(@PathVariable Long id, @PathVariable Long userId) {
        userAchievementService.awardAchievement(userId, id);
        return ResponseEntity.ok().build();
    }

    /**
     * STAFF: Revoke achievement from user
     */
    @DeleteMapping("/achievements/{id}/revoke/{userId}")
    @PreAuthorize("hasAnyAuthority(\"" + AuthoritiesConstants.ADMIN + "\", \"" + AuthoritiesConstants.STAFF + "\")")
    public ResponseEntity<Void> revokeAchievement(@PathVariable Long id, @PathVariable Long userId) {
        userAchievementService.revokeAchievement(userId, id);
        return ResponseEntity.ok().build();
    }

    /**
     * USER: Get my achievements
     */
    @GetMapping("/achievements/my")
    @PreAuthorize(
        "hasAnyAuthority(\"" +
        AuthoritiesConstants.ADMIN +
        "\", \"" +
        AuthoritiesConstants.STAFF +
        "\", \"" +
        AuthoritiesConstants.USER +
        "\")"
    )
    public ResponseEntity<List<Achievement>> getMyAchievements() {
        List<Achievement> achievements = userAchievementService.getCurrentUserAchievements();
        return ResponseEntity.ok().body(achievements);
    }

    /**
     * STAFF/ADMIN: Get user achievements
     */
    @GetMapping("/achievements/user/{userId}")
    @PreAuthorize("hasAnyAuthority(\"" + AuthoritiesConstants.ADMIN + "\", \"" + AuthoritiesConstants.STAFF + "\")")
    public ResponseEntity<List<Achievement>> getUserAchievements(@PathVariable Long userId) {
        List<Achievement> achievements = userAchievementService.getUserAchievements(userId);
        return ResponseEntity.ok().body(achievements);
    }
}
