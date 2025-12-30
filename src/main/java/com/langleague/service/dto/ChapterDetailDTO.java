package com.langleague.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A detailed DTO for the {@link com.langleague.domain.Chapter} entity with all related content.
 * Used for Use Case 17: View lesson details
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ChapterDetailDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String title;

    @NotNull
    private Integer orderIndex;

    private BookDTO book;

    private Set<WordDTO> words = new HashSet<>();

    private Set<GrammarDTO> grammars = new HashSet<>();

    private Set<ListeningAudioDTO> listeningAudios = new HashSet<>();

    private Set<ReadingPassageDTO> readingPassages = new HashSet<>();

    private Set<WritingTaskDTO> writingTasks = new HashSet<>();

    private Set<SpeakingTopicDTO> speakingTopics = new HashSet<>();

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

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }

    public BookDTO getBook() {
        return book;
    }

    public void setBook(BookDTO book) {
        this.book = book;
    }

    public Set<WordDTO> getWords() {
        return words;
    }

    public void setWords(Set<WordDTO> words) {
        this.words = words;
    }

    public Set<GrammarDTO> getGrammars() {
        return grammars;
    }

    public void setGrammars(Set<GrammarDTO> grammars) {
        this.grammars = grammars;
    }

    public Set<ListeningAudioDTO> getListeningAudios() {
        return listeningAudios;
    }

    public void setListeningAudios(Set<ListeningAudioDTO> listeningAudios) {
        this.listeningAudios = listeningAudios;
    }

    public Set<ReadingPassageDTO> getReadingPassages() {
        return readingPassages;
    }

    public void setReadingPassages(Set<ReadingPassageDTO> readingPassages) {
        this.readingPassages = readingPassages;
    }

    public Set<WritingTaskDTO> getWritingTasks() {
        return writingTasks;
    }

    public void setWritingTasks(Set<WritingTaskDTO> writingTasks) {
        this.writingTasks = writingTasks;
    }

    public Set<SpeakingTopicDTO> getSpeakingTopics() {
        return speakingTopics;
    }

    public void setSpeakingTopics(Set<SpeakingTopicDTO> speakingTopics) {
        this.speakingTopics = speakingTopics;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ChapterDetailDTO)) {
            return false;
        }

        ChapterDetailDTO chapterDetailDTO = (ChapterDetailDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, chapterDetailDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ChapterDetailDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", orderIndex=" + getOrderIndex() +
            ", book=" + getBook() +
            ", words=" + getWords() +
            ", grammars=" + getGrammars() +
            ", listeningAudios=" + getListeningAudios() +
            ", readingPassages=" + getReadingPassages() +
            ", writingTasks=" + getWritingTasks() +
            ", speakingTopics=" + getSpeakingTopics() +
            "}";
    }
}
