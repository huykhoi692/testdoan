package com.langleague.service.mapper;

import com.langleague.domain.WordRelation;
import com.langleague.service.dto.WordRelationDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link WordRelation} and its DTO {@link WordRelationDTO}.
 */
@Mapper(componentModel = "spring")
public interface WordRelationMapper extends EntityMapper<WordRelationDTO, WordRelation> {
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void partialUpdate(@MappingTarget WordRelation entity, WordRelationDTO dto);
}
