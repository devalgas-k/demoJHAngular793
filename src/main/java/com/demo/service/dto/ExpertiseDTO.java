package com.demo.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.demo.domain.Expertise} entity.
 */
@Schema(description = "This is a expertise\nexpertise a class\n@author Devalgas")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ExpertiseDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 256)
    @Pattern(regexp = "^[A-Z].*$")
    private String title;

    @Lob
    private String description;

    @Min(value = 20)
    @Max(value = 100)
    private Integer level;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExpertiseDTO)) {
            return false;
        }

        ExpertiseDTO expertiseDTO = (ExpertiseDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, expertiseDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ExpertiseDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", level=" + getLevel() +
            "}";
    }
}
