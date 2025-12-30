package com.langleague.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A SpeakingExercise.
 */
@Entity
@Table(name = "speaking_exercise")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SpeakingExercise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "speakingExercises" }, allowSetters = true)
    private SpeakingTopic speakingTopic;

    @Size(max = 512)
    @Column(name = "sample_audio", length = 512)
    private String sampleAudio;

    @NotNull
    @Column(name = "max_score", nullable = false)
    private Integer maxScore;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "speakingExercise")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = { "appUser", "listeningExercise", "speakingExercise", "readingExercise", "writingExercise" },
        allowSetters = true
    )
    private Set<ExerciseResult> exerciseResults = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public SpeakingExercise id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SpeakingTopic getSpeakingTopic() {
        return this.speakingTopic;
    }

    public SpeakingExercise speakingTopic(SpeakingTopic speakingTopic) {
        this.setSpeakingTopic(speakingTopic);
        return this;
    }

    public void setSpeakingTopic(SpeakingTopic speakingTopic) {
        this.speakingTopic = speakingTopic;
    }

    public String getSampleAudio() {
        return this.sampleAudio;
    }

    public SpeakingExercise sampleAudio(String sampleAudio) {
        this.setSampleAudio(sampleAudio);
        return this;
    }

    public void setSampleAudio(String sampleAudio) {
        this.sampleAudio = sampleAudio;
    }

    public Integer getMaxScore() {
        return this.maxScore;
    }

    public SpeakingExercise maxScore(Integer maxScore) {
        this.setMaxScore(maxScore);
        return this;
    }

    public void setMaxScore(Integer maxScore) {
        this.maxScore = maxScore;
    }

    public Set<ExerciseResult> getExerciseResults() {
        return this.exerciseResults;
    }

    public void setExerciseResults(Set<ExerciseResult> exerciseResults) {
        if (this.exerciseResults != null) {
            this.exerciseResults.forEach(i -> i.setSpeakingExercise(null));
        }
        if (exerciseResults != null) {
            exerciseResults.forEach(i -> i.setSpeakingExercise(this));
        }
        this.exerciseResults = exerciseResults;
    }

    public SpeakingExercise exerciseResults(Set<ExerciseResult> exerciseResults) {
        this.setExerciseResults(exerciseResults);
        return this;
    }

    public SpeakingExercise addExerciseResult(ExerciseResult exerciseResult) {
        this.exerciseResults.add(exerciseResult);
        exerciseResult.setSpeakingExercise(this);
        return this;
    }

    public SpeakingExercise removeExerciseResult(ExerciseResult exerciseResult) {
        this.exerciseResults.remove(exerciseResult);
        exerciseResult.setSpeakingExercise(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SpeakingExercise)) {
            return false;
        }
        return getId() != null && getId().equals(((SpeakingExercise) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SpeakingExercise{" +
            "id=" + getId() +
            ", sampleAudio='" + getSampleAudio() + "'" +
            ", maxScore=" + getMaxScore() +
            "}";
    }
}
