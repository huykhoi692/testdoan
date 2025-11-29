package com.langleague.service.mapper;

import com.langleague.domain.Lesson;
import com.langleague.domain.MediaFile;
import com.langleague.service.dto.LessonDTO;
import com.langleague.service.dto.MediaFileDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link MediaFile} and its DTO {@link MediaFileDTO}.
 */
@Mapper(componentModel = "spring")
public interface MediaFileMapper extends EntityMapper<MediaFileDTO, MediaFile> {
    @Mapping(target = "lesson", source = "lesson", qualifiedByName = "lessonId")
    MediaFileDTO toDto(MediaFile s);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "lesson", ignore = true)
    void partialUpdate(@MappingTarget MediaFile entity, MediaFileDTO dto);

    @Named("lessonId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LessonDTO toDtoLessonId(Lesson lesson);
}
