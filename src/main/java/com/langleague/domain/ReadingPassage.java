package com.langleague.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ReadingPassage.
 */
@Entity
@Table(name = "reading_passage")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ReadingPassage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "title")
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "readingPassages" }, allowSetters = true)
    private Chapter chapter;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "readingPassage")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "readingPassage", "options", "exerciseResults", "chapter" }, allowSetters = true)
    private Set<ReadingExercise> readingExercises = new HashSet<>();

    public Long getId() {
        return this.id;
    }

    public ReadingPassage id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return this.content;
    }

    public ReadingPassage content(String content) {
        this.setContent(content);
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return this.title;
    }

    public ReadingPassage title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Chapter getChapter() {
        return this.chapter;
    }

    public ReadingPassage chapter(Chapter chapter) {
        this.setChapter(chapter);
        return this;
    }

    public void setChapter(Chapter chapter) {
        this.chapter = chapter;
    }

    public Set<ReadingExercise> getReadingExercises() {
        return this.readingExercises;
    }

    public void setReadingExercises(Set<ReadingExercise> readingExercises) {
        if (this.readingExercises != null) {
            this.readingExercises.forEach(i -> i.setReadingPassage(null));
        }
        if (readingExercises != null) {
            readingExercises.forEach(i -> i.setReadingPassage(this));
        }
        this.readingExercises = readingExercises;
    }

    public ReadingPassage readingExercises(Set<ReadingExercise> readingExercises) {
        this.setReadingExercises(readingExercises);
        return this;
    }

    public ReadingPassage addReadingExercise(ReadingExercise readingExercise) {
        this.readingExercises.add(readingExercise);
        readingExercise.setReadingPassage(this);
        return this;
    }

    public ReadingPassage removeReadingExercise(ReadingExercise readingExercise) {
        this.readingExercises.remove(readingExercise);
        readingExercise.setReadingPassage(null);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ReadingPassage)) {
            return false;
        }
        return id != null && id.equals(((ReadingPassage) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "ReadingPassage{" + "id=" + getId() + ", content='" + getContent() + "'" + ", title='" + getTitle() + "'" + "}";
    }
}
