package com.demo.service.dto;

import com.demo.domain.enumeration.Contract;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.persistence.Lob;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.demo.domain.Experience} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ExperienceDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 256)
    @Pattern(regexp = "^[A-Z].*$")
    private String title;

    @NotNull
    @Size(max = 256)
    @Pattern(regexp = "^[A-Z].*$")
    private String company;

    @Lob
    private String description;

    @Lob
    private byte[] logoCompany;

    private String logoCompanyContentType;

    @NotNull
    private Boolean inProgress;

    @NotNull
    private Contract contract;

    private LocalDate startDate;

    private LocalDate endDate;

    private Set<ExpertiseDTO> expertise = new HashSet<>();

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

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getLogoCompany() {
        return logoCompany;
    }

    public void setLogoCompany(byte[] logoCompany) {
        this.logoCompany = logoCompany;
    }

    public String getLogoCompanyContentType() {
        return logoCompanyContentType;
    }

    public void setLogoCompanyContentType(String logoCompanyContentType) {
        this.logoCompanyContentType = logoCompanyContentType;
    }

    public Boolean getInProgress() {
        return inProgress;
    }

    public void setInProgress(Boolean inProgress) {
        this.inProgress = inProgress;
    }

    public Contract getContract() {
        return contract;
    }

    public void setContract(Contract contract) {
        this.contract = contract;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Set<ExpertiseDTO> getExpertise() {
        return expertise;
    }

    public void setExpertise(Set<ExpertiseDTO> expertise) {
        this.expertise = expertise;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExperienceDTO)) {
            return false;
        }

        ExperienceDTO experienceDTO = (ExperienceDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, experienceDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ExperienceDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", company='" + getCompany() + "'" +
            ", description='" + getDescription() + "'" +
            ", logoCompany='" + getLogoCompany() + "'" +
            ", inProgress='" + getInProgress() + "'" +
            ", contract='" + getContract() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", expertise=" + getExpertise() +
            "}";
    }
}
