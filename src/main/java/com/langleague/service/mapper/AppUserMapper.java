package com.langleague.service.mapper;

import com.langleague.domain.AppUser;
import com.langleague.domain.User;
import com.langleague.service.dto.AppUserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link AppUser} and its DTO {@link AppUserDTO}.
 */
@Mapper(componentModel = "spring", uses = { UserMapper.class })
public interface AppUserMapper extends EntityMapper<AppUserDTO, AppUser> {
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "userLogin", source = "user.login")
    AppUserDTO toDto(AppUser appUser);

    @Mapping(target = "user", source = "userId", qualifiedByName = "userFromId")
    AppUser toEntity(AppUserDTO appUser);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "user", ignore = true)
    void partialUpdate(@MappingTarget AppUser entity, AppUserDTO dto);

    @Named("userFromId")
    public static User userFromId(Long id) {
        if (id == null) return null;
        User user = new User();
        user.setId(id);
        return user;
    }
}
