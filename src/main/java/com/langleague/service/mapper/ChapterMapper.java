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
    ChapterDTO toDto(Chapter s);

    @Override
    @Mapping(target = "book", source = "bookId")
    @Mapping(target = "words", ignore = true)
    @Mapping(target = "removeWord", ignore = true)
    @Mapping(target = "grammars", ignore = true)
    @Mapping(target = "removeGrammar", ignore = true)
    @Mapping(target = "listeningAudios", ignore = true)
    @Mapping(target = "removeListeningAudio", ignore = true)
    @Mapping(target = "speakingTopics", ignore = true)
    @Mapping(target = "removeSpeakingTopic", ignore = true)
    @Mapping(target = "readingPassages", ignore = true)
    @Mapping(target = "removeReadingPassage", ignore = true)
    @Mapping(target = "writingTasks", ignore = true)
    @Mapping(target = "removeWritingTask", ignore = true)
    @Mapping(target = "chapterProgresses", ignore = true)
    @Mapping(target = "removeChapterProgress", ignore = true)
    Chapter toEntity(ChapterDTO dto);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "book", ignore = true)
    @Mapping(target = "words", ignore = true)
    @Mapping(target = "removeWord", ignore = true)
    @Mapping(target = "grammars", ignore = true)
    @Mapping(target = "removeGrammar", ignore = true)
    @Mapping(target = "listeningAudios", ignore = true)
    @Mapping(target = "removeListeningAudio", ignore = true)
    @Mapping(target = "speakingTopics", ignore = true)
    @Mapping(target = "removeSpeakingTopic", ignore = true)
    @Mapping(target = "readingPassages", ignore = true)
    @Mapping(target = "removeReadingPassage", ignore = true)
    @Mapping(target = "writingTasks", ignore = true)
    @Mapping(target = "removeWritingTask", ignore = true)
    @Mapping(target = "chapterProgresses", ignore = true)
    @Mapping(target = "removeChapterProgress", ignore = true)
    void partialUpdate(@MappingTarget Chapter entity, ChapterDTO dto);

    @Named("bookId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    BookDTO toDtoBookId(Book book);

    default Book bookFromId(Long id) {
        if (id == null) {
            return null;
        }
        Book book = new Book();
        book.setId(id);
        return book;
    }
}
