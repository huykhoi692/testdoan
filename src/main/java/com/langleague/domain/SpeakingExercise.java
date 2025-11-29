package com.langleague.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
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

    @Lob
    @Column(name = "prompt")
    private String prompt;

    @Size(max = 512)
    @Column(name = "sample_audio", length = 512)
    private String sampleAudio;

    @Size(max = 255)
    @Column(name = "target_phrase", length = 255)
    private String targetPhrase;

    @Size(max = 255)
    @Column(name = "evaluation_method", length = 255)
    private String evaluationMethod;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(
        value = { "listeningExercises", "speakingExercises", "readingExercises", "writingExercises", "lesson", "skill" },
        allowSetters = true
    )
    private LessonSkill lessonSkill;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

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

    public String getPrompt() {
        return this.prompt;
    }

    public SpeakingExercise prompt(String prompt) {
        this.setPrompt(prompt);
        return this;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
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

    public String getTargetPhrase() {
        return this.targetPhrase;
    }

    public SpeakingExercise targetPhrase(String targetPhrase) {
        this.setTargetPhrase(targetPhrase);
        return this;
    }

    public void setTargetPhrase(String targetPhrase) {
        this.targetPhrase = targetPhrase;
    }

    public String getEvaluationMethod() {
        return this.evaluationMethod;
    }

    public SpeakingExercise evaluationMethod(String evaluationMethod) {
        this.setEvaluationMethod(evaluationMethod);
        return this;
    }

    public void setEvaluationMethod(String evaluationMethod) {
        this.evaluationMethod = evaluationMethod;
    }

    public LessonSkill getLessonSkill() {
        return this.lessonSkill;
    }

    public void setLessonSkill(LessonSkill lessonSkill) {
        this.lessonSkill = lessonSkill;
    }

    public SpeakingExercise lessonSkill(LessonSkill lessonSkill) {
        this.setLessonSkill(lessonSkill);
        return this;
    }

    public Lesson getLesson() {
        return this.lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public SpeakingExercise lesson(Lesson lesson) {
        this.setLesson(lesson);
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
            ", prompt='" + getPrompt() + "'" +
            ", sampleAudio='" + getSampleAudio() + "'" +
            ", targetPhrase='" + getTargetPhrase() + "'" +
            ", evaluationMethod='" + getEvaluationMethod() + "'" +
            "}";
    }
}
