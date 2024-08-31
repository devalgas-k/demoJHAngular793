package com.demo.domain;

import com.demo.domain.enumeration.Contract;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

/**
 * A Experience.
 */
@Entity
@Table(name = "experience")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Experience implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 256)
    @Pattern(regexp = "^[A-Z].*$")
    @Column(name = "title", length = 256, nullable = false)
    private String title;

    @NotNull
    @Size(max = 256)
    @Pattern(regexp = "^[A-Z].*$")
    @Column(name = "company", length = 256, nullable = false, unique = true)
    private String company;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "logo_company")
    private byte[] logoCompany;

    @Column(name = "logo_company_content_type")
    private String logoCompanyContentType;

    @NotNull
    @Column(name = "in_progress", nullable = false)
    private Boolean inProgress;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "contract", nullable = false)
    private Contract contract;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @ManyToMany
    @JoinTable(
        name = "rel_experience__expertise",
        joinColumns = @JoinColumn(name = "experience_id"),
        inverseJoinColumns = @JoinColumn(name = "expertise_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "experiences" }, allowSetters = true)
    private Set<Expertise> expertise = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Experience id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public Experience title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompany() {
        return this.company;
    }

    public Experience company(String company) {
        this.setCompany(company);
        return this;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getDescription() {
        return this.description;
    }

    public Experience description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getLogoCompany() {
        return this.logoCompany;
    }

    public Experience logoCompany(byte[] logoCompany) {
        this.setLogoCompany(logoCompany);
        return this;
    }

    public void setLogoCompany(byte[] logoCompany) {
        this.logoCompany = logoCompany;
    }

    public String getLogoCompanyContentType() {
        return this.logoCompanyContentType;
    }

    public Experience logoCompanyContentType(String logoCompanyContentType) {
        this.logoCompanyContentType = logoCompanyContentType;
        return this;
    }

    public void setLogoCompanyContentType(String logoCompanyContentType) {
        this.logoCompanyContentType = logoCompanyContentType;
    }

    public Boolean getInProgress() {
        return this.inProgress;
    }

    public Experience inProgress(Boolean inProgress) {
        this.setInProgress(inProgress);
        return this;
    }

    public void setInProgress(Boolean inProgress) {
        this.inProgress = inProgress;
    }

    public Contract getContract() {
        return this.contract;
    }

    public Experience contract(Contract contract) {
        this.setContract(contract);
        return this;
    }

    public void setContract(Contract contract) {
        this.contract = contract;
    }

    public LocalDate getStartDate() {
        return this.startDate;
    }

    public Experience startDate(LocalDate startDate) {
        this.setStartDate(startDate);
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return this.endDate;
    }

    public Experience endDate(LocalDate endDate) {
        this.setEndDate(endDate);
        return this;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Set<Expertise> getExpertise() {
        return this.expertise;
    }

    public void setExpertise(Set<Expertise> expertise) {
        this.expertise = expertise;
    }

    public Experience expertise(Set<Expertise> expertise) {
        this.setExpertise(expertise);
        return this;
    }

    public Experience addExpertise(Expertise expertise) {
        this.expertise.add(expertise);
        expertise.getExperiences().add(this);
        return this;
    }

    public Experience removeExpertise(Expertise expertise) {
        this.expertise.remove(expertise);
        expertise.getExperiences().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Experience)) {
            return false;
        }
        return id != null && id.equals(((Experience) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Experience{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", company='" + getCompany() + "'" +
            ", description='" + getDescription() + "'" +
            ", logoCompany='" + getLogoCompany() + "'" +
            ", logoCompanyContentType='" + getLogoCompanyContentType() + "'" +
            ", inProgress='" + getInProgress() + "'" +
            ", contract='" + getContract() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
