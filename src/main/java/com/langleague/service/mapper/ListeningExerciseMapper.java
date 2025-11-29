package com.langleague.service.mapper;

import com.langleague.domain.LessonSkill;
import com.langleague.domain.ListeningExercise;
import com.langleague.service.dto.LessonSkillDTO;
import com.langleague.service.dto.ListeningExerciseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ListeningExercise} and its DTO {@link ListeningExerciseDTO}.
 */
@Mapper(componentModel = "spring")
public interface ListeningExerciseMapper extends EntityMapper<ListeningExerciseDTO, ListeningExercise> {
    @Mapping(target = "lessonSkill", source = "lessonSkill", qualifiedByName = "lessonSkillId")
    ListeningExerciseDTO toDto(ListeningExercise s);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "lessonSkill", ignore = true)
    void partialUpdate(@MappingTarget ListeningExercise entity, ListeningExerciseDTO dto);

    @Named("lessonSkillId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LessonSkillDTO toDtoLessonSkillId(LessonSkill lessonSkill);
}
