package com.langleague.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import com.langleague.domain.User;
import com.langleague.service.dto.AdminUserDTO;
import com.langleague.service.dto.UserDTO;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/**
 * Test class for the UserMapper.
 */
class UserMapperTest {

    private static final String DEFAULT_LOGIN = "johndoe";
    private static final Long DEFAULT_ID = 1L;

    private UserMapper userMapper;
    private User user;
    private AdminUserDTO adminUserDTO;

    @BeforeEach
    public void init() {
        userMapper = new UserMapper();
        user = new User();
        user.setLogin(DEFAULT_LOGIN);
        user.setPassword("password");
        user.setActivated(true);
        user.setEmail("johndoe@localhost");
        user.setFirstName("john");
        user.setLastName("doe");
        user.setImageUrl("image_url");
        user.setLangKey("en");

        adminUserDTO = new AdminUserDTO(user);
    }

    @Test
    void usersToAdminUserDTOsShouldMapOnlyNonNullUsers() {
        List<User> users = new ArrayList<>();
        users.add(user);
        users.add(null);

        List<AdminUserDTO> userDTOS = userMapper.usersToAdminUserDTOs(users);

        assertThat(userDTOS).isNotEmpty().size().isEqualTo(1);
    }

    @Test
    void adminUserDTOsToUsersShouldMapOnlyNonNullAdminUserDTOs() {
        List<AdminUserDTO> adminUserDTOs = new ArrayList<>();
        adminUserDTOs.add(adminUserDTO);
        adminUserDTOs.add(null);

        List<User> users = userMapper.userDTOsToUsers(adminUserDTOs);

        assertThat(users).isNotEmpty().size().isEqualTo(1);
    }

    @Test
    void adminUserDTOsToUsersWithAuthoritiesStringShouldMapToUsersWithAuthoritiesDomain() {
        Set<String> authoritiesAsString = new HashSet<>();
        authoritiesAsString.add("ROLE_USER");
        adminUserDTO.setAuthorities(authoritiesAsString);

        List<AdminUserDTO> adminUserDTOs = new ArrayList<>();
        adminUserDTOs.add(adminUserDTO);

        List<User> users = userMapper.userDTOsToUsers(adminUserDTOs);

        assertThat(users).isNotEmpty().size().isEqualTo(1);
        assertThat(users.get(0).getAuthorities()).isNotNull();
        assertThat(users.get(0).getAuthorities()).isNotEmpty();
        assertThat(users.get(0).getAuthorities().iterator().next().getName()).isEqualTo("ROLE_USER");
    }

    @Test
    void adminUserDTOsToUsersMapWithNullAuthoritiesStringShouldReturnUserWithEmptyAuthorities() {
        adminUserDTO.setAuthorities(null);

        List<AdminUserDTO> adminUserDTOs = new ArrayList<>();
        adminUserDTOs.add(adminUserDTO);

        List<User> users = userMapper.userDTOsToUsers(adminUserDTOs);

        assertThat(users).isNotEmpty().size().isEqualTo(1);
        assertThat(users.get(0).getAuthorities()).isNotNull();
        assertThat(users.get(0).getAuthorities()).isEmpty();
    }

    @Test
    void userFromId() {
        assertThat(userMapper.userFromId(DEFAULT_ID).getId()).isEqualTo(DEFAULT_ID);
        assertThat(userMapper.userFromId(null)).isNull();
    }
}
