package com.demo.repository;

import com.demo.domain.Expertise;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Expertise entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExpertiseRepository extends JpaRepository<Expertise, Long> {}
