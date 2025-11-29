package com.langleague.service.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

public class ChapterDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 255)
    private String title;

    @NotNull
    private Integer orderIndex;

    @NotNull
    private Long bookId;

    private String bookTitle; // For display purposes

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

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ChapterDTO)) return false;
        ChapterDTO that = (ChapterDTO) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return (
            "ChapterDTO{" +
            "id=" +
            id +
            ", title='" +
            title +
            '\'' +
            ", orderIndex=" +
            orderIndex +
            ", bookId=" +
            bookId +
            ", bookTitle='" +
            bookTitle +
            '\'' +
            '}'
        );
    }
}
