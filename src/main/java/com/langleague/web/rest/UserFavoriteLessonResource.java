package com.langleague.web.rest;

import com.langleague.domain.UserFavoriteLesson;
import com.langleague.security.SecurityUtils;
import com.langleague.service.UserFavoriteLessonService;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing user favorite lessons.
 * Use case 38: Save favorite lessons
 */
@RestController
@RequestMapping("/api/favorites")
public class UserFavoriteLessonResource {

    private static final Logger LOG = LoggerFactory.getLogger(UserFavoriteLessonResource.class);

    private final UserFavoriteLessonService userFavoriteLessonService;

    public UserFavoriteLessonResource(UserFavoriteLessonService userFavoriteLessonService) {
        this.userFavoriteLessonService = userFavoriteLessonService;
    }

    /**
     * {@code POST  /favorites/:lessonId} : Add a lesson to favorites.
     * Use case 38: Save favorite lesson
     *
     * @param lessonId the lesson ID to add to favorites.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)}.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/{lessonId}")
    public ResponseEntity<UserFavoriteLesson> addFavorite(@PathVariable Long lessonId) throws URISyntaxException {
        LOG.debug("REST request to add favorite lesson : {}", lessonId);
        String login = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new RuntimeException("User not authenticated"));

        UserFavoriteLesson result = userFavoriteLessonService.addFavorite(login, lessonId);
        return ResponseEntity.created(new URI("/api/favorites/" + result.getId())).body(result);
    }

    /**
     * {@code DELETE  /favorites/:lessonId} : Remove a lesson from favorites.
     * Use case 38: Remove favorite lesson
     *
     * @param lessonId the lesson ID to remove from favorites.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{lessonId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long lessonId) {
        LOG.debug("REST request to remove favorite lesson : {}", lessonId);
        String login = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new RuntimeException("User not authenticated"));

        userFavoriteLessonService.removeFavorite(login, lessonId);
        return ResponseEntity.noContent().build();
    }

    /**
     * {@code GET  /favorites} : Get all favorite lessons for current user.
     * Use case 38: Get all favorite lessons
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of favorites.
     */
    @GetMapping("")
    public ResponseEntity<List<UserFavoriteLesson>> getAllFavorites() {
        LOG.debug("REST request to get all favorite lessons");
        String login = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new RuntimeException("User not authenticated"));

        List<UserFavoriteLesson> favorites = userFavoriteLessonService.getFavorites(login);
        return ResponseEntity.ok().body(favorites);
    }

    /**
     * {@code GET  /favorites/check/:lessonId} : Check if lesson is favorited.
     * Use case 38: Check if lesson is favorited
     *
     * @param lessonId the lesson ID to check.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and boolean result.
     */
    @GetMapping("/check/{lessonId}")
    public ResponseEntity<Boolean> isFavorite(@PathVariable Long lessonId) {
        LOG.debug("REST request to check if lesson is favorite : {}", lessonId);
        String login = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new RuntimeException("User not authenticated"));

        boolean isFavorite = userFavoriteLessonService.isFavorite(login, lessonId);
        return ResponseEntity.ok().body(isFavorite);
    }
}
