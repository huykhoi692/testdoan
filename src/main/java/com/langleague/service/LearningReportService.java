package com.langleague.service;

import com.langleague.domain.*;
import com.langleague.repository.*;
import com.langleague.service.dto.LearningReportDTO;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service for generating learning reports and statistics.
 * Use cases: UC 26, 33, 41, 51-53
 */
@Service
@Transactional
public class LearningReportService {

    private static final Logger LOG = LoggerFactory.getLogger(LearningReportService.class);

    private final BookProgressRepository bookProgressRepository;
    private final ChapterProgressRepository chapterProgressRepository;
    private final StudySessionRepository studySessionRepository;
    private final UserRepository userRepository;

    public LearningReportService(
        BookProgressRepository bookProgressRepository,
        ChapterProgressRepository chapterProgressRepository,
        StudySessionRepository studySessionRepository,
        UserRepository userRepository
    ) {
        this.bookProgressRepository = bookProgressRepository;
        this.chapterProgressRepository = chapterProgressRepository;
        this.studySessionRepository = studySessionRepository;
        this.userRepository = userRepository;
    }

    /**
     * Get comprehensive learning report for a user.
     * Use case 26: View learning progress
     * OPTIMIZED: Uses aggregation queries instead of fetching all entities
     */
    @Transactional(readOnly = true)
    public LearningReportDTO getUserLearningReport(String userLogin) {
        LOG.debug("Request to get learning report for user : {}", userLogin);

        return userRepository
            .findOneByLogin(userLogin)
            .map(user -> {
                LearningReportDTO report = new LearningReportDTO();
                report.setUserLogin(userLogin);
                report.setGeneratedAt(Instant.now());

                Long userId = user.getId();

                // OPTIMIZED: Use count queries instead of fetching all entities
                report.setTotalBooksStarted((int) bookProgressRepository.countByUserId(userId));
                report.setTotalBooksCompleted((int) bookProgressRepository.countCompletedByUserId(userId));

                report.setTotalChaptersStarted((int) chapterProgressRepository.countByUserId(userId));
                report.setTotalChaptersCompleted((int) chapterProgressRepository.countCompletedByUserId(userId));

                // Calculate average completion percentage
                Double avgPercent = chapterProgressRepository.getAverageProgressByUserId(userId);
                report.setAverageProgress(avgPercent != null ? avgPercent : 0.0);

                // Get study time statistics
                report.setTotalStudyMinutes((int) studySessionRepository.sumDurationMinutesByUserId(userId));
                report.setTotalStudySessions((int) studySessionRepository.countByUserId(userId));

                return report;
            })
            .orElse(new LearningReportDTO());
    }

    /**
     * Generate PDF report of user's learning progress.
     * Use case 33: Generate learning report
     */
    public byte[] generatePdfReport(String userLogin) {
        LOG.debug("Request to generate PDF report for user : {}", userLogin);

        LearningReportDTO report = getUserLearningReport(userLogin);

        // Simple PDF generation - in production, use iText or similar library
        String content = String.format(
            "Learning Report for %s\n\n" +
            "Books Started: %d\n" +
            "Books Completed: %d\n" +
            "Chapters Started: %d\n" +
            "Chapters Completed: %d\n" +
            "Average Progress: %.2f%%\n" +
            "Total Study Time: %d minutes\n" +
            "Total Sessions: %d\n",
            userLogin,
            report.getTotalBooksStarted(),
            report.getTotalBooksCompleted(),
            report.getTotalChaptersStarted(),
            report.getTotalChaptersCompleted(),
            report.getAverageProgress(),
            report.getTotalStudyMinutes(),
            report.getTotalStudySessions()
        );

        return content.getBytes();
    }

    /**
     * Get user's learning history timeline.
     * Use case 41: Learning history view
     */
    @Transactional(readOnly = true)
    public LearningReportDTO getUserLearningHistory(String userLogin) {
        LOG.debug("Request to get learning history for user : {}", userLogin);

        return userRepository
            .findOneByLogin(userLogin)
            .map(user -> {
                LearningReportDTO history = new LearningReportDTO();
                history.setUserLogin(userLogin);
                history.setGeneratedAt(Instant.now());

                // Get recent study sessions (last 30 days)
                Instant thirtyDaysAgo = Instant.now().minus(30, ChronoUnit.DAYS);
                List<com.langleague.domain.StudySession> recentSessions = studySessionRepository.findByUserIdAndStartAtAfter(
                    user.getId(),
                    thirtyDaysAgo
                );

                Map<String, Integer> dailyActivity = new HashMap<>();
                for (com.langleague.domain.StudySession session : recentSessions) {
                    String date = session.getStartAt().toString().substring(0, 10);
                    dailyActivity.merge(date, session.getDurationMinutes() != null ? session.getDurationMinutes() : 0, Integer::sum);
                }

                history.setDailyActivityMap(dailyActivity);
                history.setTotalStudySessions(recentSessions.size());

                return history;
            })
            .orElse(new LearningReportDTO());
    }

