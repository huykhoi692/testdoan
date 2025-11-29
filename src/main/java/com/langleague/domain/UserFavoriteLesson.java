package com.langleague.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * Use case 38: Save favorite lessons
 * Entity for storing user's favorite lessons
 */
@Entity
@Table(name = "user_favorite_lesson")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class UserFavoriteLesson implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "created_at")
    private Instant createdAt;

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

    public Long getId() {
        return this.id;
    }

    public UserFavoriteLesson id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreatedAt() {
        return this.createdAt;
    }

    public UserFavoriteLesson createdAt(Instant createdAt) {
        this.setCreatedAt(createdAt);
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public AppUser getAppUser() {
        return this.appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public UserFavoriteLesson appUser(AppUser appUser) {
        this.setAppUser(appUser);
        return this;
    }

    public Lesson getLesson() {
        return this.lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public UserFavoriteLesson lesson(Lesson lesson) {
        this.setLesson(lesson);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserFavoriteLesson)) {
            return false;
        }
        return id != null && id.equals(((UserFavoriteLesson) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "UserFavoriteLesson{" + "id=" + getId() + ", createdAt='" + getCreatedAt() + "'" + "}";
    }
}
