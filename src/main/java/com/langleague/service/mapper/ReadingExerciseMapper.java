package com.langleague.service.mapper;

import com.langleague.domain.LessonSkill;
import com.langleague.domain.ReadingExercise;
import com.langleague.service.dto.LessonSkillDTO;
import com.langleague.service.dto.ReadingExerciseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ReadingExercise} and its DTO {@link ReadingExerciseDTO}.
 */
@Mapper(componentModel = "spring")
public interface ReadingExerciseMapper extends EntityMapper<ReadingExerciseDTO, ReadingExercise> {
    @Mapping(target = "lessonSkill", source = "lessonSkill", qualifiedByName = "lessonSkillId")
    ReadingExerciseDTO toDto(ReadingExercise s);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "lessonSkill", ignore = true)
    void partialUpdate(@MappingTarget ReadingExercise entity, ReadingExerciseDTO dto);

    @Named("lessonSkillId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LessonSkillDTO toDtoLessonSkillId(LessonSkill lessonSkill);
}
