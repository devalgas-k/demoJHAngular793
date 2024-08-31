package com.demo.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.demo.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ExpertiseDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExpertiseDTO.class);
        ExpertiseDTO expertiseDTO1 = new ExpertiseDTO();
        expertiseDTO1.setId(1L);
        ExpertiseDTO expertiseDTO2 = new ExpertiseDTO();
        assertThat(expertiseDTO1).isNotEqualTo(expertiseDTO2);
        expertiseDTO2.setId(expertiseDTO1.getId());
        assertThat(expertiseDTO1).isEqualTo(expertiseDTO2);
        expertiseDTO2.setId(2L);
        assertThat(expertiseDTO1).isNotEqualTo(expertiseDTO2);
        expertiseDTO1.setId(null);
        assertThat(expertiseDTO1).isNotEqualTo(expertiseDTO2);
    }
}
