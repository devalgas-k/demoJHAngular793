package com.demo.service;

import com.demo.service.dto.ExperienceDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.demo.domain.Experience}.
 */
public interface ExperienceService {
    /**
     * Save a experience.
     *
     * @param experienceDTO the entity to save.
     * @return the persisted entity.
     */
    ExperienceDTO save(ExperienceDTO experienceDTO);

    /**
     * Updates a experience.
     *
     * @param experienceDTO the entity to update.
     * @return the persisted entity.
     */
    ExperienceDTO update(ExperienceDTO experienceDTO);

    /**
     * Partially updates a experience.
     *
     * @param experienceDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ExperienceDTO> partialUpdate(ExperienceDTO experienceDTO);

    /**
     * Get all the experiences.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ExperienceDTO> findAll(Pageable pageable);

    /**
     * Get all the experiences with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ExperienceDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" experience.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ExperienceDTO> findOne(Long id);

    /**
     * Delete the "id" experience.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
