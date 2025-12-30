package com.langleague.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.langleague.domain.ListeningAudio} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ListeningAudioDTO implements Serializable {

    private Long id;

    @NotNull
    private String audioUrl;

    private String transcript;

    private ChapterDTO chapter;

    @JsonIgnoreProperties(value = { "listeningAudio", "chapter" }, allowSetters = true)
    private Set<ListeningExerciseDTO> listeningExercises = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAudioUrl() {
        return audioUrl;
    }

    public void setAudioUrl(String audioUrl) {
        this.audioUrl = audioUrl;
    }

    public String getTranscript() {
        return transcript;
    }

    public void setTranscript(String transcript) {
        this.transcript = transcript;
    }

    public ChapterDTO getChapter() {
        return chapter;
    }

    public void setChapter(ChapterDTO chapter) {
        this.chapter = chapter;
    }

    public Set<ListeningExerciseDTO> getListeningExercises() {
        return listeningExercises;
    }

    public void setListeningExercises(Set<ListeningExerciseDTO> listeningExercises) {
        this.listeningExercises = listeningExercises;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ListeningAudioDTO)) {
            return false;
        }

        ListeningAudioDTO listeningAudioDTO = (ListeningAudioDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, listeningAudioDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    @Override
    public String toString() {
        return (
            "ListeningAudioDTO{" + "id=" + getId() + ", audioUrl='" + getAudioUrl() + "'" + ", transcript='" + getTranscript() + "'" + "}"
        );
    }
}
