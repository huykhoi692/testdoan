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
 * A Skill.
 */
@Entity
@Table(name = "skill")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Skill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 255)
    @Column(name = "name", length = 255, nullable = false)
    private String name;

    @Lob
    @Column(name = "description")
    private String description;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "skill")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(
        value = { "listeningExercises", "speakingExercises", "readingExercises", "writingExercises", "lesson", "skill" },
        allowSetters = true
    )
    private Set<LessonSkill> lessonSkills = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "skill")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "appUser", "skill" }, allowSetters = true)
    private Set<ExerciseResult> exerciseResults = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Skill id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Skill name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public Skill description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<LessonSkill> getLessonSkills() {
        return this.lessonSkills;
    }

    public void setLessonSkills(Set<LessonSkill> lessonSkills) {
        if (this.lessonSkills != null) {
            this.lessonSkills.forEach(i -> i.setSkill(null));
        }
        if (lessonSkills != null) {
            lessonSkills.forEach(i -> i.setSkill(this));
        }
        this.lessonSkills = lessonSkills;
    }

    public Skill lessonSkills(Set<LessonSkill> lessonSkills) {
        this.setLessonSkills(lessonSkills);
        return this;
    }

    public Skill addLessonSkill(LessonSkill lessonSkill) {
        this.lessonSkills.add(lessonSkill);
        lessonSkill.setSkill(this);
        return this;
    }

    public Skill removeLessonSkill(LessonSkill lessonSkill) {
        this.lessonSkills.remove(lessonSkill);
        lessonSkill.setSkill(null);
        return this;
    }

    public Set<ExerciseResult> getExerciseResults() {
        return this.exerciseResults;
    }

    public void setExerciseResults(Set<ExerciseResult> exerciseResults) {
        if (this.exerciseResults != null) {
            this.exerciseResults.forEach(i -> i.setSkill(null));
        }
        if (exerciseResults != null) {
            exerciseResults.forEach(i -> i.setSkill(this));
        }
        this.exerciseResults = exerciseResults;
    }

    public Skill exerciseResults(Set<ExerciseResult> exerciseResults) {
        this.setExerciseResults(exerciseResults);
        return this;
    }

    public Skill addExerciseResult(ExerciseResult exerciseResult) {
        this.exerciseResults.add(exerciseResult);
        exerciseResult.setSkill(this);
        return this;
    }

    public Skill removeExerciseResult(ExerciseResult exerciseResult) {
        this.exerciseResults.remove(exerciseResult);
        exerciseResult.setSkill(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Skill)) {
            return false;
        }
        return getId() != null && getId().equals(((Skill) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Skill{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
