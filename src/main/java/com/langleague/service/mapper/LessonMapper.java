package com.langleague.service.mapper;

import com.langleague.domain.Chapter;
import com.langleague.domain.Lesson;
import com.langleague.service.dto.ChapterDTO;
import com.langleague.service.dto.LessonDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Lesson} and its DTO {@link LessonDTO}.
 */
@Mapper(componentModel = "spring")
public interface LessonMapper extends EntityMapper<LessonDTO, Lesson> {
    @Mapping(target = "chapterId", source = "chapterEntity.id")
    LessonDTO toDto(Lesson s);

    @Mapping(target = "chapterEntity", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void partialUpdate(@MappingTarget Lesson entity, LessonDTO dto);

    @Named("chapterId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ChapterDTO toDtoChapterId(Chapter chapter);
}
