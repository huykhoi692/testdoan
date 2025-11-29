package com.langleague.web.rest;

import com.langleague.security.SecurityUtils;
import com.langleague.service.UserProgressService;
import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for dashboard statistics.
 */
@RestController
@RequestMapping("/api/dashboard")
public class DashboardResource {

    private static final Logger LOG = LoggerFactory.getLogger(DashboardResource.class);

    private final UserProgressService userProgressService;

    public DashboardResource(UserProgressService userProgressService) {
        this.userProgressService = userProgressService;
    }

    /**
     * GET /dashboard/stats : Get dashboard statistics for current user
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        LOG.debug("REST request to get dashboard stats");

        // For now, return mock data until we implement proper stats calculation
        Map<String, Object> stats = new HashMap<>();
        stats.put("wordsLearned", 256);
        stats.put("quizzesCompleted", 4);
        stats.put("courseProgress", 32);
        stats.put("languagesStudying", 10);
        stats.put("totalLessons", 45);
        stats.put("completedLessons", 15);
        stats.put("currentStreak", 7);
        stats.put("longestStreak", 21);

        return ResponseEntity.ok(stats);
    }

    /**
     * GET /dashboard/weekly-progress : Get weekly study progress
     */
    @GetMapping("/weekly-progress")
    public ResponseEntity<List<Map<String, Object>>> getWeeklyProgress() {
        LOG.debug("REST request to get weekly progress");

        // Mock data for weekly progress
        List<Map<String, Object>> weeklyData = Arrays.asList(
            createDayProgress("Mon", 2.0),
            createDayProgress("Tue", 3.0),
            createDayProgress("Wed", 1.5),
            createDayProgress("Thu", 4.0),
            createDayProgress("Fri", 2.5),
            createDayProgress("Sat", 3.5),
            createDayProgress("Sun", 2.0)
        );

        return ResponseEntity.ok(weeklyData);
    }

    private Map<String, Object> createDayProgress(String day, Double hours) {
        Map<String, Object> dayData = new HashMap<>();
        dayData.put("day", day);
        dayData.put("hours", hours);
        return dayData;
    }

    /**
     * {@code GET /dashboard/admin/user-visits} : Get user visit statistics.
     * Use case 54: View user visit reports (Admin)
     */
    @GetMapping("/admin/user-visits")
    public ResponseEntity<Map<String, Object>> getUserVisitReports() {
        LOG.debug("REST request to get user visit reports");

        Map<String, Object> visitStats = new HashMap<>();
        visitStats.put("totalVisits", 15420);
        visitStats.put("uniqueUsers", 3245);
        visitStats.put("avgSessionDuration", "12m 35s");
        visitStats.put("bounceRate", 23.5);
        visitStats.put("monthlyGrowth", 15.2);

        return ResponseEntity.ok(visitStats);
    }

    /**
     * {@code GET /dashboard/admin/completion-stats} : Get student completion statistics.
     * Use case 55: View completion statistics (Admin)
     */
    @GetMapping("/admin/completion-stats")
    public ResponseEntity<Map<String, Object>> getCompletionStatistics() {
        LOG.debug("REST request to get completion statistics");

        Map<String, Object> completionStats = new HashMap<>();
        completionStats.put("totalStudents", 3245);
        completionStats.put("completedCourses", 892);
        completionStats.put("inProgress", 1876);
        completionStats.put("notStarted", 477);
        completionStats.put("averageCompletion", 67.5);
        completionStats.put("completionRate", 27.5);

        return ResponseEntity.ok(completionStats);
    }

    /**
     * {@code GET /dashboard/admin/engagement-stats} : Get engagement statistics.
     * Use case 56: View engagement statistics (Admin)
     */
    @GetMapping("/admin/engagement-stats")
    public ResponseEntity<Map<String, Object>> getEngagementStatistics() {
        LOG.debug("REST request to get engagement statistics");

        Map<String, Object> engagementStats = new HashMap<>();
        engagementStats.put("videoViews", 45678);
        engagementStats.put("quizzesAttempted", 23456);
        engagementStats.put("commentsPosted", 8765);
        engagementStats.put("averageQuizScore", 78.5);
        engagementStats.put("activeUsers", 2145);
        engagementStats.put("dailyActiveUsers", 890);

        return ResponseEntity.ok(engagementStats);
    }

    /**
     * {@code GET /dashboard/admin/export-stats} : Export statistics as CSV/Excel.
     * Use case 64: Export statistics (Admin)
     *
     * @param format the export format (csv or excel).
     * @param type the type of statistics to export.
     * @return the file content as byte array.
     */
    @GetMapping("/admin/export-stats")
    public ResponseEntity<String> exportStatistics(
        @RequestParam(defaultValue = "csv") String format,
        @RequestParam(defaultValue = "all") String type
    ) {
        LOG.debug("REST request to export statistics in format: {} for type: {}", format, type);

        // Mock CSV export
        StringBuilder csv = new StringBuilder();
        csv.append("Metric,Value\n");
        csv.append("Total Users,3245\n");
        csv.append("Active Users,2145\n");
        csv.append("Total Lessons,45\n");
        csv.append("Completed Lessons,892\n");
        csv.append("Average Progress,67.5%\n");

        return ResponseEntity.ok()
            .header("Content-Disposition", "attachment; filename=statistics." + format)
            .header("Content-Type", "text/csv")
            .body(csv.toString());
    }
}
