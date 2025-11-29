package com.langleague.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
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

    @Lob
    @Column(name = "prompt")
    private String prompt;

    @Size(max = 255)
    @Column(name = "word_limit", length = 255)
    private String wordLimit;

    @Column(name = "max_length")
    private Integer maxLength;

    @Lob
    @Column(name = "sample_answer")
    private String sampleAnswer;

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

    public WritingExercise id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrompt() {
        return this.prompt;
    }

    public WritingExercise prompt(String prompt) {
        this.setPrompt(prompt);
        return this;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getWordLimit() {
        return this.wordLimit;
    }

    public WritingExercise wordLimit(String wordLimit) {
        this.setWordLimit(wordLimit);
        return this;
    }

    public void setWordLimit(String wordLimit) {
        this.wordLimit = wordLimit;
    }

    public Integer getMaxLength() {
        return this.maxLength;
    }

    public WritingExercise maxLength(Integer maxLength) {
        this.setMaxLength(maxLength);
        return this;
    }

    public void setMaxLength(Integer maxLength) {
        this.maxLength = maxLength;
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

    public LessonSkill getLessonSkill() {
        return this.lessonSkill;
    }

    public void setLessonSkill(LessonSkill lessonSkill) {
        this.lessonSkill = lessonSkill;
    }

    public WritingExercise lessonSkill(LessonSkill lessonSkill) {
        this.setLessonSkill(lessonSkill);
        return this;
    }

    public Lesson getLesson() {
        return this.lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public WritingExercise lesson(Lesson lesson) {
        this.setLesson(lesson);
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
            ", prompt='" + getPrompt() + "'" +
            ", wordLimit='" + getWordLimit() + "'" +
            ", maxLength=" + getMaxLength() +
            ", sampleAnswer='" + getSampleAnswer() + "'" +
            "}";
    }
}
