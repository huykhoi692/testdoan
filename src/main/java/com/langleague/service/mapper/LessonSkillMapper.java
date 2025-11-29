package com.langleague.service.mapper;

import com.langleague.domain.Lesson;
import com.langleague.domain.LessonSkill;
import com.langleague.domain.Skill;
import com.langleague.service.dto.LessonDTO;
import com.langleague.service.dto.LessonSkillDTO;
import com.langleague.service.dto.SkillDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LessonSkill} and its DTO {@link LessonSkillDTO}.
 */
@Mapper(componentModel = "spring")
public interface LessonSkillMapper extends EntityMapper<LessonSkillDTO, LessonSkill> {
    @Mapping(target = "lesson", source = "lesson", qualifiedByName = "lessonId")
    @Mapping(target = "skill", source = "skill", qualifiedByName = "skillId")
    LessonSkillDTO toDto(LessonSkill s);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "lesson", ignore = true)
    @Mapping(target = "skill", ignore = true)
    void partialUpdate(@MappingTarget LessonSkill entity, LessonSkillDTO dto);

    @Named("lessonId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LessonDTO toDtoLessonId(Lesson lesson);

    @Named("skillId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SkillDTO toDtoSkillId(Skill skill);
}
