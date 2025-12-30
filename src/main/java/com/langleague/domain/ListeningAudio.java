package com.langleague.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ListeningAudio.
 */
@Entity
@Table(name = "listening_audio")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ListeningAudio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "audio_url", nullable = false)
    private String audioUrl;

    @Lob
    @Column(name = "transcript")
    private String transcript;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "listeningAudios" }, allowSetters = true)
    private Chapter chapter;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "listeningAudio")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "listeningAudio", "options", "exerciseResults", "chapter" }, allowSetters = true)
    private Set<ListeningExercise> listeningExercises = new HashSet<>();

    public Long getId() {
        return this.id;
    }

    public ListeningAudio id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAudioUrl() {
        return this.audioUrl;
    }

    public ListeningAudio audioUrl(String audioUrl) {
        this.setAudioUrl(audioUrl);
        return this;
    }

    public void setAudioUrl(String audioUrl) {
        this.audioUrl = audioUrl;
    }

    public String getTranscript() {
        return this.transcript;
    }

    public ListeningAudio transcript(String transcript) {
        this.setTranscript(transcript);
        return this;
    }

    public void setTranscript(String transcript) {
        this.transcript = transcript;
    }

    public Chapter getChapter() {
        return this.chapter;
    }

    public ListeningAudio chapter(Chapter chapter) {
        this.setChapter(chapter);
        return this;
    }

    public void setChapter(Chapter chapter) {
        this.chapter = chapter;
    }

    public Set<ListeningExercise> getListeningExercises() {
        return this.listeningExercises;
    }

    public void setListeningExercises(Set<ListeningExercise> listeningExercises) {
        if (this.listeningExercises != null) {
            this.listeningExercises.forEach(i -> i.setListeningAudio(null));
        }
        if (listeningExercises != null) {
            listeningExercises.forEach(i -> i.setListeningAudio(this));
        }
        this.listeningExercises = listeningExercises;
    }

    public ListeningAudio listeningExercises(Set<ListeningExercise> listeningExercises) {
        this.setListeningExercises(listeningExercises);
        return this;
    }

    public ListeningAudio addListeningExercise(ListeningExercise listeningExercise) {
        this.listeningExercises.add(listeningExercise);
        listeningExercise.setListeningAudio(this);
        return this;
    }

    public ListeningAudio removeListeningExercise(ListeningExercise listeningExercise) {
        this.listeningExercises.remove(listeningExercise);
        listeningExercise.setListeningAudio(null);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ListeningAudio)) {
            return false;
        }
        return id != null && id.equals(((ListeningAudio) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "ListeningAudio{" + "id=" + getId() + ", audioUrl='" + getAudioUrl() + "'" + ", transcript='" + getTranscript() + "'" + "}";
    }
}
