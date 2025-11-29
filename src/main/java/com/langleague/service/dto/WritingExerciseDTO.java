package com.langleague.service.dto;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.langleague.domain.WritingExercise} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WritingExerciseDTO implements Serializable {

    private Long id;

    @Lob
    private String prompt;

    @Size(max = 255)
    private String wordLimit;

    private Integer maxLength;

    @Lob
    private String sampleAnswer;

    private LessonSkillDTO lessonSkill;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getWordLimit() {
        return wordLimit;
    }

    public void setWordLimit(String wordLimit) {
        this.wordLimit = wordLimit;
    }

    public Integer getMaxLength() {
        return maxLength;
    }

    public void setMaxLength(Integer maxLength) {
        this.maxLength = maxLength;
    }

    public String getSampleAnswer() {
        return sampleAnswer;
    }

    public void setSampleAnswer(String sampleAnswer) {
        this.sampleAnswer = sampleAnswer;
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
        if (!(o instanceof WritingExerciseDTO)) {
            return false;
        }

        WritingExerciseDTO writingExerciseDTO = (WritingExerciseDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, writingExerciseDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WritingExerciseDTO{" +
            "id=" + getId() +
            ", prompt='" + getPrompt() + "'" +
            ", wordLimit='" + getWordLimit() + "'" +
            ", maxLength=" + getMaxLength() +
            ", sampleAnswer='" + getSampleAnswer() + "'" +
            ", lessonSkill=" + getLessonSkill() +
            "}";
    }
}
