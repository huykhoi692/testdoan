package com.langleague.service.mapper;

import com.langleague.domain.Chapter;
import com.langleague.domain.SpeakingTopic;
import com.langleague.service.dto.ChapterDTO;
import com.langleague.service.dto.SpeakingTopicDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link SpeakingTopic} and its DTO {@link SpeakingTopicDTO}.
 */
@Mapper(componentModel = "spring", uses = { ChapterMapper.class })
public interface SpeakingTopicMapper extends EntityMapper<SpeakingTopicDTO, SpeakingTopic> {
    @Mapping(target = "chapter", source = "chapter", qualifiedByName = "chapterId")
    SpeakingTopicDTO toDto(SpeakingTopic s);

    @Override
    @Mapping(target = "speakingExercises", ignore = true)
    @Mapping(target = "removeSpeakingExercise", ignore = true)
    SpeakingTopic toEntity(SpeakingTopicDTO dto);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "speakingExercises", ignore = true)
    @Mapping(target = "removeSpeakingExercise", ignore = true)
    void partialUpdate(@MappingTarget SpeakingTopic entity, SpeakingTopicDTO dto);

    @Named("chapterId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ChapterDTO toDtoChapterId(Chapter chapter);
}
