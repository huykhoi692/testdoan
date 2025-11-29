package com.langleague.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A UserVocabulary.
 */
@Entity
@Table(name = "user_vocabulary")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UserVocabulary implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "remembered")
    private Boolean remembered;

    @Column(name = "is_memorized")
    private Boolean isMemorized;

    @Column(name = "last_reviewed")
    private Instant lastReviewed;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "wordExamples", "userVocabularies", "lessonWords" }, allowSetters = true)
    private Word word;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public UserVocabulary id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getRemembered() {
        return this.remembered;
    }

    public UserVocabulary remembered(Boolean remembered) {
        this.setRemembered(remembered);
        return this;
    }

    public void setRemembered(Boolean remembered) {
        this.remembered = remembered;
    }

    public Boolean getIsMemorized() {
        return this.isMemorized;
    }

    public UserVocabulary isMemorized(Boolean isMemorized) {
        this.setIsMemorized(isMemorized);
        return this;
    }

    public void setIsMemorized(Boolean isMemorized) {
        this.isMemorized = isMemorized;
    }

    public Instant getLastReviewed() {
        return this.lastReviewed;
    }

    public UserVocabulary lastReviewed(Instant lastReviewed) {
        this.setLastReviewed(lastReviewed);
        return this;
    }

    public void setLastReviewed(Instant lastReviewed) {
        this.lastReviewed = lastReviewed;
    }

    public AppUser getAppUser() {
        return this.appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public UserVocabulary appUser(AppUser appUser) {
        this.setAppUser(appUser);
        return this;
    }

    public Lesson getLesson() {
        return this.lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public UserVocabulary lesson(Lesson lesson) {
        this.setLesson(lesson);
        return this;
    }

    public Word getWord() {
        return this.word;
    }

    public void setWord(Word word) {
        this.word = word;
    }

    public UserVocabulary word(Word word) {
        this.setWord(word);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserVocabulary)) {
            return false;
        }
        return getId() != null && getId().equals(((UserVocabulary) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserVocabulary{" +
            "id=" + getId() +
            ", remembered='" + getRemembered() + "'" +
            ", isMemorized='" + getIsMemorized() + "'" +
            ", lastReviewed='" + getLastReviewed() + "'" +
            "}";
    }
}
