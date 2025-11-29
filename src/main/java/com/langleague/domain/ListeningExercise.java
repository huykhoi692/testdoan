package com.langleague.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ListeningExercise.
 */
@Entity
@Table(name = "listening_exercise")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ListeningExercise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(max = 512)
    @Column(name = "audio_path", length = 512)
    private String audioPath;

    @Lob
    @Column(name = "transcript")
    private String transcript;

    @Lob
    @Column(name = "question")
    private String question;

    @Size(max = 255)
    @Column(name = "option_a", length = 255)
    private String optionA;

    @Size(max = 255)
    @Column(name = "option_b", length = 255)
    private String optionB;

    @Size(max = 255)
    @Column(name = "option_c", length = 255)
    private String optionC;

    @Size(max = 255)
    @Column(name = "correct_option", length = 255)
    private String correctOption;

    @Column(name = "chart")
    private Integer chart;

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

    public ListeningExercise id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAudioPath() {
        return this.audioPath;
    }

    public ListeningExercise audioPath(String audioPath) {
        this.setAudioPath(audioPath);
        return this;
    }

    public void setAudioPath(String audioPath) {
        this.audioPath = audioPath;
    }

    public String getTranscript() {
        return this.transcript;
    }

    public ListeningExercise transcript(String transcript) {
        this.setTranscript(transcript);
        return this;
    }

    public void setTranscript(String transcript) {
        this.transcript = transcript;
    }

    public String getQuestion() {
        return this.question;
    }

    public ListeningExercise question(String question) {
        this.setQuestion(question);
        return this;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getOptionA() {
        return this.optionA;
    }

    public ListeningExercise optionA(String optionA) {
        this.setOptionA(optionA);
        return this;
    }

    public void setOptionA(String optionA) {
        this.optionA = optionA;
    }

    public String getOptionB() {
        return this.optionB;
    }

    public ListeningExercise optionB(String optionB) {
        this.setOptionB(optionB);
        return this;
    }

    public void setOptionB(String optionB) {
        this.optionB = optionB;
    }

    public String getOptionC() {
        return this.optionC;
    }

    public ListeningExercise optionC(String optionC) {
        this.setOptionC(optionC);
        return this;
    }

    public void setOptionC(String optionC) {
        this.optionC = optionC;
    }

    public String getCorrectOption() {
        return this.correctOption;
    }

    public ListeningExercise correctOption(String correctOption) {
        this.setCorrectOption(correctOption);
        return this;
    }

    public void setCorrectOption(String correctOption) {
        this.correctOption = correctOption;
    }

    public Integer getChart() {
        return this.chart;
    }

    public ListeningExercise chart(Integer chart) {
        this.setChart(chart);
        return this;
    }

    public void setChart(Integer chart) {
        this.chart = chart;
    }

    public LessonSkill getLessonSkill() {
        return this.lessonSkill;
    }

    public void setLessonSkill(LessonSkill lessonSkill) {
        this.lessonSkill = lessonSkill;
    }

    public ListeningExercise lessonSkill(LessonSkill lessonSkill) {
        this.setLessonSkill(lessonSkill);
        return this;
    }

    public Lesson getLesson() {
        return this.lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public ListeningExercise lesson(Lesson lesson) {
        this.setLesson(lesson);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ListeningExercise)) {
            return false;
        }
        return getId() != null && getId().equals(((ListeningExercise) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ListeningExercise{" +
            "id=" + getId() +
            ", audioPath='" + getAudioPath() + "'" +
            ", transcript='" + getTranscript() + "'" +
            ", question='" + getQuestion() + "'" +
            ", optionA='" + getOptionA() + "'" +
            ", optionB='" + getOptionB() + "'" +
            ", optionC='" + getOptionC() + "'" +
            ", correctOption='" + getCorrectOption() + "'" +
            ", chart=" + getChart() +
            "}";
    }
}
