package com.langleague.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.langleague.domain.ReadingPassage} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ReadingPassageDTO implements Serializable {

    private Long id;

    @NotNull
    private String content;

    private String title;

    private ChapterDTO chapter;

    @JsonIgnoreProperties(value = { "readingPassage", "chapter" }, allowSetters = true)
    private Set<ReadingExerciseDTO> readingExercises = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ChapterDTO getChapter() {
        return chapter;
    }

    public void setChapter(ChapterDTO chapter) {
        this.chapter = chapter;
    }

    public Set<ReadingExerciseDTO> getReadingExercises() {
        return readingExercises;
    }

    public void setReadingExercises(Set<ReadingExerciseDTO> readingExercises) {
        this.readingExercises = readingExercises;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReadingPassageDTO)) {
            return false;
        }

        ReadingPassageDTO readingPassageDTO = (ReadingPassageDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, readingPassageDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    @Override
    public String toString() {
        return "ReadingPassageDTO{" + "id=" + getId() + ", content='" + getContent() + "'" + ", title='" + getTitle() + "'" + "}";
    }
}
