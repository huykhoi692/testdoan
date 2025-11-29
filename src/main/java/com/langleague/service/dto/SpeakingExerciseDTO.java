package com.langleague.service.dto;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.langleague.domain.SpeakingExercise} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SpeakingExerciseDTO implements Serializable {

    private Long id;

    @Lob
    private String prompt;

    @Size(max = 512)
    private String sampleAudio;

    @Size(max = 255)
    private String targetPhrase;

    @Size(max = 255)
    private String evaluationMethod;

    private LessonSkillDTO lessonSkill;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getSampleAudio() {
        return sampleAudio;
    }

    public void setSampleAudio(String sampleAudio) {
        this.sampleAudio = sampleAudio;
    }

    public String getTargetPhrase() {
        return targetPhrase;
    }

    public void setTargetPhrase(String targetPhrase) {
        this.targetPhrase = targetPhrase;
    }

    public String getEvaluationMethod() {
        return evaluationMethod;
    }

    public void setEvaluationMethod(String evaluationMethod) {
        this.evaluationMethod = evaluationMethod;
    }

    public LessonSkillDTO getLessonSkill() {
        return lessonSkill;
    }

    public void setLessonSkill(LessonSkillDTO lessonSkill) {
        this.lessonSkill = lessonSkill;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SpeakingExerciseDTO)) {
            return false;
        }

        SpeakingExerciseDTO speakingExerciseDTO = (SpeakingExerciseDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, speakingExerciseDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SpeakingExerciseDTO{" +
            "id=" + getId() +
            ", prompt='" + getPrompt() + "'" +
            ", sampleAudio='" + getSampleAudio() + "'" +
            ", targetPhrase='" + getTargetPhrase() + "'" +
            ", evaluationMethod='" + getEvaluationMethod() + "'" +
            ", lessonSkill=" + getLessonSkill() +
            "}";
    }
}
