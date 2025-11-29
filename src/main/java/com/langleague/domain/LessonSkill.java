package com.langleague.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A LessonSkill.
 */
@Entity
@Table(name = "lesson_skill")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LessonSkill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(max = 50)
    @Column(name = "exercise_type", length = 50)
    private String exerciseType;

    @Lob
    @Column(name = "has")
    private String has;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "lessonSkill")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lessonSkill" }, allowSetters = true)
    private Set<ListeningExercise> listeningExercises = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "lessonSkill")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lessonSkill" }, allowSetters = true)
    private Set<SpeakingExercise> speakingExercises = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "lessonSkill")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lessonSkill" }, allowSetters = true)
    private Set<ReadingExercise> readingExercises = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "lessonSkill")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "lessonSkill" }, allowSetters = true)
    private Set<WritingExercise> writingExercises = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(
        value = { "lessonWords", "lessonSkills", "mediaFiles", "comments", "userProgresses", "userVocabularies", "chapter" },
        allowSetters = true
    )
    private Lesson lesson;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "lessonSkills", "exerciseResults" }, allowSetters = true)
    private Skill skill;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public LessonSkill id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExerciseType() {
        return this.exerciseType;
    }

    public LessonSkill exerciseType(String exerciseType) {
        this.setExerciseType(exerciseType);
        return this;
    }

    public void setExerciseType(String exerciseType) {
        this.exerciseType = exerciseType;
    }

    public String getHas() {
        return this.has;
    }

    public LessonSkill has(String has) {
        this.setHas(has);
        return this;
    }

    public void setHas(String has) {
        this.has = has;
    }

    public Set<ListeningExercise> getListeningExercises() {
        return this.listeningExercises;
    }

    public void setListeningExercises(Set<ListeningExercise> listeningExercises) {
        if (this.listeningExercises != null) {
            this.listeningExercises.forEach(i -> i.setLessonSkill(null));
        }
        if (listeningExercises != null) {
            listeningExercises.forEach(i -> i.setLessonSkill(this));
        }
        this.listeningExercises = listeningExercises;
    }

    public LessonSkill listeningExercises(Set<ListeningExercise> listeningExercises) {
        this.setListeningExercises(listeningExercises);
        return this;
    }

    public LessonSkill addListeningExercise(ListeningExercise listeningExercise) {
        this.listeningExercises.add(listeningExercise);
        listeningExercise.setLessonSkill(this);
        return this;
    }

    public LessonSkill removeListeningExercise(ListeningExercise listeningExercise) {
        this.listeningExercises.remove(listeningExercise);
        listeningExercise.setLessonSkill(null);
        return this;
    }

    public Set<SpeakingExercise> getSpeakingExercises() {
        return this.speakingExercises;
    }

    public void setSpeakingExercises(Set<SpeakingExercise> speakingExercises) {
        if (this.speakingExercises != null) {
            this.speakingExercises.forEach(i -> i.setLessonSkill(null));
        }
        if (speakingExercises != null) {
            speakingExercises.forEach(i -> i.setLessonSkill(this));
        }
        this.speakingExercises = speakingExercises;
    }

    public LessonSkill speakingExercises(Set<SpeakingExercise> speakingExercises) {
        this.setSpeakingExercises(speakingExercises);
        return this;
    }

    public LessonSkill addSpeakingExercise(SpeakingExercise speakingExercise) {
        this.speakingExercises.add(speakingExercise);
        speakingExercise.setLessonSkill(this);
        return this;
    }

    public LessonSkill removeSpeakingExercise(SpeakingExercise speakingExercise) {
        this.speakingExercises.remove(speakingExercise);
        speakingExercise.setLessonSkill(null);
        return this;
    }

    public Set<ReadingExercise> getReadingExercises() {
        return this.readingExercises;
    }

    public void setReadingExercises(Set<ReadingExercise> readingExercises) {
        if (this.readingExercises != null) {
            this.readingExercises.forEach(i -> i.setLessonSkill(null));
        }
        if (readingExercises != null) {
            readingExercises.forEach(i -> i.setLessonSkill(this));
        }
        this.readingExercises = readingExercises;
    }

    public LessonSkill readingExercises(Set<ReadingExercise> readingExercises) {
        this.setReadingExercises(readingExercises);
        return this;
    }

    public LessonSkill addReadingExercise(ReadingExercise readingExercise) {
        this.readingExercises.add(readingExercise);
        readingExercise.setLessonSkill(this);
        return this;
    }

    public LessonSkill removeReadingExercise(ReadingExercise readingExercise) {
        this.readingExercises.remove(readingExercise);
        readingExercise.setLessonSkill(null);
        return this;
    }

    public Set<WritingExercise> getWritingExercises() {
        return this.writingExercises;
    }

    public void setWritingExercises(Set<WritingExercise> writingExercises) {
        if (this.writingExercises != null) {
            this.writingExercises.forEach(i -> i.setLessonSkill(null));
        }
        if (writingExercises != null) {
            writingExercises.forEach(i -> i.setLessonSkill(this));
        }
        this.writingExercises = writingExercises;
    }

    public LessonSkill writingExercises(Set<WritingExercise> writingExercises) {
        this.setWritingExercises(writingExercises);
        return this;
    }

    public LessonSkill addWritingExercise(WritingExercise writingExercise) {
        this.writingExercises.add(writingExercise);
        writingExercise.setLessonSkill(this);
        return this;
    }

    public LessonSkill removeWritingExercise(WritingExercise writingExercise) {
        this.writingExercises.remove(writingExercise);
        writingExercise.setLessonSkill(null);
        return this;
    }

    public Lesson getLesson() {
        return this.lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public LessonSkill lesson(Lesson lesson) {
        this.setLesson(lesson);
        return this;
    }

    public Skill getSkill() {
        return this.skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    public LessonSkill skill(Skill skill) {
        this.setSkill(skill);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LessonSkill)) {
            return false;
        }
        return getId() != null && getId().equals(((LessonSkill) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LessonSkill{" +
            "id=" + getId() +
            ", exerciseType='" + getExerciseType() + "'" +
            ", has='" + getHas() + "'" +
            "}";
    }
}
