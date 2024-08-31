package com.demo.service;

import com.demo.service.dto.ExpertiseDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.demo.domain.Expertise}.
 */
public interface ExpertiseService {
    /**
     * Save a expertise.
     *
     * @param expertiseDTO the entity to save.
     * @return the persisted entity.
     */
    ExpertiseDTO save(ExpertiseDTO expertiseDTO);

    /**
     * Updates a expertise.
     *
     * @param expertiseDTO the entity to update.
     * @return the persisted entity.
     */
    ExpertiseDTO update(ExpertiseDTO expertiseDTO);

    /**
     * Partially updates a expertise.
     *
     * @param expertiseDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ExpertiseDTO> partialUpdate(ExpertiseDTO expertiseDTO);

    /**
     * Get all the expertise.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ExpertiseDTO> findAll(Pageable pageable);

    /**
     * Get the "id" expertise.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ExpertiseDTO> findOne(Long id);

    /**
     * Delete the "id" expertise.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
