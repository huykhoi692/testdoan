package com.langleague.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.langleague.domain.WritingTask} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WritingTaskDTO implements Serializable {

    private Long id;

    @NotNull
    private String prompt;

    private String imageUrl;

    private ChapterDTO chapter;

    @JsonIgnoreProperties(value = { "writingTask", "chapter" }, allowSetters = true)
    private Set<WritingExerciseDTO> writingExercises = new HashSet<>();

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

    public Set<WritingExerciseDTO> getWritingExercises() {
        return writingExercises;
    }

    public void setWritingExercises(Set<WritingExerciseDTO> writingExercises) {
        this.writingExercises = writingExercises;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WritingTaskDTO)) {
            return false;
        }

        WritingTaskDTO writingTaskDTO = (WritingTaskDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, writingTaskDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    @Override
    public String toString() {
        return "WritingTaskDTO{" + "id=" + getId() + ", prompt='" + getPrompt() + "'" + ", imageUrl='" + getImageUrl() + "'" + "}";
    }
}
