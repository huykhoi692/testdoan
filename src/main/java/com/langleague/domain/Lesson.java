package com.langleague.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "lesson")
@org.hibernate.annotations.Cache(usage = org.hibernate.annotations.CacheConcurrencyStrategy.READ_WRITE)
@org.hibernate.annotations.BatchSize(size = 20)
public class Lesson implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 2, max = 100)
    @Column(name = "title", length = 100, nullable = false)
    private String title;

    @Size(min = 2, max = 100)
    @Column(name = "title_korean", length = 100)
    private String titleKorean;

    //    @NotNull
    //    @Column(name = "chapter", nullable = false)
    //    private Integer chapter;

    @Column(name = "order_index")
    private Integer orderIndex;

    @Column(name = "estimated_minutes")
    private Integer estimatedMinutes;

    @Column(name = "level")
    private String level;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "thumbnail")
    private String thumbnail;

    @Column(name = "is_published")
    private Boolean isPublished = false;

    @OneToMany(mappedBy = "lesson")
    @org.hibernate.annotations.Cache(usage = org.hibernate.annotations.CacheConcurrencyStrategy.READ_WRITE)
    private Set<LessonWord> words = new HashSet<>();

    @OneToMany(mappedBy = "lesson")
    @org.hibernate.annotations.Cache(usage = org.hibernate.annotations.CacheConcurrencyStrategy.READ_WRITE)
    private Set<LessonSkill> skills = new HashSet<>();

    @OneToMany(mappedBy = "lesson")
    private Set<ListeningExercise> listeningExercises = new HashSet<>();

    @OneToMany(mappedBy = "lesson")
    private Set<SpeakingExercise> speakingExercises = new HashSet<>();

    @OneToMany(mappedBy = "lesson")
    private Set<ReadingExercise> readingExercises = new HashSet<>();

    @OneToMany(mappedBy = "lesson")
    private Set<WritingExercise> writingExercises = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chapter_id", nullable = false)
    private Chapter chapterEntity;

    // Getters and setters

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

    public String getTitleKorean() {
        return titleKorean;
    }

    public void setTitleKorean(String titleKorean) {
        this.titleKorean = titleKorean;
    }

    //    public Integer getChapter() {
    //        return chapter;
    //    }
    //
    //    public void setChapter(Integer chapter) {
    //        this.chapter = chapter;
    //    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }

    public Integer getEstimatedMinutes() {
        return estimatedMinutes;
    }

    public void setEstimatedMinutes(Integer estimatedMinutes) {
        this.estimatedMinutes = estimatedMinutes;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Boolean getIsPublished() {
        return isPublished;
    }

    public void setIsPublished(Boolean published) {
        isPublished = published;
    }

    public Set<LessonWord> getWords() {
        return words;
    }

    public void setWords(Set<LessonWord> words) {
        this.words = words;
    }

    public Set<LessonSkill> getSkills() {
        return skills;
    }

    public void setSkills(Set<LessonSkill> skills) {
        this.skills = skills;
    }

    public Set<ListeningExercise> getListeningExercises() {
        return listeningExercises;
    }

    public void setListeningExercises(Set<ListeningExercise> listeningExercises) {
        this.listeningExercises = listeningExercises;
    }

    public Set<SpeakingExercise> getSpeakingExercises() {
        return speakingExercises;
    }

    public void setSpeakingExercises(Set<SpeakingExercise> speakingExercises) {
        this.speakingExercises = speakingExercises;
    }

    public Set<ReadingExercise> getReadingExercises() {
        return readingExercises;
    }

    public void setReadingExercises(Set<ReadingExercise> readingExercises) {
        this.readingExercises = readingExercises;
    }

    public Set<WritingExercise> getWritingExercises() {
        return writingExercises;
    }

    public void setWritingExercises(Set<WritingExercise> writingExercises) {
        this.writingExercises = writingExercises;
    }

    public Chapter getChapterEntity() {
        return chapterEntity;
    }

    public void setChapterEntity(Chapter chapterEntity) {
        this.chapterEntity = chapterEntity;
    }
}
