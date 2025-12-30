package com.langleague.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.langleague.domain.WritingExercise} entity.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WritingExerciseDTO implements Serializable {

    private Long id;

    @Size(max = 10000, message = "Sample answer cannot exceed 10000 characters")
    private String sampleAnswer;

    @NotNull
    private Integer maxScore;

    @JsonIgnoreProperties(value = { "writingExercises", "chapter" }, allowSetters = true)
    private WritingTaskDTO writingTask;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public WritingTaskDTO getWritingTask() {
        return writingTask;
    }

    public void setWritingTask(WritingTaskDTO writingTask) {
        this.writingTask = writingTask;
    }

    public String getSampleAnswer() {
        return sampleAnswer;
    }

    public void setSampleAnswer(String sampleAnswer) {
        this.sampleAnswer = sampleAnswer;
    }

    public Integer getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(Integer maxScore) {
        this.maxScore = maxScore;
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
            ", writingTask=" + getWritingTask() +
            ", sampleAnswer='" + getSampleAnswer() + "'" +
            ", maxScore=" + getMaxScore() +
            "}";
    }
}
