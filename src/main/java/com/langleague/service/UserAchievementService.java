package com.langleague.service;

import com.langleague.domain.Achievement;
import com.langleague.domain.AppUser;
import com.langleague.domain.UserAchievement;
import com.langleague.repository.AchievementRepository;
import com.langleague.repository.AppUserRepository;
import com.langleague.repository.UserAchievementRepository;
import com.langleague.repository.UserRepository;
import com.langleague.security.SecurityUtils;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserAchievementService {

    private final UserAchievementRepository userAchievementRepository;
    private final AchievementRepository achievementRepository;
    private final UserRepository userRepository;
    private final AppUserRepository appUserRepository;

    public UserAchievementService(
        UserAchievementRepository userAchievementRepository,
        AchievementRepository achievementRepository,
        UserRepository userRepository,
        AppUserRepository appUserRepository
    ) {
        this.userAchievementRepository = userAchievementRepository;
        this.achievementRepository = achievementRepository;
        this.userRepository = userRepository;
        this.appUserRepository = appUserRepository;
    }

    /**
     * Award an achievement to a user (by AppUser ID)
     */
    public void awardAchievement(Long appUserId, Long achievementId) {
        appUserRepository
            .findById(appUserId)
            .ifPresent(appUser ->
                achievementRepository
                    .findById(achievementId)
                    .ifPresent(achievement -> {
                        UserAchievement userAchievement = new UserAchievement();
                        userAchievement.setAppUser(appUser);
                        userAchievement.setAchievement(achievement);
                        userAchievement.setAwardedDate(Instant.now());
                        userAchievementRepository.save(userAchievement);
                    })
            );
    }

    /**
     * Revoke an achievement from a user
     */
    public void revokeAchievement(Long appUserId, Long achievementId) {
        userAchievementRepository.findByUserIdAndAchievementId(appUserId, achievementId).ifPresent(userAchievementRepository::delete);
    }

    /**
     * Get current user's achievements
     */
    @Transactional(readOnly = true)
    public List<Achievement> getCurrentUserAchievements() {
        return SecurityUtils.getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin)
            .flatMap(user -> appUserRepository.findByUserId(user.getId()))
            .map(appUser ->
                userAchievementRepository
                    .findByUserId(appUser.getId())
                    .stream()
                    .map(UserAchievement::getAchievement)
                    .collect(Collectors.toList())
            )
            .orElse(List.of());
    }

    /**
     * Get achievements for a specific AppUser
     */
    @Transactional(readOnly = true)
    public List<Achievement> getUserAchievements(Long appUserId) {
        return userAchievementRepository.findByUserId(appUserId).stream().map(UserAchievement::getAchievement).collect(Collectors.toList());
    }

    /**
     * Check if user has specific achievement
     */
    @Transactional(readOnly = true)
    public boolean hasAchievement(Long appUserId, Long achievementId) {
        return userAchievementRepository.findByUserIdAndAchievementId(appUserId, achievementId).isPresent();
    }
}
