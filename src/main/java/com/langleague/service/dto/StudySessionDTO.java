package com.langleague.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.langleague.domain.StudySession} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StudySessionDTO implements Serializable {

    private Long id;

    private Instant startAt;

    private Instant endAt;

    private Integer durationMinutes;

    private AppUserDTO appUser;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getStartAt() {
        return startAt;
    }

    public void setStartAt(Instant startAt) {
        this.startAt = startAt;
    }

    public Instant getEndAt() {
        return endAt;
    }

    public void setEndAt(Instant endAt) {
        this.endAt = endAt;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public AppUserDTO getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUserDTO appUser) {
        this.appUser = appUser;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StudySessionDTO)) {
            return false;
        }

        StudySessionDTO studySessionDTO = (StudySessionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, studySessionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StudySessionDTO{" +
            "id=" + getId() +
            ", startAt='" + getStartAt() + "'" +
            ", endAt='" + getEndAt() + "'" +
            ", durationMinutes=" + getDurationMinutes() +
            ", appUser=" + getAppUser() +
            "}";
    }

    /**
     * Inner class for study progress updates
     */
    public static class ProgressUpdate implements Serializable {

        private Integer progressPercentage;
        private Integer currentScore;
        private Boolean isCompleted;

        public Integer getProgressPercentage() {
            return progressPercentage;
        }

        public void setProgressPercentage(Integer progressPercentage) {
            this.progressPercentage = progressPercentage;
        }

        public Integer getCurrentScore() {
            return currentScore;
        }

        public void setCurrentScore(Integer currentScore) {
            this.currentScore = currentScore;
        }

        public Boolean getIsCompleted() {
            return isCompleted;
        }

        public void setIsCompleted(Boolean isCompleted) {
            this.isCompleted = isCompleted;
        }
    }

    /**
     * Inner class for study session statistics
     */
    public static class Stats implements Serializable {

        private Integer totalSessions;
        private Integer completedSessions;
        private Long totalDuration;
        private Long averageSessionDuration;
        private Double averageScore;

        public Integer getTotalSessions() {
            return totalSessions;
        }

        public void setTotalSessions(Integer totalSessions) {
            this.totalSessions = totalSessions;
        }

        public Integer getCompletedSessions() {
            return completedSessions;
        }

        public void setCompletedSessions(Integer completedSessions) {
            this.completedSessions = completedSessions;
        }

        public Long getTotalDuration() {
            return totalDuration;
        }

        public void setTotalDuration(Long totalDuration) {
            this.totalDuration = totalDuration;
        }

        public Long getAverageSessionDuration() {
            return averageSessionDuration;
        }

        public void setAverageSessionDuration(Long averageSessionDuration) {
            this.averageSessionDuration = averageSessionDuration;
        }

        public Double getAverageScore() {
            return averageScore;
        }

        public void setAverageScore(Double averageScore) {
            this.averageScore = averageScore;
        }
    }

    /**
     * Inner class for platform-wide study statistics
     */
    public static class PlatformStats implements Serializable {

        private Integer totalSessions;
        private Long totalUsers;
        private Long totalDuration;
        private Long averageSessionDuration;

        public Integer getTotalSessions() {
            return totalSessions;
        }

        public void setTotalSessions(Integer totalSessions) {
            this.totalSessions = totalSessions;
        }

        public Long getTotalUsers() {
            return totalUsers;
        }

        public void setTotalUsers(Long totalUsers) {
            this.totalUsers = totalUsers;
        }

        public Long getTotalDuration() {
            return totalDuration;
        }

        public void setTotalDuration(Long totalDuration) {
            this.totalDuration = totalDuration;
        }

        public Long getAverageSessionDuration() {
            return averageSessionDuration;
        }

        public void setAverageSessionDuration(Long averageSessionDuration) {
            this.averageSessionDuration = averageSessionDuration;
        }
    }
}
