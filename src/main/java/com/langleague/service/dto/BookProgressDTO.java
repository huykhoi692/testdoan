package com.langleague.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.langleague.domain.BookProgress} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BookProgressDTO implements Serializable {

    private Long id;

    @NotNull(message = "Percent is required")
    @Min(value = 0, message = "Percent must be at least 0")
    @Max(value = 100, message = "Percent must not exceed 100")
    private Integer percent;

    private Instant lastAccessed;

    private Boolean completed;

    private AppUserDTO appUser;

    private BookDTO book;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPercent() {
        return percent;
    }

    public void setPercent(Integer percent) {
        this.percent = percent;
    }

    public Instant getLastAccessed() {
        return lastAccessed;
    }

    public void setLastAccessed(Instant lastAccessed) {
        this.lastAccessed = lastAccessed;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public AppUserDTO getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUserDTO appUser) {
        this.appUser = appUser;
    }

    public BookDTO getBook() {
        return book;
    }

    public void setBook(BookDTO book) {
        this.book = book;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BookProgressDTO)) {
            return false;
        }

        BookProgressDTO bookProgressDTO = (BookProgressDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, bookProgressDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BookProgressDTO{" +
            "id=" + getId() +
            ", percent=" + getPercent() +
            ", lastAccessed='" + getLastAccessed() + "'" +
            ", completed='" + getCompleted() + "'" +
            ", appUser=" + getAppUser() +
            ", book=" + getBook() +
            "}";
    }
}
