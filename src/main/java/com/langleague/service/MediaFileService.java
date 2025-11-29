package com.langleague.service;

import com.langleague.domain.MediaFile;
import com.langleague.repository.MediaFileRepository;
import com.langleague.service.dto.MediaFileDTO;
import com.langleague.service.mapper.MediaFileMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.langleague.domain.MediaFile}.
 */
@Service
@Transactional
public class MediaFileService {

    private static final Logger LOG = LoggerFactory.getLogger(MediaFileService.class);

    private final MediaFileRepository mediaFileRepository;

    private final MediaFileMapper mediaFileMapper;

    public MediaFileService(MediaFileRepository mediaFileRepository, MediaFileMapper mediaFileMapper) {
        this.mediaFileRepository = mediaFileRepository;
        this.mediaFileMapper = mediaFileMapper;
    }

    /**
     * Save a mediaFile.
     *
     * @param mediaFileDTO the entity to save.
     * @return the persisted entity.
     */
    public MediaFileDTO save(MediaFileDTO mediaFileDTO) {
        LOG.debug("Request to save MediaFile : {}", mediaFileDTO);
        MediaFile mediaFile = mediaFileMapper.toEntity(mediaFileDTO);
        mediaFile = mediaFileRepository.save(mediaFile);
        return mediaFileMapper.toDto(mediaFile);
    }

    /**
     * Update a mediaFile.
     *
     * @param mediaFileDTO the entity to save.
     * @return the persisted entity.
     */
    public MediaFileDTO update(MediaFileDTO mediaFileDTO) {
        LOG.debug("Request to update MediaFile : {}", mediaFileDTO);
        MediaFile mediaFile = mediaFileMapper.toEntity(mediaFileDTO);
        mediaFile = mediaFileRepository.save(mediaFile);
        return mediaFileMapper.toDto(mediaFile);
    }

    /**
     * Partially update a mediaFile.
     *
     * @param mediaFileDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<MediaFileDTO> partialUpdate(MediaFileDTO mediaFileDTO) {
        LOG.debug("Request to partially update MediaFile : {}", mediaFileDTO);

        return mediaFileRepository
            .findById(mediaFileDTO.getId())
            .map(existingMediaFile -> {
                mediaFileMapper.partialUpdate(existingMediaFile, mediaFileDTO);

                return existingMediaFile;
            })
            .map(mediaFileRepository::save)
            .map(mediaFileMapper::toDto);
    }

    /**
     * Get all the mediaFiles.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<MediaFileDTO> findAll(Pageable pageable) {
        LOG.debug("Request to get all MediaFiles");
        return mediaFileRepository.findAll(pageable).map(mediaFileMapper::toDto);
    }

    /**
     * Get one mediaFile by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<MediaFileDTO> findOne(Long id) {
        LOG.debug("Request to get MediaFile : {}", id);
        return mediaFileRepository.findById(id).map(mediaFileMapper::toDto);
    }

    /**
     * Delete the mediaFile by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        LOG.debug("Request to delete MediaFile : {}", id);
        mediaFileRepository.deleteById(id);
    }
}
