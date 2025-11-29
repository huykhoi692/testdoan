package com.langleague.service;

import com.langleague.domain.AppUser;
import com.langleague.domain.User;
import com.langleague.repository.AppUserRepository;
import com.langleague.service.dto.AppUserDTO;
import com.langleague.service.mapper.AppUserMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.langleague.domain.AppUser}.
 */
@Service
@Transactional
public class AppUserService {

    private static final Logger LOG = LoggerFactory.getLogger(AppUserService.class);

    private final AppUserRepository appUserRepository;

    private final AppUserMapper appUserMapper;

    public AppUserService(AppUserRepository appUserRepository, AppUserMapper appUserMapper) {
        this.appUserRepository = appUserRepository;
        this.appUserMapper = appUserMapper;
    }

    public AppUser createAppUserForNewUser(User user) {
        LOG.debug("Creating AppUser for new User: {}", user.getLogin());
        // Nếu AppUser đã tồn tại → trả về luôn
        Optional<AppUser> existing = appUserRepository.findByUser_Login(user.getLogin());
        if (existing.isPresent()) {
            LOG.warn("AppUser already exists for login: {}", user.getLogin());
            return existing.orElseThrow();
        }
        AppUser appUser = new AppUser();
        appUser.setUser(user);
        appUser.setDisplayName(user.getFirstName() + " " + user.getLastName());
        appUser.setBio("Hello, I'm new here!");
        appUser = appUserRepository.save(appUser);
        LOG.info("Created new AppUser (id={} login={})", appUser.getId(), user.getLogin());
        return appUser;
    }

    /**
     * Save a appUser.
     *
     * @param appUserDTO the entity to save.
     * @return the persisted entity.
     */
    public AppUserDTO save(AppUserDTO appUserDTO) {
        LOG.debug("Request to save AppUser : {}", appUserDTO);
        AppUser appUser = appUserMapper.toEntity(appUserDTO);
        appUser = appUserRepository.save(appUser);
        return appUserMapper.toDto(appUser);
    }

    /**
     * Update a appUser.
     *
     * @param appUserDTO the entity to save.
     * @return the persisted entity.
     */
    public AppUserDTO update(AppUserDTO appUserDTO) {
        LOG.debug("Request to update AppUser : {}", appUserDTO);
        AppUser appUser = appUserMapper.toEntity(appUserDTO);
        appUser = appUserRepository.save(appUser);
        return appUserMapper.toDto(appUser);
    }

    /**
     * Partially update a appUser.
     *
     * @param appUserDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<AppUserDTO> partialUpdate(AppUserDTO appUserDTO) {
        LOG.debug("Request to partially update AppUser : {}", appUserDTO);

        return appUserRepository
            .findById(appUserDTO.getId())
            .map(existingAppUser -> {
                appUserMapper.partialUpdate(existingAppUser, appUserDTO);

                return existingAppUser;
            })
            .map(appUserRepository::save)
            .map(appUserMapper::toDto);
    }

    /**
     * Get all the appUsers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<AppUserDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all AppUsers");
        return appUserRepository.findAll(pageable).map(appUserMapper::toDto);
    }

    /**
     * Get one appUser by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AppUserDTO> findOne(Long id) {
        LOG.debug("Request to get AppUser : {}", id);
        return appUserRepository.findById(id).map(appUserMapper::toDto);
    }

    /**
     * Get one AppUser by user login.
     *
     * @param login user login.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AppUserDTO> findByUserLogin(String login) {
        LOG.debug("Request to get AppUser by user login : {}", login);
        return appUserRepository.findByUser_Login(login).map(appUserMapper::toDto);
    }

    /**
     * Delete the appUser by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete AppUser : {}", id);
        appUserRepository.deleteById(id);
    }

    /**
     * Use case 10: Edit profile
     * Update personal information (displayName, bio)
     *
     * @param login user login
     * @param displayName display name
     * @param bio biography
     * @return updated AppUser
     */
    public Optional<AppUser> updateProfile(String login, String displayName, String bio) {
        LOG.debug("Request to update profile for user : {}", login);
        return appUserRepository
            .findByUser_Login(login)
            .map(appUser -> {
                if (displayName != null) appUser.setDisplayName(displayName);
                if (bio != null) appUser.setBio(bio);
                return appUserRepository.save(appUser);
            });
    }

    /**
     * Use case 13: Change avatar
     * Upload a new profile picture
     *
     * @param login user login
     * @param avatarUrl new avatar URL
     * @return updated AppUser
     */
    public Optional<AppUser> changeAvatar(String login, String avatarUrl) {
        LOG.debug("Request to change avatar for user : {}", login);
        return appUserRepository
            .findByUser_Login(login)
            .map(appUser -> {
                appUser.setAvatarUrl(avatarUrl);
                return appUserRepository.save(appUser);
            });
    }
}
