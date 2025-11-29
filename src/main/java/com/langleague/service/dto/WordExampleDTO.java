package com.langleague.service.dto;

import jakarta.persistence.Lob;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.langleague.domain.WordExample} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WordExampleDTO implements Serializable {

    private Long id;

    @Lob
    private String exampleText;

    @Lob
    private String translation;

    private WordDTO word;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExampleText() {
        return exampleText;
    }

    public void setExampleText(String exampleText) {
        this.exampleText = exampleText;
    }

    public String getTranslation() {
        return translation;
    }

    public void setTranslation(String translation) {
        this.translation = translation;
    }

    public WordDTO getWord() {
        return word;
    }

    public void setWord(WordDTO word) {
        this.word = word;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WordExampleDTO)) {
            return false;
        }

        WordExampleDTO wordExampleDTO = (WordExampleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, wordExampleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WordExampleDTO{" +
            "id=" + getId() +
            ", exampleText='" + getExampleText() + "'" +
            ", translation='" + getTranslation() + "'" +
            ", word=" + getWord() +
            "}";
    }
}
