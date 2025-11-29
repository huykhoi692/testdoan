package com.langleague.service.mapper;

import com.langleague.domain.AppUser;
import com.langleague.domain.ExerciseResult;
import com.langleague.domain.Skill;
import com.langleague.service.dto.AppUserDTO;
import com.langleague.service.dto.ExerciseResultDTO;
import com.langleague.service.dto.SkillDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ExerciseResult} and its DTO {@link ExerciseResultDTO}.
 */
@Mapper(componentModel = "spring")
public interface ExerciseResultMapper extends EntityMapper<ExerciseResultDTO, ExerciseResult> {
    @Mapping(target = "appUser", source = "appUser", qualifiedByName = "appUserId")
    @Mapping(target = "skill", source = "skill", qualifiedByName = "skillId")
    ExerciseResultDTO toDto(ExerciseResult s);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "appUser", ignore = true)
    @Mapping(target = "skill", ignore = true)
    void partialUpdate(@MappingTarget ExerciseResult entity, ExerciseResultDTO dto);

    @Named("appUserId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AppUserDTO toDtoAppUserId(AppUser appUser);

    @Named("skillId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SkillDTO toDtoSkillId(Skill skill);
}
