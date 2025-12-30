package com.langleague.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A WritingTask.
 */
@Entity
@Table(name = "writing_task")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WritingTask implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Lob
    @Column(name = "prompt", nullable = false)
    private String prompt;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "writingTasks" }, allowSetters = true)
    private Chapter chapter;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "writingTask")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "writingTask", "exerciseResults", "chapter" }, allowSetters = true)
    private Set<WritingExercise> writingExercises = new HashSet<>();

    public Long getId() {
        return this.id;
    }

    public WritingTask id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrompt() {
        return this.prompt;
    }

    public WritingTask prompt(String prompt) {
        this.setPrompt(prompt);
        return this;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public WritingTask imageUrl(String imageUrl) {
        this.setImageUrl(imageUrl);
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Chapter getChapter() {
        return this.chapter;
    }

    public WritingTask chapter(Chapter chapter) {
        this.setChapter(chapter);
        return this;
    }

    public void setChapter(Chapter chapter) {
        this.chapter = chapter;
    }

    public Set<WritingExercise> getWritingExercises() {
        return this.writingExercises;
    }

    public void setWritingExercises(Set<WritingExercise> writingExercises) {
        if (this.writingExercises != null) {
            this.writingExercises.forEach(i -> i.setWritingTask(null));
        }
        if (writingExercises != null) {
            writingExercises.forEach(i -> i.setWritingTask(this));
        }
        this.writingExercises = writingExercises;
    }

    public WritingTask writingExercises(Set<WritingExercise> writingExercises) {
        this.setWritingExercises(writingExercises);
        return this;
    }

    public WritingTask addWritingExercise(WritingExercise writingExercise) {
        this.writingExercises.add(writingExercise);
        writingExercise.setWritingTask(this);
        return this;
    }

    public WritingTask removeWritingExercise(WritingExercise writingExercise) {
        this.writingExercises.remove(writingExercise);
        writingExercise.setWritingTask(null);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WritingTask)) {
            return false;
        }
        return id != null && id.equals(((WritingTask) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "WritingTask{" + "id=" + getId() + ", prompt='" + getPrompt() + "'" + ", imageUrl='" + getImageUrl() + "'" + "}";
    }
}
