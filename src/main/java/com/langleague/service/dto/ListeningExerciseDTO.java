package com.langleague.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.langleague.domain.ListeningExercise} entity.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ListeningExerciseDTO implements Serializable {

    private Long id;

    @JsonIgnoreProperties(value = { "listeningExercises", "chapter" }, allowSetters = true)
    private ListeningAudioDTO listeningAudio;

    @Size(max = 512)
    private String imageUrl;

    @Size(max = 5000, message = "Question cannot exceed 5000 characters")
    private String question;

    @Size(max = 255)
    private String correctAnswer;

    @NotNull
    private Integer maxScore;

    private java.util.Set<ListeningOptionDTO> options = new java.util.HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ListeningAudioDTO getListeningAudio() {
        return listeningAudio;
    }

    public void setListeningAudio(ListeningAudioDTO listeningAudio) {
        this.listeningAudio = listeningAudio;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public Integer getMaxScore() {
        return maxScore;
    }

    public void setMaxScore(Integer maxScore) {
        this.maxScore = maxScore;
    }

    public java.util.Set<ListeningOptionDTO> getOptions() {
        return options;
    }

    public void setOptions(java.util.Set<ListeningOptionDTO> options) {
        this.options = options;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ListeningExerciseDTO)) {
            return false;
        }

        ListeningExerciseDTO listeningExerciseDTO = (ListeningExerciseDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, listeningExerciseDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ListeningExerciseDTO{" +
            "id=" + getId() +
            ", listeningAudio=" + getListeningAudio() +
            ", imageUrl='" + getImageUrl() + "'" +
            ", question='" + getQuestion() + "'" +
            ", correctAnswer='" + getCorrectAnswer() + "'" +
            ", maxScore=" + getMaxScore() +
            "}";
    }
}
