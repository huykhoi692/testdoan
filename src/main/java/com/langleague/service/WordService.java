package com.langleague.service;

import com.langleague.service.dto.WordDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface WordService {
    WordDTO save(WordDTO wordDTO);
    WordDTO update(WordDTO wordDTO);
    Optional<WordDTO> partialUpdate(WordDTO wordDTO);
    Page<WordDTO> findAll(Pageable pageable);
    List<WordDTO> findAllByLessonId(Long lessonId);
    Optional<WordDTO> findOne(Long id);
    void delete(Long id);
}
