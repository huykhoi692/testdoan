package com.langleague.service.impl;

import com.langleague.domain.LessonWord;
import com.langleague.domain.Word;
import com.langleague.repository.LessonWordRepository;
import com.langleague.repository.WordRepository;
import com.langleague.service.WordService;
import com.langleague.service.dto.WordDTO;
import com.langleague.service.mapper.WordMapper;
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
public class WordServiceImpl implements WordService {

    private final Logger log = LoggerFactory.getLogger(WordServiceImpl.class);

    private final WordRepository wordRepository;
    private final LessonWordRepository lessonWordRepository;
    private final WordMapper wordMapper;

    public WordServiceImpl(WordRepository wordRepository, LessonWordRepository lessonWordRepository, WordMapper wordMapper) {
        this.wordRepository = wordRepository;
        this.lessonWordRepository = lessonWordRepository;
        this.wordMapper = wordMapper;
    }

    @Override
    public WordDTO save(WordDTO wordDTO) {
        log.debug("Request to save Word : {}", wordDTO);
        Word word = wordMapper.toEntity(wordDTO);
        word = wordRepository.save(word);
        return wordMapper.toDto(word);
    }

    @Override
    public WordDTO update(WordDTO wordDTO) {
        log.debug("Request to update Word : {}", wordDTO);
        Word word = wordMapper.toEntity(wordDTO);
        word = wordRepository.save(word);
        return wordMapper.toDto(word);
    }

    @Override
    public Optional<WordDTO> partialUpdate(WordDTO wordDTO) {
        log.debug("Request to partially update Word : {}", wordDTO);

        return wordRepository
            .findById(wordDTO.getId())
            .map(existingWord -> {
                if (wordDTO.getText() != null) {
                    existingWord.setText(wordDTO.getText());
                }
                if (wordDTO.getMeaning() != null) {
                    existingWord.setMeaning(wordDTO.getMeaning());
                }
                if (wordDTO.getPronunciation() != null) {
                    existingWord.setPronunciation(wordDTO.getPronunciation());
                }
                if (wordDTO.getPartOfSpeech() != null) {
                    existingWord.setPartOfSpeech(wordDTO.getPartOfSpeech());
                }
                if (wordDTO.getImageUrl() != null) {
                    existingWord.setImageUrl(wordDTO.getImageUrl());
                }
                return existingWord;
            })
            .map(wordRepository::save)
            .map(wordMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<WordDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Words");
        return wordRepository.findAll(pageable).map(wordMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WordDTO> findAllByLessonId(Long lessonId) {
        log.debug("Request to get all Words by lesson ID : {}", lessonId);
        return lessonWordRepository
            .findByLessonId(lessonId)
            .stream()
            .map(LessonWord::getWord)
            .filter(java.util.Objects::nonNull)
            .map(word -> wordMapper.toDto(word))
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<WordDTO> findOne(Long id) {
        log.debug("Request to get Word : {}", id);
        return wordRepository.findById(id).map(wordMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Word : {}", id);
        wordRepository.deleteById(id);
    }
}
