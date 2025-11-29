package com.langleague.service.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

public class WordDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String text;

    private String meaning;

    @Size(max = 255)
    private String pronunciation;

    @Size(max = 50)
    private String partOfSpeech;

    @Size(max = 512)
    private String imageUrl;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getMeaning() {
        return meaning;
    }

    public void setMeaning(String meaning) {
        this.meaning = meaning;
    }

    public String getPronunciation() {
        return pronunciation;
    }

    public void setPronunciation(String pronunciation) {
        this.pronunciation = pronunciation;
    }

    public String getPartOfSpeech() {
        return partOfSpeech;
    }

    public void setPartOfSpeech(String partOfSpeech) {
        this.partOfSpeech = partOfSpeech;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof WordDTO)) return false;
        WordDTO wordDTO = (WordDTO) o;
        return Objects.equals(id, wordDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return (
            "WordDTO{" +
            "id=" +
            id +
            ", text='" +
            text +
            '\'' +
            ", meaning='" +
            meaning +
            '\'' +
            ", pronunciation='" +
            pronunciation +
            '\'' +
            ", partOfSpeech='" +
            partOfSpeech +
            '\'' +
            ", imageUrl='" +
            imageUrl +
            '\'' +
            '}'
        );
    }
}
