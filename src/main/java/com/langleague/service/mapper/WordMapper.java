package com.langleague.service.mapper;

import com.langleague.domain.Word;
import com.langleague.service.dto.WordDTO;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface WordMapper extends EntityMapper<WordDTO, Word> {
    @Mapping(target = "id", source = "id")
    @Mapping(target = "text", source = "text")
    @Mapping(target = "meaning", source = "meaning")
    @Mapping(target = "pronunciation", source = "pronunciation")
    @Mapping(target = "partOfSpeech", source = "partOfSpeech")
    @Mapping(target = "imageUrl", source = "imageUrl")
    WordDTO toDto(Word word);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "text", source = "text")
    @Mapping(target = "meaning", source = "meaning")
    @Mapping(target = "pronunciation", source = "pronunciation")
    @Mapping(target = "partOfSpeech", source = "partOfSpeech")
    @Mapping(target = "imageUrl", source = "imageUrl")
    Word toEntity(WordDTO wordDTO);
}
