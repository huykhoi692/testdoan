package com.langleague.app.service.mapper;

import com.langleague.app.domain.Exercise;
import com.langleague.app.domain.Unit;
import com.langleague.app.service.dto.ExerciseDTO;
import com.langleague.app.service.dto.UnitDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Exercise} and its DTO {@link ExerciseDTO}.
 */
@Mapper(componentModel = "spring")
public interface ExerciseMapper extends EntityMapper<ExerciseDTO, Exercise> {
    @Mapping(target = "unit", source = "unit", qualifiedByName = "unitId")
    ExerciseDTO toDto(Exercise s);

    @Named("unitId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UnitDTO toDtoUnitId(Unit unit);
}
