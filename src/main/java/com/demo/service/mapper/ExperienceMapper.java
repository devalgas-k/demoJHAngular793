package com.demo.service.mapper;

import com.demo.domain.Experience;
import com.demo.domain.Expertise;
import com.demo.service.dto.ExperienceDTO;
import com.demo.service.dto.ExpertiseDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Experience} and its DTO {@link ExperienceDTO}.
 */
@Mapper(componentModel = "spring")
public interface ExperienceMapper extends EntityMapper<ExperienceDTO, Experience> {
    @Mapping(target = "expertise", source = "expertise", qualifiedByName = "expertiseTitleSet")
    ExperienceDTO toDto(Experience s);

    @Mapping(target = "removeExpertise", ignore = true)
    Experience toEntity(ExperienceDTO experienceDTO);

    @Named("expertiseTitle")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    ExpertiseDTO toDtoExpertiseTitle(Expertise expertise);

    @Named("expertiseTitleSet")
    default Set<ExpertiseDTO> toDtoExpertiseTitleSet(Set<Expertise> expertise) {
        return expertise.stream().map(this::toDtoExpertiseTitle).collect(Collectors.toSet());
    }
}
