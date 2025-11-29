package com.langleague.service.dto;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.langleague.domain.ReadingExercise} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ReadingExerciseDTO implements Serializable {

    private Long id;

    @Lob
    private String passage;

    @Lob
    private String question;

    @Lob
    private String options;

    @Size(max = 255)
    private String correctAnswer;

    private LessonSkillDTO lessonSkill;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassage() {
        return passage;
    }

    public void setPassage(String passage) {
        this.passage = passage;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getOptions() {
        return options;
    }

    public void setOptions(String options) {
        this.options = options;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public LessonSkillDTO getLessonSkill() {
        return lessonSkill;
    }

    public void setLessonSkill(LessonSkillDTO lessonSkill) {
        this.lessonSkill = lessonSkill;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReadingExerciseDTO)) {
            return false;
        }

        ReadingExerciseDTO readingExerciseDTO = (ReadingExerciseDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, readingExerciseDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ReadingExerciseDTO{" +
            "id=" + getId() +
            ", passage='" + getPassage() + "'" +
            ", question='" + getQuestion() + "'" +
            ", options='" + getOptions() + "'" +
            ", correctAnswer='" + getCorrectAnswer() + "'" +
            ", lessonSkill=" + getLessonSkill() +
            "}";
    }
}
