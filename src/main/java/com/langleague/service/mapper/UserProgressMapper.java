package com.langleague.service.mapper;

import com.langleague.domain.AppUser;
import com.langleague.domain.Lesson;
import com.langleague.domain.UserProgress;
import com.langleague.service.dto.AppUserDTO;
import com.langleague.service.dto.LessonDTO;
import com.langleague.service.dto.UserProgressDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link UserProgress} and its DTO {@link UserProgressDTO}.
 */
@Mapper(componentModel = "spring")
public interface UserProgressMapper extends EntityMapper<UserProgressDTO, UserProgress> {
    @Mapping(target = "appUser", source = "appUser", qualifiedByName = "appUserId")
    @Mapping(target = "lesson", source = "lesson", qualifiedByName = "lessonId")
    UserProgressDTO toDto(UserProgress s);

    @Named("appUserId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AppUserDTO toDtoAppUserId(AppUser appUser);

    @Named("lessonId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LessonDTO toDtoLessonId(Lesson lesson);
}
