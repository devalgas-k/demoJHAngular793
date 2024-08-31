package com.demo.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ExpertiseMapperTest {

    private ExpertiseMapper expertiseMapper;

    @BeforeEach
    public void setUp() {
        expertiseMapper = new ExpertiseMapperImpl();
    }
}
