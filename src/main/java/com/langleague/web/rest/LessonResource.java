package com.langleague.web.rest;

import com.langleague.service.LessonService;
import com.langleague.service.dto.LessonDTO;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LessonResource {

    private final Logger log = LoggerFactory.getLogger(LessonResource.class);
    private final LessonService lessonService;

    public LessonResource(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping("/lessons")
    public ResponseEntity<Map<String, Object>> getAllLessons(@RequestParam(required = false) Integer chapter) {
        List<LessonDTO> lessons = chapter != null ? lessonService.getLessonsByChapter(chapter) : lessonService.getAllLessonsWithProgress();

        List<Integer> chapters = lessonService.getAllChapters();

        // Calculate progress statistics - simplified without status field
        long completedLessons = 0;

        Map<String, Object> response = Map.of(
            "lessons",
            lessons,
            "chapters",
            chapters,
            "totalLessons",
            lessons.size(),
            "completedLessons",
            completedLessons,
            "bookInfo",
            Map.of(
                "title",
                "Korean Language Course",
                "titleKorean",
                "한국어 교과서",
                "level",
                "Beginner - Level 1",
                "image",
                "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400"
            )
        );

        return ResponseEntity.ok(response);
    }

    /**
     * {@code GET  /lessons/published} : Get all published lessons.
     * Use case 16: View assigned lessons
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lessons.
     */
    @GetMapping("/lessons/published")
    public ResponseEntity<List<LessonDTO>> getPublishedLessons() {
        log.debug("REST request to get all published lessons");
        List<LessonDTO> lessons = lessonService.getPublishedLessons();
        return ResponseEntity.ok().body(lessons);
    }

    /**
     * {@code GET  /lessons/chapter/:chapterId} : Get all lessons by chapter id.
     *
     * @param chapterId the id of the chapter.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lessons.
     */
    @GetMapping("/lessons/chapter/{chapterId}")
    public ResponseEntity<List<LessonDTO>> getLessonsByChapterId(@PathVariable Long chapterId) {
        log.debug("REST request to get Lessons by Chapter ID : {}", chapterId);
        List<LessonDTO> lessons = lessonService.findAllByChapterId(chapterId);
        return ResponseEntity.ok().body(lessons);
    }

    /**
     * {@code GET  /lessons/:id} : Get the "id" lesson.
     * Use case 17: View lesson details
     *
     * @param id the id of the lessonDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lessonDTO.
     */
    @GetMapping("/lessons/{id}")
    public ResponseEntity<LessonDTO> getLesson(@PathVariable Long id) {
        log.debug("REST request to get Lesson : {}", id);
        return lessonService.findOne(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * {@code GET  /lessons/search} : Search lessons.
     * Use case 18: Search lessons by name, topic, level or vocabulary
     *
     * @param keyword search keyword.
     * @param level filter by level (optional).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lessons.
     */
    @GetMapping("/lessons/search")
    public ResponseEntity<List<LessonDTO>> searchLessons(
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) String level
    ) {
        log.debug("REST request to search lessons with keyword: {} and level: {}", keyword, level);
        List<LessonDTO> lessons = lessonService.searchLessons(keyword, level);
        return ResponseEntity.ok().body(lessons);
    }

    /**
     * {@code GET  /lessons/recommendations} : Get lesson recommendations.
     * Use case 27: Get lesson recommendations appropriate for user level
     *
     * @param level user's current level.
     * @param limit maximum number of recommendations (default 10).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lessons.
     */
    @GetMapping("/lessons/recommendations")
    public ResponseEntity<List<LessonDTO>> getRecommendations(
        @RequestParam(required = false, defaultValue = "beginner") String level,
        @RequestParam(required = false, defaultValue = "10") int limit
    ) {
        log.debug("REST request to get lesson recommendations for level: {}", level);
        List<LessonDTO> lessons = lessonService.getRecommendations(level, limit);
        return ResponseEntity.ok().body(lessons);
    }

    /**
     * {@code PUT  /lessons/:id/publish} : Publish a lesson.
     * Use case 53: Hide/Show lessons (Admin)
     *
     * @param id the id of the lesson to publish.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lessonDTO.
     */
    @PutMapping("/lessons/{id}/publish")
    public ResponseEntity<LessonDTO> publishLesson(@PathVariable Long id) {
        log.debug("REST request to publish Lesson : {}", id);
        LessonDTO result = lessonService.publishLesson(id);
        return ResponseEntity.ok().body(result);
    }

    /**
     * {@code PUT  /lessons/:id/unpublish} : Unpublish a lesson.
     * Use case 53: Hide/Show lessons (Admin)
     *
     * @param id the id of the lesson to unpublish.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lessonDTO.
     */
    @PutMapping("/lessons/{id}/unpublish")
    public ResponseEntity<LessonDTO> unpublishLesson(@PathVariable Long id) {
        log.debug("REST request to unpublish Lesson : {}", id);
        LessonDTO result = lessonService.unpublishLesson(id);
        return ResponseEntity.ok().body(result);
    }
}
