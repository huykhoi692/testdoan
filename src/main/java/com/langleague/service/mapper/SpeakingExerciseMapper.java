package com.langleague.service.mapper;

import com.langleague.domain.Chapter;
import com.langleague.domain.SpeakingExercise;
import com.langleague.service.dto.ChapterDTO;
import com.langleague.service.dto.SpeakingExerciseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link SpeakingExercise} and its DTO {@link SpeakingExerciseDTO}.
 */
@Mapper(componentModel = "spring", uses = { SpeakingTopicMapper.class })
public interface SpeakingExerciseMapper extends EntityMapper<SpeakingExerciseDTO, SpeakingExercise> {
    @Mapping(target = "speakingTopic", source = "speakingTopic")
    SpeakingExerciseDTO toDto(SpeakingExercise s);

    @Override
    @Mapping(target = "speakingTopic", ignore = true)
    @Mapping(target = "exerciseResults", ignore = true)
    @Mapping(target = "removeExerciseResult", ignore = true)
    SpeakingExercise toEntity(SpeakingExerciseDTO dto);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "speakingTopic", ignore = true)
    @Mapping(target = "exerciseResults", ignore = true)
    @Mapping(target = "removeExerciseResult", ignore = true)
    void partialUpdate(@MappingTarget SpeakingExercise entity, SpeakingExerciseDTO dto);
}
