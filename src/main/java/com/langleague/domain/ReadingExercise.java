package com.langleague.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ReadingExercise.
 */
@Entity
@Table(name = "reading_exercise")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ReadingExercise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Lob
    @Column(name = "passage")
    private String passage;

    @Lob
    @Column(name = "question")
    private String question;

    @Lob
    @Column(name = "options")
    private String options;

    @Size(max = 255)
    @Column(name = "correct_answer", length = 255)
    private String correctAnswer;

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

    public ReadingExercise id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassage() {
        return this.passage;
    }

    public ReadingExercise passage(String passage) {
        this.setPassage(passage);
        return this;
    }

    public void setPassage(String passage) {
        this.passage = passage;
    }

    public String getQuestion() {
        return this.question;
    }

    public ReadingExercise question(String question) {
        this.setQuestion(question);
        return this;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getOptions() {
        return this.options;
    }

    public ReadingExercise options(String options) {
        this.setOptions(options);
        return this;
    }

    public void setOptions(String options) {
        this.options = options;
    }

    public String getCorrectAnswer() {
        return this.correctAnswer;
    }

    public ReadingExercise correctAnswer(String correctAnswer) {
        this.setCorrectAnswer(correctAnswer);
        return this;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public LessonSkill getLessonSkill() {
        return this.lessonSkill;
    }

    public void setLessonSkill(LessonSkill lessonSkill) {
        this.lessonSkill = lessonSkill;
    }

    public ReadingExercise lessonSkill(LessonSkill lessonSkill) {
        this.setLessonSkill(lessonSkill);
        return this;
    }

    public Lesson getLesson() {
        return this.lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public ReadingExercise lesson(Lesson lesson) {
        this.setLesson(lesson);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReadingExercise)) {
            return false;
        }
        return getId() != null && getId().equals(((ReadingExercise) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ReadingExercise{" +
            "id=" + getId() +
            ", passage='" + getPassage() + "'" +
            ", question='" + getQuestion() + "'" +
            ", options='" + getOptions() + "'" +
            ", correctAnswer='" + getCorrectAnswer() + "'" +
            "}";
    }
}
