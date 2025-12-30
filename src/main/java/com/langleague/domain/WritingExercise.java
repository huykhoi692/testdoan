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
 * A WritingExercise.
 */
@Entity
@Table(name = "writing_exercise")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WritingExercise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "writingExercises" }, allowSetters = true)
    private WritingTask writingTask;

    @Lob
    @Column(name = "sample_answer")
    private String sampleAnswer;

    @NotNull
    @Column(name = "max_score", nullable = false)
    private Integer maxScore;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "writingExercise")
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

    public WritingExercise id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public WritingTask getWritingTask() {
        return this.writingTask;
    }

    public WritingExercise writingTask(WritingTask writingTask) {
        this.setWritingTask(writingTask);
        return this;
    }

    public void setWritingTask(WritingTask writingTask) {
        this.writingTask = writingTask;
    }

    public String getSampleAnswer() {
        return this.sampleAnswer;
    }

    public WritingExercise sampleAnswer(String sampleAnswer) {
        this.setSampleAnswer(sampleAnswer);
        return this;
    }

    public void setSampleAnswer(String sampleAnswer) {
        this.sampleAnswer = sampleAnswer;
    }

    public Integer getMaxScore() {
        return this.maxScore;
    }

    public WritingExercise maxScore(Integer maxScore) {
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
            this.exerciseResults.forEach(i -> i.setWritingExercise(null));
        }
        if (exerciseResults != null) {
            exerciseResults.forEach(i -> i.setWritingExercise(this));
        }
        this.exerciseResults = exerciseResults;
    }

    public WritingExercise exerciseResults(Set<ExerciseResult> exerciseResults) {
        this.setExerciseResults(exerciseResults);
        return this;
    }

    public WritingExercise addExerciseResult(ExerciseResult exerciseResult) {
        this.exerciseResults.add(exerciseResult);
        exerciseResult.setWritingExercise(this);
        return this;
    }

    public WritingExercise removeExerciseResult(ExerciseResult exerciseResult) {
        this.exerciseResults.remove(exerciseResult);
        exerciseResult.setWritingExercise(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WritingExercise)) {
            return false;
        }
        return getId() != null && getId().equals(((WritingExercise) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WritingExercise{" +
            "id=" + getId() +
            ", sampleAnswer='" + getSampleAnswer() + "'" +
            ", maxScore=" + getMaxScore() +
            "}";
    }
}
