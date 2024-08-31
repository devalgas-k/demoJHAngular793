package com.demo.web.rest;

import com.demo.repository.ExpertiseRepository;
import com.demo.service.ExpertiseService;
import com.demo.service.dto.ExpertiseDTO;
import com.demo.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.demo.domain.Expertise}.
 */
@RestController
@RequestMapping("/api")
public class ExpertiseResource {

    private final Logger log = LoggerFactory.getLogger(ExpertiseResource.class);

    private static final String ENTITY_NAME = "expertise";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExpertiseService expertiseService;

    private final ExpertiseRepository expertiseRepository;

    public ExpertiseResource(ExpertiseService expertiseService, ExpertiseRepository expertiseRepository) {
        this.expertiseService = expertiseService;
        this.expertiseRepository = expertiseRepository;
    }

    /**
     * {@code POST  /expertise} : Create a new expertise.
     *
     * @param expertiseDTO the expertiseDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new expertiseDTO, or with status {@code 400 (Bad Request)} if the expertise has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/expertise")
    public ResponseEntity<ExpertiseDTO> createExpertise(@Valid @RequestBody ExpertiseDTO expertiseDTO) throws URISyntaxException {
        log.debug("REST request to save Expertise : {}", expertiseDTO);
        if (expertiseDTO.getId() != null) {
            throw new BadRequestAlertException("A new expertise cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExpertiseDTO result = expertiseService.save(expertiseDTO);
        return ResponseEntity
            .created(new URI("/api/expertise/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /expertise/:id} : Updates an existing expertise.
     *
     * @param id the id of the expertiseDTO to save.
     * @param expertiseDTO the expertiseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated expertiseDTO,
     * or with status {@code 400 (Bad Request)} if the expertiseDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the expertiseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/expertise/{id}")
    public ResponseEntity<ExpertiseDTO> updateExpertise(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ExpertiseDTO expertiseDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Expertise : {}, {}", id, expertiseDTO);
        if (expertiseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, expertiseDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!expertiseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ExpertiseDTO result = expertiseService.update(expertiseDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, expertiseDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /expertise/:id} : Partial updates given fields of an existing expertise, field will ignore if it is null
     *
     * @param id the id of the expertiseDTO to save.
     * @param expertiseDTO the expertiseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated expertiseDTO,
     * or with status {@code 400 (Bad Request)} if the expertiseDTO is not valid,
     * or with status {@code 404 (Not Found)} if the expertiseDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the expertiseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/expertise/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ExpertiseDTO> partialUpdateExpertise(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ExpertiseDTO expertiseDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Expertise partially : {}, {}", id, expertiseDTO);
        if (expertiseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, expertiseDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!expertiseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ExpertiseDTO> result = expertiseService.partialUpdate(expertiseDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, expertiseDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /expertise} : get all the expertise.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of expertise in body.
     */
    @GetMapping("/expertise")
    public ResponseEntity<List<ExpertiseDTO>> getAllExpertise(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Expertise");
        Page<ExpertiseDTO> page = expertiseService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /expertise/:id} : get the "id" expertise.
     *
     * @param id the id of the expertiseDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the expertiseDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/expertise/{id}")
    public ResponseEntity<ExpertiseDTO> getExpertise(@PathVariable Long id) {
        log.debug("REST request to get Expertise : {}", id);
        Optional<ExpertiseDTO> expertiseDTO = expertiseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(expertiseDTO);
    }

    /**
     * {@code DELETE  /expertise/:id} : delete the "id" expertise.
     *
     * @param id the id of the expertiseDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/expertise/{id}")
    public ResponseEntity<Void> deleteExpertise(@PathVariable Long id) {
        log.debug("REST request to delete Expertise : {}", id);
        expertiseService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
