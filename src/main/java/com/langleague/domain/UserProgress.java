package com.langleague.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A UserProgress.
 */
@Entity
@Table(name = "user_progress")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UserProgress implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "percent")
    private Integer percent;

    @Column(name = "last_accessed")
    private Instant lastAccessed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(
        value = {
            "comments", "exerciseResults", "userProgresses", "userVocabularies", "userAchievements", "learningStreaks", "studySessions",
        },
        allowSetters = true
    )
    private AppUser appUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(
        value = { "lessonWords", "lessonSkills", "mediaFiles", "comments", "userProgresses", "userVocabularies", "chapter" },
        allowSetters = true
    )
    private Lesson lesson;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public UserProgress id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPercent() {
        return this.percent;
    }

    public UserProgress percent(Integer percent) {
        this.setPercent(percent);
        return this;
    }

    public void setPercent(Integer percent) {
        this.percent = percent;
    }

    public Instant getLastAccessed() {
        return this.lastAccessed;
    }

    public UserProgress lastAccessed(Instant lastAccessed) {
        this.setLastAccessed(lastAccessed);
        return this;
    }

    public void setLastAccessed(Instant lastAccessed) {
        this.lastAccessed = lastAccessed;
    }

    public AppUser getAppUser() {
        return this.appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public UserProgress appUser(AppUser appUser) {
        this.setAppUser(appUser);
        return this;
    }

    public Lesson getLesson() {
        return this.lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public UserProgress lesson(Lesson lesson) {
        this.setLesson(lesson);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserProgress)) {
            return false;
        }
        return getId() != null && getId().equals(((UserProgress) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserProgress{" +
            "id=" + getId() +
            ", percent=" + getPercent() +
            ", lastAccessed='" + getLastAccessed() + "'" +
            "}";
    }
}
