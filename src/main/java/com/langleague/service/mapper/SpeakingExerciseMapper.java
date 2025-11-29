package com.langleague.service.mapper;

import com.langleague.domain.LessonSkill;
import com.langleague.domain.SpeakingExercise;
import com.langleague.service.dto.LessonSkillDTO;
import com.langleague.service.dto.SpeakingExerciseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link SpeakingExercise} and its DTO {@link SpeakingExerciseDTO}.
 */
@Mapper(componentModel = "spring")
public interface SpeakingExerciseMapper extends EntityMapper<SpeakingExerciseDTO, SpeakingExercise> {
    @Mapping(target = "lessonSkill", source = "lessonSkill", qualifiedByName = "lessonSkillId")
    SpeakingExerciseDTO toDto(SpeakingExercise s);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "lessonSkill", ignore = true)
    void partialUpdate(@MappingTarget SpeakingExercise entity, SpeakingExerciseDTO dto);

    @Named("lessonSkillId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LessonSkillDTO toDtoLessonSkillId(LessonSkill lessonSkill);
}
