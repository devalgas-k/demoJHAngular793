package com.demo.service.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import javax.persistence.Lob;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.demo.domain.Job} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class JobDTO implements Serializable {

    private Long id;

    @NotNull
    private String jobTitle;

    private BigDecimal minSalary;

    private Long maxSalary;

    private Float subSalary;

    private Double totalSalary;

    private LocalDate date;

    private UUID codeCode;

    @Lob
    private byte[] profil;

    private String profilContentType;
    private Set<TaskDTO> tasks = new HashSet<>();

    private EmployeeDTO employee;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public BigDecimal getMinSalary() {
        return minSalary;
    }

    public void setMinSalary(BigDecimal minSalary) {
        this.minSalary = minSalary;
    }

    public Long getMaxSalary() {
        return maxSalary;
    }

    public void setMaxSalary(Long maxSalary) {
        this.maxSalary = maxSalary;
    }

    public Float getSubSalary() {
        return subSalary;
    }

    public void setSubSalary(Float subSalary) {
        this.subSalary = subSalary;
    }

    public Double getTotalSalary() {
        return totalSalary;
    }

    public void setTotalSalary(Double totalSalary) {
        this.totalSalary = totalSalary;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public UUID getCodeCode() {
        return codeCode;
    }

    public void setCodeCode(UUID codeCode) {
        this.codeCode = codeCode;
    }

    public byte[] getProfil() {
        return profil;
    }

    public void setProfil(byte[] profil) {
        this.profil = profil;
    }

    public String getProfilContentType() {
        return profilContentType;
    }

    public void setProfilContentType(String profilContentType) {
        this.profilContentType = profilContentType;
    }

    public Set<TaskDTO> getTasks() {
        return tasks;
    }

    public void setTasks(Set<TaskDTO> tasks) {
        this.tasks = tasks;
    }

    public EmployeeDTO getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeDTO employee) {
        this.employee = employee;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof JobDTO)) {
            return false;
        }

        JobDTO jobDTO = (JobDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, jobDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "JobDTO{" +
            "id=" + getId() +
            ", jobTitle='" + getJobTitle() + "'" +
            ", minSalary=" + getMinSalary() +
            ", maxSalary=" + getMaxSalary() +
            ", subSalary=" + getSubSalary() +
            ", totalSalary=" + getTotalSalary() +
            ", date='" + getDate() + "'" +
            ", codeCode='" + getCodeCode() + "'" +
            ", profil='" + getProfil() + "'" +
            ", tasks=" + getTasks() +
            ", employee=" + getEmployee() +
            "}";
    }
}
