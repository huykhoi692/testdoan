package com.langleague.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.langleague.domain.SpeakingTopic} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SpeakingTopicDTO implements Serializable {

    private Long id;

    private String context;

    private String imageUrl;

    private ChapterDTO chapter;

    @JsonIgnoreProperties(value = { "speakingTopic", "chapter" }, allowSetters = true)
    private Set<SpeakingExerciseDTO> speakingExercises = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public ChapterDTO getChapter() {
        return chapter;
    }

    public void setChapter(ChapterDTO chapter) {
        this.chapter = chapter;
    }

    public Set<SpeakingExerciseDTO> getSpeakingExercises() {
        return speakingExercises;
    }

    public void setSpeakingExercises(Set<SpeakingExerciseDTO> speakingExercises) {
        this.speakingExercises = speakingExercises;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SpeakingTopicDTO)) {
            return false;
        }

        SpeakingTopicDTO speakingTopicDTO = (SpeakingTopicDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, speakingTopicDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    @Override
    public String toString() {
        return "SpeakingTopicDTO{" + "id=" + getId() + ", context='" + getContext() + "'" + ", imageUrl='" + getImageUrl() + "'" + "}";
    }
}
