package com.langleague.service.mapper;

import com.langleague.domain.*;
import com.langleague.service.dto.*;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Chapter} and its detailed DTO {@link ChapterDetailDTO}.
 */
@Mapper(
    componentModel = "spring",
    uses = {
        BookMapper.class,
        WordMapper.class,
        GrammarMapper.class,
        ListeningAudioMapper.class,
        ReadingPassageMapper.class,
        WritingTaskMapper.class,
        SpeakingTopicMapper.class,
    }
)
public interface ChapterDetailMapper {
    @Mapping(target = "book", source = "book")
    @Mapping(target = "words", source = "words")
    @Mapping(target = "grammars", source = "grammars")
    @Mapping(target = "listeningAudios", source = "listeningAudios")
    @Mapping(target = "readingPassages", source = "readingPassages")
    @Mapping(target = "writingTasks", source = "writingTasks")
    @Mapping(target = "speakingTopics", source = "speakingTopics")
    ChapterDetailDTO toDto(Chapter chapter);
}
