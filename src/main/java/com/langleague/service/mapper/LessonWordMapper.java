package com.langleague.service.mapper;

import com.langleague.domain.Lesson;
import com.langleague.domain.LessonWord;
import com.langleague.domain.Word;
import com.langleague.service.dto.LessonDTO;
import com.langleague.service.dto.LessonWordDTO;
import com.langleague.service.dto.WordDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LessonWord} and its DTO {@link LessonWordDTO}.
 */
@Mapper(componentModel = "spring")
public interface LessonWordMapper extends EntityMapper<LessonWordDTO, LessonWord> {
    @Mapping(target = "lesson", source = "lesson", qualifiedByName = "lessonId")
    @Mapping(target = "word", source = "word", qualifiedByName = "wordId")
    LessonWordDTO toDto(LessonWord s);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "lesson", ignore = true)
    @Mapping(target = "word", ignore = true)
    void partialUpdate(@MappingTarget LessonWord entity, LessonWordDTO dto);

    @Named("lessonId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LessonDTO toDtoLessonId(Lesson lesson);

    @Named("wordId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    WordDTO toDtoWordId(Word word);
}
