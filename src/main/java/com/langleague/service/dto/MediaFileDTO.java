package com.langleague.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.langleague.domain.MediaFile} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MediaFileDTO implements Serializable {

    private Long id;

    @Size(max = 255)
    private String fileName;

    @Size(max = 50)
    private String fileType;

    @Size(max = 512)
    private String url;

    private LessonDTO lesson;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public LessonDTO getLesson() {
        return lesson;
    }

    public void setLesson(LessonDTO lesson) {
        this.lesson = lesson;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MediaFileDTO)) {
            return false;
        }

        MediaFileDTO mediaFileDTO = (MediaFileDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, mediaFileDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MediaFileDTO{" +
            "id=" + getId() +
            ", fileName='" + getFileName() + "'" +
            ", fileType='" + getFileType() + "'" +
            ", url='" + getUrl() + "'" +
            ", lesson=" + getLesson() +
            "}";
    }
}
