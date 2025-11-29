package com.langleague.service;

import com.langleague.service.dto.ChapterDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ChapterService {
    ChapterDTO save(ChapterDTO chapterDTO);
    ChapterDTO update(ChapterDTO chapterDTO);
    Optional<ChapterDTO> partialUpdate(ChapterDTO chapterDTO);
    Page<ChapterDTO> findAll(Pageable pageable);
    List<ChapterDTO> findAllByBookId(Long bookId);
    Optional<ChapterDTO> findOne(Long id);
    void delete(Long id);
}
