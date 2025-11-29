package com.langleague.service.impl;

import com.langleague.domain.Chapter;
import com.langleague.repository.ChapterRepository;
import com.langleague.service.ChapterService;
import com.langleague.service.dto.ChapterDTO;
import com.langleague.service.mapper.ChapterMapper;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ChapterServiceImpl implements ChapterService {

    private final Logger log = LoggerFactory.getLogger(ChapterServiceImpl.class);

    private final ChapterRepository chapterRepository;
    private final ChapterMapper chapterMapper;

    public ChapterServiceImpl(ChapterRepository chapterRepository, ChapterMapper chapterMapper) {
        this.chapterRepository = chapterRepository;
        this.chapterMapper = chapterMapper;
    }

    @Override
    public ChapterDTO save(ChapterDTO chapterDTO) {
        log.debug("Request to save Chapter : {}", chapterDTO);
        Chapter chapter = chapterMapper.toEntity(chapterDTO);
        chapter = chapterRepository.save(chapter);
        return chapterMapper.toDto(chapter);
    }

    @Override
    public ChapterDTO update(ChapterDTO chapterDTO) {
        log.debug("Request to update Chapter : {}", chapterDTO);
        Chapter chapter = chapterMapper.toEntity(chapterDTO);
        chapter = chapterRepository.save(chapter);
        return chapterMapper.toDto(chapter);
    }

    @Override
    public Optional<ChapterDTO> partialUpdate(ChapterDTO chapterDTO) {
        log.debug("Request to partially update Chapter : {}", chapterDTO);

        return chapterRepository
            .findById(chapterDTO.getId())
            .map(existingChapter -> {
                chapterMapper.partialUpdate(existingChapter, chapterDTO);
                return existingChapter;
            })
            .map(chapterRepository::save)
            .map(chapterMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ChapterDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Chapters");
        return chapterRepository.findAll(pageable).map(chapterMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChapterDTO> findAllByBookId(Long bookId) {
        log.debug("Request to get all Chapters for Book : {}", bookId);
        return chapterRepository.findByBookIdOrderByOrderIndex(bookId).stream().map(chapterMapper::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ChapterDTO> findOne(Long id) {
        log.debug("Request to get Chapter : {}", id);
        return chapterRepository.findById(id).map(chapterMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Chapter : {}", id);
        chapterRepository.deleteById(id);
    }
}
