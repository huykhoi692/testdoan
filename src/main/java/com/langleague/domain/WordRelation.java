package com.langleague.domain;

import com.langleague.domain.enumeration.RelationType;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A WordRelation.
 */
@Entity
@Table(name = "word_relation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WordRelation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "relation_type")
    private RelationType relationType;

    @Size(max = 500)
    @Column(name = "description", length = 500)
    private String description;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public WordRelation id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RelationType getRelationType() {
        return this.relationType;
    }

    public WordRelation relationType(RelationType relationType) {
        this.setRelationType(relationType);
        return this;
    }

    public void setRelationType(RelationType relationType) {
        this.relationType = relationType;
    }

    public String getDescription() {
        return this.description;
    }

    public WordRelation description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WordRelation)) {
            return false;
        }
        return getId() != null && getId().equals(((WordRelation) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WordRelation{" +
            "id=" + getId() +
            ", relationType='" + getRelationType() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
