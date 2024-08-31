package com.demo.repository;

import com.demo.domain.Experience;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface ExperienceRepositoryWithBagRelationships {
    Optional<Experience> fetchBagRelationships(Optional<Experience> experience);

    List<Experience> fetchBagRelationships(List<Experience> experiences);

    Page<Experience> fetchBagRelationships(Page<Experience> experiences);
}
