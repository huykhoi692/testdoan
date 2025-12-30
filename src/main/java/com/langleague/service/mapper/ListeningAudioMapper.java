package com.langleague.service.mapper;

import com.langleague.domain.Chapter;
import com.langleague.domain.ListeningAudio;
import com.langleague.service.dto.ChapterDTO;
import com.langleague.service.dto.ListeningAudioDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ListeningAudio} and its DTO {@link ListeningAudioDTO}.
 */
@Mapper(componentModel = "spring", uses = { ChapterMapper.class })
public interface ListeningAudioMapper extends EntityMapper<ListeningAudioDTO, ListeningAudio> {
    @Mapping(target = "chapter", source = "chapter", qualifiedByName = "chapterId")
    ListeningAudioDTO toDto(ListeningAudio s);

    @Override
    @Mapping(target = "listeningExercises", ignore = true)
    @Mapping(target = "removeListeningExercise", ignore = true)
    ListeningAudio toEntity(ListeningAudioDTO dto);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "listeningExercises", ignore = true)
    @Mapping(target = "removeListeningExercise", ignore = true)
    void partialUpdate(@MappingTarget ListeningAudio entity, ListeningAudioDTO dto);

    @Named("chapterId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ChapterDTO toDtoChapterId(Chapter chapter);
}
