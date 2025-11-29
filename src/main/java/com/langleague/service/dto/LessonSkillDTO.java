package com.langleague.service.dto;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.langleague.domain.LessonSkill} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LessonSkillDTO implements Serializable {

    private Long id;

    @Size(max = 50)
    private String exerciseType;

    @Lob
    private String has;

    private LessonDTO lesson;

    private SkillDTO skill;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExerciseType() {
        return exerciseType;
    }

    public void setExerciseType(String exerciseType) {
        this.exerciseType = exerciseType;
    }

    public String getHas() {
        return has;
    }

    public void setHas(String has) {
        this.has = has;
    }

    public LessonDTO getLesson() {
        return lesson;
    }

    public void setLesson(LessonDTO lesson) {
        this.lesson = lesson;
    }

    public SkillDTO getSkill() {
        return skill;
    }

    public void setSkill(SkillDTO skill) {
        this.skill = skill;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LessonSkillDTO)) {
            return false;
        }

        LessonSkillDTO lessonSkillDTO = (LessonSkillDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, lessonSkillDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LessonSkillDTO{" +
            "id=" + getId() +
            ", exerciseType='" + getExerciseType() + "'" +
            ", has='" + getHas() + "'" +
            ", lesson=" + getLesson() +
            ", skill=" + getSkill() +
            "}";
    }
}
