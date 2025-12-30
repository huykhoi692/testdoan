package com.langleague.service.mapper;

import com.langleague.domain.Chapter;
import com.langleague.domain.Grammar;
import com.langleague.service.dto.ChapterDTO;
import com.langleague.service.dto.GrammarDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Grammar} and its DTO {@link GrammarDTO}.
 */
@Mapper(componentModel = "spring")
public interface GrammarMapper extends EntityMapper<GrammarDTO, Grammar> {
    @Mapping(target = "chapter", source = "chapter", qualifiedByName = "chapterId")
    GrammarDTO toDto(Grammar s);

    @Override
    @Mapping(target = "grammarExamples", ignore = true)
    @Mapping(target = "removeGrammarExample", ignore = true)
    @Mapping(target = "userGrammars", ignore = true)
    @Mapping(target = "removeUserGrammar", ignore = true)
    @Mapping(target = "chapter.words", ignore = true)
    @Mapping(target = "chapter.removeWord", ignore = true)
    @Mapping(target = "chapter.grammars", ignore = true)
    @Mapping(target = "chapter.removeGrammar", ignore = true)
    @Mapping(target = "chapter.listeningAudios", ignore = true)
    @Mapping(target = "chapter.removeListeningAudio", ignore = true)
    @Mapping(target = "chapter.speakingTopics", ignore = true)
    @Mapping(target = "chapter.removeSpeakingTopic", ignore = true)
    @Mapping(target = "chapter.readingPassages", ignore = true)
    @Mapping(target = "chapter.removeReadingPassage", ignore = true)
    @Mapping(target = "chapter.writingTasks", ignore = true)
    @Mapping(target = "chapter.removeWritingTask", ignore = true)
    @Mapping(target = "chapter.chapterProgresses", ignore = true)
    @Mapping(target = "chapter.removeChapterProgress", ignore = true)
    @Mapping(target = "chapter.book.chapters", ignore = true)
    @Mapping(target = "chapter.book.removeChapter", ignore = true)
    @Mapping(target = "chapter.book.bookReviews", ignore = true)
    @Mapping(target = "chapter.book.removeBookReview", ignore = true)
    Grammar toEntity(GrammarDTO dto);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "grammarExamples", ignore = true)
    @Mapping(target = "removeGrammarExample", ignore = true)
    @Mapping(target = "userGrammars", ignore = true)
    @Mapping(target = "removeUserGrammar", ignore = true)
    @Mapping(target = "chapter.words", ignore = true)
    @Mapping(target = "chapter.removeWord", ignore = true)
    @Mapping(target = "chapter.grammars", ignore = true)
    @Mapping(target = "chapter.removeGrammar", ignore = true)
    @Mapping(target = "chapter.listeningAudios", ignore = true)
    @Mapping(target = "chapter.removeListeningAudio", ignore = true)
    @Mapping(target = "chapter.speakingTopics", ignore = true)
    @Mapping(target = "chapter.removeSpeakingTopic", ignore = true)
    @Mapping(target = "chapter.readingPassages", ignore = true)
    @Mapping(target = "chapter.removeReadingPassage", ignore = true)
    @Mapping(target = "chapter.writingTasks", ignore = true)
    @Mapping(target = "chapter.removeWritingTask", ignore = true)
    @Mapping(target = "chapter.chapterProgresses", ignore = true)
    @Mapping(target = "chapter.removeChapterProgress", ignore = true)
    @Mapping(target = "chapter.book.chapters", ignore = true)
    @Mapping(target = "chapter.book.removeChapter", ignore = true)
    @Mapping(target = "chapter.book.bookReviews", ignore = true)
    @Mapping(target = "chapter.book.removeBookReview", ignore = true)
    void partialUpdate(@MappingTarget Grammar entity, GrammarDTO dto);

    @Named("chapterId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ChapterDTO toDtoChapterId(Chapter chapter);
}
