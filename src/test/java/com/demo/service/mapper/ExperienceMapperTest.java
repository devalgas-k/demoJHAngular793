package com.demo.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ExperienceMapperTest {

    private ExperienceMapper experienceMapper;

    @BeforeEach
    public void setUp() {
        experienceMapper = new ExperienceMapperImpl();
    }
}
