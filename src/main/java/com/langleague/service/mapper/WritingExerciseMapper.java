package com.langleague.service.mapper;

import com.langleague.domain.LessonSkill;
import com.langleague.domain.WritingExercise;
import com.langleague.service.dto.LessonSkillDTO;
import com.langleague.service.dto.WritingExerciseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link WritingExercise} and its DTO {@link WritingExerciseDTO}.
 */
@Mapper(componentModel = "spring")
public interface WritingExerciseMapper extends EntityMapper<WritingExerciseDTO, WritingExercise> {
    @Mapping(target = "lessonSkill", source = "lessonSkill", qualifiedByName = "lessonSkillId")
    WritingExerciseDTO toDto(WritingExercise s);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "lessonSkill", ignore = true)
    void partialUpdate(@MappingTarget WritingExercise entity, WritingExerciseDTO dto);

    @Named("lessonSkillId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LessonSkillDTO toDtoLessonSkillId(LessonSkill lessonSkill);
}
