package com.langleague.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ExerciseResult.
 */
@Entity
@Table(name = "exercise_result")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ExerciseResult implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(max = 50)
    @Column(name = "exercise_type", length = 50)
    private String exerciseType;

    @Column(name = "score")
    private Integer score;

    @Lob
    @Column(name = "answer")
    private String answer;

    @Size(max = 512)
    @Column(name = "audio_path", length = 512)
    private String audioPath;

    @Column(name = "submitted_at")
    private Instant submittedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(
        value = {
            "comments", "exerciseResults", "userProgresses", "userVocabularies", "userAchievements", "learningStreaks", "studySessions",
        },
        allowSetters = true
    )
    private AppUser appUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "lessonSkills", "exerciseResults" }, allowSetters = true)
    private Skill skill;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ExerciseResult id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExerciseType() {
        return this.exerciseType;
    }

    public ExerciseResult exerciseType(String exerciseType) {
        this.setExerciseType(exerciseType);
        return this;
    }

    public void setExerciseType(String exerciseType) {
        this.exerciseType = exerciseType;
    }

    public Integer getScore() {
        return this.score;
    }

    public ExerciseResult score(Integer score) {
        this.setScore(score);
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getAnswer() {
        return this.answer;
    }

    public ExerciseResult answer(String answer) {
        this.setAnswer(answer);
        return this;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getAudioPath() {
        return this.audioPath;
    }

    public ExerciseResult audioPath(String audioPath) {
        this.setAudioPath(audioPath);
        return this;
    }

    public void setAudioPath(String audioPath) {
        this.audioPath = audioPath;
    }

    public Instant getSubmittedAt() {
        return this.submittedAt;
    }

    public ExerciseResult submittedAt(Instant submittedAt) {
        this.setSubmittedAt(submittedAt);
        return this;
    }

    public void setSubmittedAt(Instant submittedAt) {
        this.submittedAt = submittedAt;
    }

    public AppUser getAppUser() {
        return this.appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public ExerciseResult appUser(AppUser appUser) {
        this.setAppUser(appUser);
        return this;
    }

    public Skill getSkill() {
        return this.skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    public ExerciseResult skill(Skill skill) {
        this.setSkill(skill);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExerciseResult)) {
            return false;
        }
        return getId() != null && getId().equals(((ExerciseResult) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ExerciseResult{" +
            "id=" + getId() +
            ", exerciseType='" + getExerciseType() + "'" +
            ", score=" + getScore() +
            ", answer='" + getAnswer() + "'" +
            ", audioPath='" + getAudioPath() + "'" +
            ", submittedAt='" + getSubmittedAt() + "'" +
            "}";
    }
}
