package com.langleague.service.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

public class LessonDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String title;

    private String description;

    @NotNull
    @Size(max = 50)
    private String level;

    private Integer estimatedMinutes;

    private String thumbnail;

    @NotNull
    private Long chapterId;

    private String chapterTitle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public Integer getEstimatedMinutes() {
        return estimatedMinutes;
    }

    public void setEstimatedMinutes(Integer estimatedMinutes) {
        this.estimatedMinutes = estimatedMinutes;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Long getChapterId() {
        return chapterId;
    }

    public void setChapterId(Long chapterId) {
        this.chapterId = chapterId;
    }

    public String getChapterTitle() {
        return chapterTitle;
    }

    public void setChapterTitle(String chapterTitle) {
        this.chapterTitle = chapterTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LessonDTO)) return false;
        LessonDTO lessonDTO = (LessonDTO) o;
        return Objects.equals(id, lessonDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return (
            "LessonDTO{" +
            "id=" +
            id +
            ", title='" +
            title +
            '\'' +
            ", description='" +
            description +
            '\'' +
            ", level='" +
            level +
            '\'' +
            ", estimatedMinutes=" +
            estimatedMinutes +
            ", thumbnail='" +
            thumbnail +
            '\'' +
            ", chapterId=" +
            chapterId +
            ", chapterTitle='" +
            chapterTitle +
            '\'' +
            '}'
        );
    }
}
