package com.langleague.service;

import com.langleague.domain.Lesson;
import com.langleague.domain.StudySession;
import com.langleague.domain.User;
import com.langleague.repository.LessonRepository;
import com.langleague.repository.StudySessionRepository;
import com.langleague.repository.UserRepository;
import com.langleague.security.SecurityUtils;
import com.langleague.service.dto.StudySessionDTO;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class StudySessionService {

    private final Logger log = LoggerFactory.getLogger(StudySessionService.class);

    private final StudySessionRepository studySessionRepository;
    private final UserRepository userRepository;
    private final LessonRepository lessonRepository;

    public StudySessionService(
        StudySessionRepository studySessionRepository,
        UserRepository userRepository,
        LessonRepository lessonRepository
    ) {
        this.studySessionRepository = studySessionRepository;
        this.userRepository = userRepository;
        this.lessonRepository = lessonRepository;
    }

    /**
     * Start a new study session
     */
    public StudySession startSession(Long lessonId) {
        User currentUser = getCurrentUser();
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(() -> new IllegalArgumentException("Lesson not found"));

        StudySession session = new StudySession();
        session.setUser(currentUser);
        session.setLesson(lesson);
        session.setStartTime(Instant.now());
        session.setStatus("IN_PROGRESS");

        return studySessionRepository.save(session);
    }

    /**
     * Complete a study session
     */
    public StudySession completeSession(Long sessionId) {
        StudySession session = studySessionRepository
            .findById(sessionId)
            .orElseThrow(() -> new IllegalArgumentException("Session not found"));

        // Verify user owns this session
        verifySessionOwnership(session);

        session.setEndTime(Instant.now());
        session.setStatus("COMPLETED");
        session.setDuration(Duration.between(session.getStartTime(), session.getEndTime()).toMinutes());

        return studySessionRepository.save(session);
    }

    /**
     * Update study session progress
     */
    public StudySession updateProgress(Long sessionId, StudySessionDTO.ProgressUpdate progressUpdate) {
        StudySession session = studySessionRepository
            .findById(sessionId)
            .orElseThrow(() -> new IllegalArgumentException("Session not found"));

        // Verify user owns this session
        verifySessionOwnership(session);

        // Update progress
        session.setProgress(progressUpdate.getProgressPercentage());
        session.setScore(progressUpdate.getCurrentScore());

        // If session is completed via progress update
        if (Boolean.TRUE.equals(progressUpdate.getIsCompleted())) {
            session.setEndTime(Instant.now());
            session.setStatus("COMPLETED");
            session.setDuration(Duration.between(session.getStartTime(), session.getEndTime()).toMinutes());
        }

        return studySessionRepository.save(session);
    }

    /**
     * Get current user's study sessions
     */
    @Transactional(readOnly = true)
    public Page<StudySession> getCurrentUserSessions(Pageable pageable) {
        return studySessionRepository.findByUserIsCurrentUser(pageable);
    }

    /**
     * Get user's study sessions
     */
    @Transactional(readOnly = true)
    public Page<StudySession> getUserSessions(Long userId, Pageable pageable) {
        return studySessionRepository.findByUserId(userId, pageable);
    }

    /**
     * Get current user's study statistics
     */
    @Transactional(readOnly = true)
    public StudySessionDTO.Stats getCurrentUserStats(Instant startDate, Instant endDate) {
        User currentUser = getCurrentUser();
        return getStatsForUser(currentUser.getId(), startDate, endDate);
    }

    /**
     * Get user's study statistics
     */
    @Transactional(readOnly = true)
    public StudySessionDTO.Stats getUserStats(Long userId, Instant startDate, Instant endDate) {
        return getStatsForUser(userId, startDate, endDate);
    }

    /**
     * Get platform-wide study statistics
     */
    @Transactional(readOnly = true)
    public StudySessionDTO.PlatformStats getPlatformStats(Instant startDate, Instant endDate) {
        List<StudySession> sessions = studySessionRepository.findByStartTimeBetween(
            startDate != null ? startDate : Instant.EPOCH,
            endDate != null ? endDate : Instant.now()
        );

        StudySessionDTO.PlatformStats stats = new StudySessionDTO.PlatformStats();
        stats.setTotalSessions(sessions.size());
        stats.setTotalUsers((long) sessions.stream().map(s -> s.getUser().getId()).distinct().count());
        stats.setTotalDuration(sessions.stream().mapToLong(StudySession::getDuration).sum());
        stats.setAverageSessionDuration(stats.getTotalSessions() > 0 ? stats.getTotalDuration() / stats.getTotalSessions() : 0);

        return stats;
    }

    private StudySessionDTO.Stats getStatsForUser(Long userId, Instant startDate, Instant endDate) {
        List<StudySession> sessions = studySessionRepository.findByUserIdAndStartTimeBetween(
            userId,
            startDate != null ? startDate : Instant.EPOCH,
            endDate != null ? endDate : Instant.now()
        );

        StudySessionDTO.Stats stats = new StudySessionDTO.Stats();
        stats.setTotalSessions(sessions.size());
        stats.setCompletedSessions((int) sessions.stream().filter(s -> "COMPLETED".equals(s.getStatus())).count());
        stats.setTotalDuration(sessions.stream().mapToLong(StudySession::getDuration).sum());
        stats.setAverageSessionDuration(stats.getTotalSessions() > 0 ? stats.getTotalDuration() / stats.getTotalSessions() : 0);

        return stats;
    }

    private User getCurrentUser() {
        return SecurityUtils.getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin)
            .orElseThrow(() -> new IllegalStateException("Current user not found"));
    }

    private void verifySessionOwnership(StudySession session) {
        String currentUserLogin = SecurityUtils.getCurrentUserLogin()
            .orElseThrow(() -> new IllegalStateException("Current user not found"));

        if (!session.getUser().getLogin().equals(currentUserLogin)) {
            throw new IllegalStateException("You don't have permission to modify this session");
        }
    }
}
