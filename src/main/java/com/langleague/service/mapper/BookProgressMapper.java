package com.langleague.service.mapper;

import com.langleague.domain.AppUser;
import com.langleague.domain.Book;
import com.langleague.domain.BookProgress;
import com.langleague.service.dto.AppUserDTO;
import com.langleague.service.dto.BookDTO;
import com.langleague.service.dto.BookProgressDTO;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

/**
 * Mapper for the entity {@link BookProgress} and its DTO {@link BookProgressDTO}.
 */
@Mapper(componentModel = "spring")
public interface BookProgressMapper extends EntityMapper<BookProgressDTO, BookProgress> {
    @Mapping(target = "appUser", source = "appUser", qualifiedByName = "appUserId")
    @Mapping(target = "book", source = "book", qualifiedByName = "bookId")
    BookProgressDTO toDto(BookProgress s);

    @Named("appUserId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AppUserDTO toDtoAppUserId(AppUser appUser);

    @Named("bookId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    BookDTO toDtoBookId(Book book);
}
