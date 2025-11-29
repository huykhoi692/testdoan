package com.langleague.service.dto;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.langleague.domain.ExerciseResult} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ExerciseResultDTO implements Serializable {

    private Long id;

    @Size(max = 50)
    private String exerciseType;

    private Integer score;

    @Lob
    private String answer;

    @Size(max = 512)
    private String audioPath;

    private Instant submittedAt;

    private AppUserDTO appUser;

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

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getAudioPath() {
        return audioPath;
    }

    public void setAudioPath(String audioPath) {
        this.audioPath = audioPath;
    }

    public Instant getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(Instant submittedAt) {
        this.submittedAt = submittedAt;
    }

    public AppUserDTO getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUserDTO appUser) {
        this.appUser = appUser;
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
        if (!(o instanceof ExerciseResultDTO)) {
            return false;
        }

        ExerciseResultDTO exerciseResultDTO = (ExerciseResultDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, exerciseResultDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ExerciseResultDTO{" +
            "id=" + getId() +
            ", exerciseType='" + getExerciseType() + "'" +
            ", score=" + getScore() +
            ", answer='" + getAnswer() + "'" +
            ", audioPath='" + getAudioPath() + "'" +
            ", submittedAt='" + getSubmittedAt() + "'" +
            ", appUser=" + getAppUser() +
            ", skill=" + getSkill() +
            "}";
    }
}
