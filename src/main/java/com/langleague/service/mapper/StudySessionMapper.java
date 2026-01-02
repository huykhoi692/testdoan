package com.langleague.service.mapper;

import com.langleague.domain.AppUser;
import com.langleague.domain.StudySession;
import com.langleague.service.dto.AppUserDTO;
import com.langleague.service.dto.StudySessionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link StudySession} and its DTO {@link StudySessionDTO}.
 */
@Mapper(componentModel = "spring")
public interface StudySessionMapper extends EntityMapper<StudySessionDTO, StudySession> {
    @Mapping(target = "appUser", source = "appUser", qualifiedByName = "appUserId")
    @Mapping(target = "userChapterId", source = "userChapter.id")
    StudySessionDTO toDto(StudySession s);

    @Override
    @Mapping(target = "appUser", ignore = true)
    @Mapping(target = "streakMilestones", ignore = true)
    @Mapping(target = "removeStreakMilestone", ignore = true)
    @Mapping(target = "userChapter", source = "userChapterId", qualifiedByName = "userChapterId")
    StudySession toEntity(StudySessionDTO dto);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "appUser", ignore = true)
    @Mapping(target = "streakMilestones", ignore = true)
    @Mapping(target = "removeStreakMilestone", ignore = true)
    @Mapping(target = "userChapter", source = "userChapterId", qualifiedByName = "userChapterId")
    void partialUpdate(@MappingTarget StudySession entity, StudySessionDTO dto);

    @Named("appUserId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AppUserDTO toDtoAppUserId(AppUser appUser);

    @Named("userChapterId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    default com.langleague.domain.UserChapter fromId(Long id) {
        if (id == null) {
            return null;
        }
        com.langleague.domain.UserChapter userChapter = new com.langleague.domain.UserChapter();
        userChapter.setId(id);
        return userChapter;
    }
}
