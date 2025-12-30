package com.langleague.service.mapper;

import com.langleague.domain.Chapter;
import com.langleague.domain.WritingTask;
import com.langleague.service.dto.ChapterDTO;
import com.langleague.service.dto.WritingTaskDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link WritingTask} and its DTO {@link WritingTaskDTO}.
 */
@Mapper(componentModel = "spring", uses = { ChapterMapper.class })
public interface WritingTaskMapper extends EntityMapper<WritingTaskDTO, WritingTask> {
    @Mapping(target = "chapter", source = "chapter", qualifiedByName = "chapterId")
    WritingTaskDTO toDto(WritingTask s);

    @Override
    @Mapping(target = "writingExercises", ignore = true)
    @Mapping(target = "removeWritingExercise", ignore = true)
    WritingTask toEntity(WritingTaskDTO dto);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "writingExercises", ignore = true)
    @Mapping(target = "removeWritingExercise", ignore = true)
    void partialUpdate(@MappingTarget WritingTask entity, WritingTaskDTO dto);

    @Named("chapterId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ChapterDTO toDtoChapterId(Chapter chapter);
}
