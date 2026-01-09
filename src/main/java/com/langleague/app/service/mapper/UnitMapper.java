package com.langleague.app.service.mapper;

import com.langleague.app.domain.Book;
import com.langleague.app.domain.Unit;
import com.langleague.app.service.dto.BookDTO;
import com.langleague.app.service.dto.UnitDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Unit} and its DTO {@link UnitDTO}.
 */
@Mapper(componentModel = "spring")
public interface UnitMapper extends EntityMapper<UnitDTO, Unit> {
    @Mapping(target = "book", source = "book", qualifiedByName = "bookId")
    UnitDTO toDto(Unit s);

    @Named("bookId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    BookDTO toDtoBookId(Book book);
}