    /**
     * Get user visit statistics for admin.
     * Use case 51: View user visit reports
     */
    @Transactional(readOnly = true)
    public LearningReportDTO getUserVisitStatistics() {
        LOG.debug("Request to get user visit statistics");

        LearningReportDTO stats = new LearningReportDTO();
        stats.setGeneratedAt(Instant.now());

        // Get all study sessions to calculate visits
        List<com.langleague.domain.StudySession> allSessions = studySessionRepository.findAll();
        stats.setTotalVisits(allSessions.size());

        // Calculate unique users
        long uniqueUsers = allSessions
            .stream()
            .map(com.langleague.domain.StudySession::getAppUser)
            .filter(java.util.Objects::nonNull)
            .map(com.langleague.domain.AppUser::getId)
            .distinct()
            .count();
        stats.setUniqueUsers((int) uniqueUsers);

        // Get today's sessions
        Instant startOfDay = Instant.now().truncatedTo(ChronoUnit.DAYS);
        long todaySessions = allSessions.stream().filter(s -> s.getStartAt() != null && s.getStartAt().isAfter(startOfDay)).count();
        stats.setTodayVisits((int) todaySessions);

        return stats;
    }

    /**
     * Get completion statistics for admin.
     * Use case 52: View completion statistics
     */
    @Transactional(readOnly = true)
    public LearningReportDTO getCompletionStatistics() {
        LOG.debug("Request to get completion statistics");

        LearningReportDTO stats = new LearningReportDTO();
        stats.setGeneratedAt(Instant.now());

        // Book completion stats
        List<com.langleague.domain.BookProgress> allBookProgress = bookProgressRepository.findAll();
        stats.setTotalBooksStarted(allBookProgress.size());
        stats.setTotalBooksCompleted((int) allBookProgress.stream().filter(com.langleague.domain.BookProgress::getCompleted).count());

        // Chapter completion stats
        List<com.langleague.domain.ChapterProgress> allChapterProgress = chapterProgressRepository.findAll();
        stats.setTotalChaptersStarted(allChapterProgress.size());
        stats.setTotalChaptersCompleted(
            (int) allChapterProgress.stream().filter(com.langleague.domain.ChapterProgress::getCompleted).count()
        );

        // Calculate completion rate
        if (allChapterProgress.size() > 0) {
            double completionRate = (stats.getTotalChaptersCompleted() * 100.0) / allChapterProgress.size();
            stats.setAverageProgress(completionRate);
        }

        return stats;
    }

    /**
     * Get engagement statistics for admin.
     * Use case 53: View engagement statistics
     */
    @Transactional(readOnly = true)
    public LearningReportDTO getEngagementStatistics() {
        LOG.debug("Request to get engagement statistics");

        LearningReportDTO stats = new LearningReportDTO();
        stats.setGeneratedAt(Instant.now());

        // Study session stats
        List<com.langleague.domain.StudySession> allSessions = studySessionRepository.findAll();
        stats.setTotalStudySessions(allSessions.size());

        int totalMinutes = allSessions.stream().mapToInt(s -> s.getDurationMinutes() != null ? s.getDurationMinutes() : 0).sum();
        stats.setTotalStudyMinutes(totalMinutes);

        // Average session length
        if (allSessions.size() > 0) {
            stats.setAverageSessionMinutes(totalMinutes / allSessions.size());
        }

        // Get active users (studied in last 7 days)
        Instant sevenDaysAgo = Instant.now().minus(7, ChronoUnit.DAYS);
        long activeUsers = allSessions
            .stream()
            .filter(s -> s.getStartAt() != null && s.getStartAt().isAfter(sevenDaysAgo))
            .map(com.langleague.domain.StudySession::getAppUser)
            .filter(java.util.Objects::nonNull)
            .map(com.langleague.domain.AppUser::getId)
            .distinct()
            .count();
        stats.setActiveUsers((int) activeUsers);

        return stats;
    }
}
