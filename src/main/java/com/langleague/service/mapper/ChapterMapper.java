package com.langleague.service.mapper;

import com.langleague.domain.Book;
import com.langleague.domain.Chapter;
import com.langleague.service.dto.BookDTO;
import com.langleague.service.dto.ChapterDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Chapter} and its DTO {@link ChapterDTO}.
 */
@Mapper(componentModel = "spring")
public interface ChapterMapper extends EntityMapper<ChapterDTO, Chapter> {
    @Mapping(target = "bookId", source = "book.id")
    @Mapping(target = "bookTitle", source = "book.title")
    ChapterDTO toDto(Chapter chapter);

    @Mapping(target = "book", ignore = true)
    @Mapping(target = "lessons", ignore = true)
    Chapter toEntity(ChapterDTO chapterDTO);

    @Named("bookId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    BookDTO toDtoBookId(Book book);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "book", ignore = true)
    @Mapping(target = "lessons", ignore = true)
    void partialUpdate(@MappingTarget Chapter entity, ChapterDTO dto);
}
