package com.demo.service.mapper;

import com.demo.domain.Expertise;
import com.demo.service.dto.ExpertiseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Expertise} and its DTO {@link ExpertiseDTO}.
 */
@Mapper(componentModel = "spring")
public interface ExpertiseMapper extends EntityMapper<ExpertiseDTO, Expertise> {}
