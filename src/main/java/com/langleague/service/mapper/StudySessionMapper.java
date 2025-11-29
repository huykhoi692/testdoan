package com.langleague.service.mapper;

import com.langleague.domain.StudySession;
import com.langleague.domain.User;
import com.langleague.service.dto.AppUserDTO;
import com.langleague.service.dto.StudySessionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link StudySession} and its DTO {@link StudySessionDTO}.
 */
@Mapper(componentModel = "spring")
public interface StudySessionMapper extends EntityMapper<StudySessionDTO, StudySession> {
    @Mapping(target = "appUser", source = "user", qualifiedByName = "appUserId")
    StudySessionDTO toDto(StudySession s);

    @Mapping(target = "user", source = "appUser")
    StudySession toEntity(StudySessionDTO dto);

    @Named("appUserId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AppUserDTO toDtoAppUserId(User user);
}
