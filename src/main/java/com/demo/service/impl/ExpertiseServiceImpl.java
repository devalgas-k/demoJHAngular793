package com.demo.service.impl;

import com.demo.domain.Expertise;
import com.demo.repository.ExpertiseRepository;
import com.demo.service.ExpertiseService;
import com.demo.service.dto.ExpertiseDTO;
import com.demo.service.mapper.ExpertiseMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Expertise}.
 */
@Service
@Transactional
public class ExpertiseServiceImpl implements ExpertiseService {

    private final Logger log = LoggerFactory.getLogger(ExpertiseServiceImpl.class);

    private final ExpertiseRepository expertiseRepository;

    private final ExpertiseMapper expertiseMapper;

    public ExpertiseServiceImpl(ExpertiseRepository expertiseRepository, ExpertiseMapper expertiseMapper) {
        this.expertiseRepository = expertiseRepository;
        this.expertiseMapper = expertiseMapper;
    }

    @Override
    public ExpertiseDTO save(ExpertiseDTO expertiseDTO) {
        log.debug("Request to save Expertise : {}", expertiseDTO);
        Expertise expertise = expertiseMapper.toEntity(expertiseDTO);
        expertise = expertiseRepository.save(expertise);
        return expertiseMapper.toDto(expertise);
    }

    @Override
    public ExpertiseDTO update(ExpertiseDTO expertiseDTO) {
        log.debug("Request to update Expertise : {}", expertiseDTO);
        Expertise expertise = expertiseMapper.toEntity(expertiseDTO);
        expertise = expertiseRepository.save(expertise);
        return expertiseMapper.toDto(expertise);
    }

    @Override
    public Optional<ExpertiseDTO> partialUpdate(ExpertiseDTO expertiseDTO) {
        log.debug("Request to partially update Expertise : {}", expertiseDTO);

        return expertiseRepository
            .findById(expertiseDTO.getId())
            .map(existingExpertise -> {
                expertiseMapper.partialUpdate(existingExpertise, expertiseDTO);

                return existingExpertise;
            })
            .map(expertiseRepository::save)
            .map(expertiseMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ExpertiseDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Expertise");
        return expertiseRepository.findAll(pageable).map(expertiseMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ExpertiseDTO> findOne(Long id) {
        log.debug("Request to get Expertise : {}", id);
        return expertiseRepository.findById(id).map(expertiseMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Expertise : {}", id);
        expertiseRepository.deleteById(id);
    }
}
