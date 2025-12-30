package com.langleague.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.langleague.domain.SpeakingExercise} entity.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SpeakingExerciseDTO implements Serializable {

    private Long id;

    @JsonIgnoreProperties(value = { "speakingExercises", "chapter" }, allowSetters = true)
    private SpeakingTopicDTO speakingTopic;

    @Size(max = 512)
    private String sampleAudio;

    @NotNull
    private Integer maxScore;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SpeakingTopicDTO getSpeakingTopic() {
        return speakingTopic;
    }

    public void setSpeakingTopic(SpeakingTopicDTO speakingTopic) {
        this.speakingTopic = speakingTopic;
    }

    public String getSampleAudio() {
        return sampleAudio;
    }

    public void setSampleAudio(String sampleAudio) {
        this.sampleAudio = sampleAudio;
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
        if (!(o instanceof SpeakingExerciseDTO)) {
            return false;
        }

        SpeakingExerciseDTO speakingExerciseDTO = (SpeakingExerciseDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, speakingExerciseDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SpeakingExerciseDTO{" +
            "id=" + getId() +
            ", sampleAudio='" + getSampleAudio() + "'" +
            ", maxScore=" + getMaxScore() +
            "}";
    }
}
