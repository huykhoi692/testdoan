package com.langleague.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.langleague.domain.LessonWord} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LessonWordDTO implements Serializable {

    private Long id;

    private LessonDTO lesson;

    private WordDTO word;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LessonDTO getLesson() {
        return lesson;
    }

    public void setLesson(LessonDTO lesson) {
        this.lesson = lesson;
    }

    public WordDTO getWord() {
        return word;
    }

    public void setWord(WordDTO word) {
        this.word = word;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LessonWordDTO)) {
            return false;
        }

        LessonWordDTO lessonWordDTO = (LessonWordDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, lessonWordDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LessonWordDTO{" +
            "id=" + getId() +
            ", lesson=" + getLesson() +
            ", word=" + getWord() +
            "}";
    }
}
