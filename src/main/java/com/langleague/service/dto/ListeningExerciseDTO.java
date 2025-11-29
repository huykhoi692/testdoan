package com.langleague.service.dto;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.langleague.domain.ListeningExercise} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ListeningExerciseDTO implements Serializable {

    private Long id;

    @Size(max = 512)
    private String audioPath;

    @Lob
    private String transcript;

    @Lob
    private String question;

    @Size(max = 255)
    private String optionA;

    @Size(max = 255)
    private String optionB;

    @Size(max = 255)
    private String optionC;

    @Size(max = 255)
    private String correctOption;

    private Integer chart;

    private LessonSkillDTO lessonSkill;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAudioPath() {
        return audioPath;
    }

    public void setAudioPath(String audioPath) {
        this.audioPath = audioPath;
    }

    public String getTranscript() {
        return transcript;
    }

    public void setTranscript(String transcript) {
        this.transcript = transcript;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getOptionA() {
        return optionA;
    }

    public void setOptionA(String optionA) {
        this.optionA = optionA;
    }

    public String getOptionB() {
        return optionB;
    }

    public void setOptionB(String optionB) {
        this.optionB = optionB;
    }

    public String getOptionC() {
        return optionC;
    }

    public void setOptionC(String optionC) {
        this.optionC = optionC;
    }

    public String getCorrectOption() {
        return correctOption;
    }

    public void setCorrectOption(String correctOption) {
        this.correctOption = correctOption;
    }

    public Integer getChart() {
        return chart;
    }

    public void setChart(Integer chart) {
        this.chart = chart;
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
        if (!(o instanceof ListeningExerciseDTO)) {
            return false;
        }

        ListeningExerciseDTO listeningExerciseDTO = (ListeningExerciseDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, listeningExerciseDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ListeningExerciseDTO{" +
            "id=" + getId() +
            ", audioPath='" + getAudioPath() + "'" +
            ", transcript='" + getTranscript() + "'" +
            ", question='" + getQuestion() + "'" +
            ", optionA='" + getOptionA() + "'" +
            ", optionB='" + getOptionB() + "'" +
            ", optionC='" + getOptionC() + "'" +
            ", correctOption='" + getCorrectOption() + "'" +
            ", chart=" + getChart() +
            ", lessonSkill=" + getLessonSkill() +
            "}";
    }
}
