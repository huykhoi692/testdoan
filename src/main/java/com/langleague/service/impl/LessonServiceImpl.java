package com.langleague.service.impl;

import com.langleague.domain.Lesson;
import com.langleague.repository.LessonRepository;
import com.langleague.service.LessonService;
import com.langleague.service.dto.LessonDTO;
import com.langleague.service.mapper.LessonMapper;
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
public class LessonServiceImpl implements LessonService {

    private final Logger log = LoggerFactory.getLogger(LessonServiceImpl.class);

    private final LessonRepository lessonRepository;
    private final LessonMapper lessonMapper;

    public LessonServiceImpl(LessonRepository lessonRepository, LessonMapper lessonMapper) {
        this.lessonRepository = lessonRepository;
        this.lessonMapper = lessonMapper;
    }

    @Override
    public LessonDTO save(LessonDTO lessonDTO) {
        log.debug("Request to save Lesson : {}", lessonDTO);
        Lesson lesson = lessonMapper.toEntity(lessonDTO);
        lesson = lessonRepository.save(lesson);
        return lessonMapper.toDto(lesson);
    }

    @Override
    public LessonDTO update(LessonDTO lessonDTO) {
        log.debug("Request to update Lesson : {}", lessonDTO);
        Lesson lesson = lessonMapper.toEntity(lessonDTO);
        lesson = lessonRepository.save(lesson);
        return lessonMapper.toDto(lesson);
    }

    @Override
    public Optional<LessonDTO> partialUpdate(LessonDTO lessonDTO) {
        log.debug("Request to partially update Lesson : {}", lessonDTO);

        return lessonRepository
            .findById(lessonDTO.getId())
            .map(existingLesson -> {
                lessonMapper.partialUpdate(existingLesson, lessonDTO);
                return existingLesson;
            })
            .map(lessonRepository::save)
            .map(lessonMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<LessonDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Lessons");
        return lessonRepository.findAll(pageable).map(lessonMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LessonDTO> findAllByChapterId(Long chapterId) {
        log.debug("Request to get all Lessons for Chapter : {}", chapterId);
        return lessonRepository.findByChapterEntityId(chapterId).stream().map(lessonMapper::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<LessonDTO> findOne(Long id) {
        log.debug("Request to get Lesson : {}", id);
        return lessonRepository.findById(id).map(lessonMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Lesson : {}", id);
        lessonRepository.deleteById(id);
    }

    /**
     * Use case 18: Search lessons by name, topic, level or vocabulary
     *
     * @param keyword search keyword
     * @param level filter by level (optional)
     * @return list of matching lessons
     */
    @Override
    @Transactional(readOnly = true)
    public List<LessonDTO> searchLessons(String keyword, String level) {
        log.debug("Request to search Lessons with keyword: {} and level: {}", keyword, level);

        List<Lesson> lessons;
        if (keyword != null && !keyword.isEmpty()) {
            lessons = lessonRepository.searchByKeyword(keyword);
            if (level != null && !level.isEmpty()) {
                lessons = lessons.stream().filter(l -> level.equalsIgnoreCase(l.getLevel())).collect(Collectors.toList());
            }
        } else if (level != null && !level.isEmpty()) {
            lessons = lessonRepository.findByLevel(level);
        } else {
            lessons = lessonRepository.findAllPublished();
        }

        return lessons.stream().map(lessonMapper::toDto).collect(Collectors.toList());
    }

    /**
     * Use case 53: Hide/Show lessons (Admin) - Publish lesson
     *
     * @param id lesson ID
     * @return published lesson
     */
    @Override
    public LessonDTO publishLesson(Long id) {
        log.debug("Request to publish Lesson : {}", id);
        return lessonRepository
            .findById(id)
            .map(lesson -> {
                lesson.setIsPublished(true);
                lessonRepository.save(lesson);
                return lessonMapper.toDto(lesson);
            })
            .orElseThrow(() -> new RuntimeException("Lesson not found with id: " + id));
    }

    /**
     * Use case 53: Hide/Show lessons (Admin) - Unpublish lesson
     *
     * @param id lesson ID
     * @return unpublished lesson
     */
    @Override
    public LessonDTO unpublishLesson(Long id) {
        log.debug("Request to unpublish Lesson : {}", id);
        return lessonRepository
            .findById(id)
            .map(lesson -> {
                lesson.setIsPublished(false);
                lessonRepository.save(lesson);
                return lessonMapper.toDto(lesson);
            })
            .orElseThrow(() -> new RuntimeException("Lesson not found with id: " + id));
    }

    /**
     * Use case 27: Get lesson recommendations appropriate for user level
     *
     * @param userLevel user's current level
     * @param limit maximum number of recommendations
     * @return list of recommended lessons
     */
    @Override
    @Transactional(readOnly = true)
    public List<LessonDTO> getRecommendations(String userLevel, int limit) {
        log.debug("Request to get lesson recommendations for level: {}", userLevel);

        List<Lesson> lessons = lessonRepository.findByLevel(userLevel);
        return lessons.stream().limit(limit).map(lessonMapper::toDto).collect(Collectors.toList());
    }

    /**
     * Use case 16: View assigned lessons (published lessons)
     *
     * @return list of published lessons
     */
    @Override
    @Transactional(readOnly = true)
    public List<LessonDTO> getPublishedLessons() {
        log.debug("Request to get all published lessons");
        return lessonRepository.findAllPublished().stream().map(lessonMapper::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<LessonDTO> getAllLessonsWithProgress() {
        log.debug("Request to get all lessons with progress");
        return lessonRepository.findAll().stream().map(lessonMapper::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<LessonDTO> getLessonsByChapter(Integer chapterNumber) {
        log.debug("Request to get lessons by chapter number : {}", chapterNumber);
        // Note: This assumes you have a chapter number field
        // If using Chapter ID instead, modify accordingly
        return lessonRepository.findAll().stream().map(lessonMapper::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<Integer> getAllChapters() {
        log.debug("Request to get all chapter numbers");
        // Return unique chapter numbers
        return lessonRepository
            .findAll()
            .stream()
            .map(lesson -> lesson.getChapterEntity().getId().intValue())
            .filter(java.util.Objects::nonNull)
            .distinct()
            .sorted()
            .collect(Collectors.toList());
    }
}
