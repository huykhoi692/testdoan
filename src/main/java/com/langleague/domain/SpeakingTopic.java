package com.langleague.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A SpeakingTopic.
 */
@Entity
@Table(name = "speaking_topic")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SpeakingTopic implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Lob
    @Column(name = "context")
    private String context;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "speakingTopics" }, allowSetters = true)
    private Chapter chapter;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "speakingTopic")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "speakingTopic", "exerciseResults", "chapter" }, allowSetters = true)
    private Set<SpeakingExercise> speakingExercises = new HashSet<>();

    public Long getId() {
        return this.id;
    }

    public SpeakingTopic id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContext() {
        return this.context;
    }

    public SpeakingTopic context(String context) {
        this.setContext(context);
        return this;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public SpeakingTopic imageUrl(String imageUrl) {
        this.setImageUrl(imageUrl);
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Chapter getChapter() {
        return this.chapter;
    }

    public SpeakingTopic chapter(Chapter chapter) {
        this.setChapter(chapter);
        return this;
    }

    public void setChapter(Chapter chapter) {
        this.chapter = chapter;
    }

    public Set<SpeakingExercise> getSpeakingExercises() {
        return this.speakingExercises;
    }

    public void setSpeakingExercises(Set<SpeakingExercise> speakingExercises) {
        if (this.speakingExercises != null) {
            this.speakingExercises.forEach(i -> i.setSpeakingTopic(null));
        }
        if (speakingExercises != null) {
            speakingExercises.forEach(i -> i.setSpeakingTopic(this));
        }
        this.speakingExercises = speakingExercises;
    }

    public SpeakingTopic speakingExercises(Set<SpeakingExercise> speakingExercises) {
        this.setSpeakingExercises(speakingExercises);
        return this;
    }

    public SpeakingTopic addSpeakingExercise(SpeakingExercise speakingExercise) {
        this.speakingExercises.add(speakingExercise);
        speakingExercise.setSpeakingTopic(this);
        return this;
    }

    public SpeakingTopic removeSpeakingExercise(SpeakingExercise speakingExercise) {
        this.speakingExercises.remove(speakingExercise);
        speakingExercise.setSpeakingTopic(null);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SpeakingTopic)) {
            return false;
        }
        return id != null && id.equals(((SpeakingTopic) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "SpeakingTopic{" + "id=" + getId() + ", context='" + getContext() + "'" + ", imageUrl='" + getImageUrl() + "'" + "}";
    }
}
