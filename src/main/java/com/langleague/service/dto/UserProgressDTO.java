package com.langleague.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.langleague.domain.UserProgress} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UserProgressDTO implements Serializable {

    private Long id;

    private Integer percent;

    private Instant lastAccessed;

    private AppUserDTO appUser;

    private LessonDTO lesson;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPercent() {
        return percent;
    }

    public void setPercent(Integer percent) {
        this.percent = percent;
    }

    public Instant getLastAccessed() {
        return lastAccessed;
    }

    public void setLastAccessed(Instant lastAccessed) {
        this.lastAccessed = lastAccessed;
    }

    public AppUserDTO getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUserDTO appUser) {
        this.appUser = appUser;
    }

    public LessonDTO getLesson() {
        return lesson;
    }

    public void setLesson(LessonDTO lesson) {
        this.lesson = lesson;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserProgressDTO)) {
            return false;
        }

        UserProgressDTO userProgressDTO = (UserProgressDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, userProgressDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserProgressDTO{" +
            "id=" + getId() +
            ", percent=" + getPercent() +
            ", lastAccessed='" + getLastAccessed() + "'" +
            ", appUser=" + getAppUser() +
            ", lesson=" + getLesson() +
            "}";
    }
}
