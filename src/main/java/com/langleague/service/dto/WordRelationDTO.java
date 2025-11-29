package com.langleague.service.dto;

import com.langleague.domain.enumeration.RelationType;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.langleague.domain.WordRelation} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WordRelationDTO implements Serializable {

    private Long id;

    private RelationType relationType;

    @Size(max = 500)
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RelationType getRelationType() {
        return relationType;
    }

    public void setRelationType(RelationType relationType) {
        this.relationType = relationType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WordRelationDTO)) {
            return false;
        }

        WordRelationDTO wordRelationDTO = (WordRelationDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, wordRelationDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WordRelationDTO{" +
            "id=" + getId() +
            ", relationType='" + getRelationType() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
