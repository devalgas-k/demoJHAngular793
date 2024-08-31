package com.demo.service.mapper;

import com.demo.domain.Message;
import com.demo.domain.Subject;
import com.demo.service.dto.MessageDTO;
import com.demo.service.dto.SubjectDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Message} and its DTO {@link MessageDTO}.
 */
@Mapper(componentModel = "spring")
public interface MessageMapper extends EntityMapper<MessageDTO, Message> {
    @Mapping(target = "subject", source = "subject", qualifiedByName = "subjectName")
    MessageDTO toDto(Message s);

    @Named("subjectName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    SubjectDTO toDtoSubjectName(Subject subject);
}
