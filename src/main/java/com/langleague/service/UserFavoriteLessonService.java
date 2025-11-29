package com.langleague.service;

import com.langleague.domain.AppUser;
import com.langleague.domain.Lesson;
import com.langleague.domain.UserFavoriteLesson;
import com.langleague.repository.AppUserRepository;
import com.langleague.repository.LessonRepository;
import com.langleague.repository.UserFavoriteLessonRepository;
import java.time.Instant;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service for handling favorite lessons
 * Use case 38: Save favorite lessons
 */
@Service
@Transactional
public class UserFavoriteLessonService {

    private static final Logger LOG = LoggerFactory.getLogger(UserFavoriteLessonService.class);

    private final UserFavoriteLessonRepository userFavoriteLessonRepository;
    private final AppUserRepository appUserRepository;
    private final LessonRepository lessonRepository;

    public UserFavoriteLessonService(
        UserFavoriteLessonRepository userFavoriteLessonRepository,
        AppUserRepository appUserRepository,
        LessonRepository lessonRepository
    ) {
        this.userFavoriteLessonRepository = userFavoriteLessonRepository;
        this.appUserRepository = appUserRepository;
        this.lessonRepository = lessonRepository;
    }

    /**
     * Use case 38: Save favorite lesson
     * Add a lesson to user's favorites
     *
     * @param login user login
     * @param lessonId lesson ID
     * @return the saved UserFavoriteLesson
     */
    public UserFavoriteLesson addFavorite(String login, Long lessonId) {
        LOG.debug("Request to add favorite lesson {} for user {}", lessonId, login);

        AppUser appUser = appUserRepository.findByUser_Login(login).orElseThrow(() -> new RuntimeException("AppUser not found"));

        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(() -> new RuntimeException("Lesson not found"));

        // Check if already favorited
        if (userFavoriteLessonRepository.existsByAppUserIdAndLessonId(appUser.getId(), lessonId)) {
            throw new RuntimeException("Lesson already in favorites");
        }

        UserFavoriteLesson favorite = new UserFavoriteLesson();
        favorite.setAppUser(appUser);
        favorite.setLesson(lesson);
        favorite.setCreatedAt(Instant.now());

        return userFavoriteLessonRepository.save(favorite);
    }

    /**
     * Use case 38: Remove favorite lesson
     * Remove a lesson from user's favorites
     *
     * @param login user login
     * @param lessonId lesson ID
     */
    public void removeFavorite(String login, Long lessonId) {
        LOG.debug("Request to remove favorite lesson {} for user {}", lessonId, login);

        AppUser appUser = appUserRepository.findByUser_Login(login).orElseThrow(() -> new RuntimeException("AppUser not found"));

        userFavoriteLessonRepository.deleteByAppUserIdAndLessonId(appUser.getId(), lessonId);
    }

    /**
     * Use case 38: Get all favorite lessons
     * Retrieve user's favorite lessons
     *
     * @param login user login
     * @return list of favorite lessons
     */
    @Transactional(readOnly = true)
    public List<UserFavoriteLesson> getFavorites(String login) {
        LOG.debug("Request to get favorite lessons for user {}", login);

        AppUser appUser = appUserRepository.findByUser_Login(login).orElseThrow(() -> new RuntimeException("AppUser not found"));

        return userFavoriteLessonRepository.findByAppUserId(appUser.getId());
    }

    /**
     * Check if lesson is favorited by user
     *
     * @param login user login
     * @param lessonId lesson ID
     * @return true if favorited, false otherwise
     */
    @Transactional(readOnly = true)
    public boolean isFavorite(String login, Long lessonId) {
        AppUser appUser = appUserRepository.findByUser_Login(login).orElseThrow(() -> new RuntimeException("AppUser not found"));

        return userFavoriteLessonRepository.existsByAppUserIdAndLessonId(appUser.getId(), lessonId);
    }
}
