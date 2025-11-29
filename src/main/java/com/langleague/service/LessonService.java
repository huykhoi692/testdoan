package com.langleague.service;

import com.langleague.service.dto.LessonDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LessonService {
    LessonDTO save(LessonDTO lessonDTO);
    LessonDTO update(LessonDTO lessonDTO);
    Optional<LessonDTO> partialUpdate(LessonDTO lessonDTO);
    Page<LessonDTO> findAll(Pageable pageable);
    List<LessonDTO> findAllByChapterId(Long chapterId);
    Optional<LessonDTO> findOne(Long id);
    void delete(Long id);

    // Use case 18: Search lessons by name, topic, level or vocabulary
    List<LessonDTO> searchLessons(String keyword, String level);

    // Use case 53: Hide/Show lessons (Admin)
    LessonDTO publishLesson(Long id);
    LessonDTO unpublishLesson(Long id);

    // Use case 27: Get lesson recommendations appropriate for user level
    List<LessonDTO> getRecommendations(String userLevel, int limit);

    // Use case 16: View assigned lessons (published lessons)
    List<LessonDTO> getPublishedLessons();

    // Get all lessons with progress for dashboard
    List<LessonDTO> getAllLessonsWithProgress();

    // Get lessons by chapter number
    List<LessonDTO> getLessonsByChapter(Integer chapterNumber);

    // Get all unique chapter numbers
    List<Integer> getAllChapters();
}
