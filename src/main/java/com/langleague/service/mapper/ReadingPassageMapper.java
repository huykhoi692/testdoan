package com.langleague.service.mapper;

import com.langleague.domain.Chapter;
import com.langleague.domain.ReadingPassage;
import com.langleague.service.dto.ChapterDTO;
import com.langleague.service.dto.ReadingPassageDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ReadingPassage} and its DTO {@link ReadingPassageDTO}.
 */
@Mapper(componentModel = "spring", uses = { ChapterMapper.class })
public interface ReadingPassageMapper extends EntityMapper<ReadingPassageDTO, ReadingPassage> {
    @Mapping(target = "chapter", source = "chapter", qualifiedByName = "chapterId")
    ReadingPassageDTO toDto(ReadingPassage s);

    @Override
    @Mapping(target = "readingExercises", ignore = true)
    @Mapping(target = "removeReadingExercise", ignore = true)
    ReadingPassage toEntity(ReadingPassageDTO dto);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "readingExercises", ignore = true)
    @Mapping(target = "removeReadingExercise", ignore = true)
    void partialUpdate(@MappingTarget ReadingPassage entity, ReadingPassageDTO dto);

    @Named("chapterId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ChapterDTO toDtoChapterId(Chapter chapter);
}
