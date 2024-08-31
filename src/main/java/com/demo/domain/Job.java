package com.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Job.
 */
@Entity
@Table(name = "job")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Job implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "job_title", nullable = false, unique = true)
    private String jobTitle;

    @Column(name = "min_salary", precision = 21, scale = 2)
    private BigDecimal minSalary;

    @Column(name = "max_salary")
    private Long maxSalary;

    @Column(name = "sub_salary")
    private Float subSalary;

    @Column(name = "total_salary")
    private Double totalSalary;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "code")
    private UUID code;

    @Lob
    @Column(name = "profil", nullable = false)
    private byte[] profil;

    @NotNull
    @Column(name = "profil_content_type", nullable = false)
    private String profilContentType;

    @ManyToMany
    @JoinTable(name = "rel_job__task", joinColumns = @JoinColumn(name = "job_id"), inverseJoinColumns = @JoinColumn(name = "task_id"))
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "jobs" }, allowSetters = true)
    private Set<Task> tasks = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "jobs", "manager", "department" }, allowSetters = true)
    private Employee employee;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Job id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobTitle() {
        return this.jobTitle;
    }

    public Job jobTitle(String jobTitle) {
        this.setJobTitle(jobTitle);
        return this;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public BigDecimal getMinSalary() {
        return this.minSalary;
    }

    public Job minSalary(BigDecimal minSalary) {
        this.setMinSalary(minSalary);
        return this;
    }

    public void setMinSalary(BigDecimal minSalary) {
        this.minSalary = minSalary;
    }

    public Long getMaxSalary() {
        return this.maxSalary;
    }

    public Job maxSalary(Long maxSalary) {
        this.setMaxSalary(maxSalary);
        return this;
    }

    public void setMaxSalary(Long maxSalary) {
        this.maxSalary = maxSalary;
    }

    public Float getSubSalary() {
        return this.subSalary;
    }

    public Job subSalary(Float subSalary) {
        this.setSubSalary(subSalary);
        return this;
    }

    public void setSubSalary(Float subSalary) {
        this.subSalary = subSalary;
    }

    public Double getTotalSalary() {
        return this.totalSalary;
    }

    public Job totalSalary(Double totalSalary) {
        this.setTotalSalary(totalSalary);
        return this;
    }

    public void setTotalSalary(Double totalSalary) {
        this.totalSalary = totalSalary;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Job date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public UUID getCode() {
        return this.code;
    }

    public Job code(UUID code) {
        this.setCode(code);
        return this;
    }

    public void setCode(UUID code) {
        this.code = code;
    }

    public byte[] getProfil() {
        return this.profil;
    }

    public Job profil(byte[] profil) {
        this.setProfil(profil);
        return this;
    }

    public void setProfil(byte[] profil) {
        this.profil = profil;
    }

    public String getProfilContentType() {
        return this.profilContentType;
    }

    public Job profilContentType(String profilContentType) {
        this.profilContentType = profilContentType;
        return this;
    }

    public void setProfilContentType(String profilContentType) {
        this.profilContentType = profilContentType;
    }

    public Set<Task> getTasks() {
        return this.tasks;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public Job tasks(Set<Task> tasks) {
        this.setTasks(tasks);
        return this;
    }

    public Job addTask(Task task) {
        this.tasks.add(task);
        task.getJobs().add(this);
        return this;
    }

    public Job removeTask(Task task) {
        this.tasks.remove(task);
        task.getJobs().remove(this);
        return this;
    }

    public Employee getEmployee() {
        return this.employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Job employee(Employee employee) {
        this.setEmployee(employee);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Job)) {
            return false;
        }
        return id != null && id.equals(((Job) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Job{" +
            "id=" + getId() +
            ", jobTitle='" + getJobTitle() + "'" +
            ", minSalary=" + getMinSalary() +
            ", maxSalary=" + getMaxSalary() +
            ", subSalary=" + getSubSalary() +
            ", totalSalary=" + getTotalSalary() +
            ", date='" + getDate() + "'" +
            ", code='" + getCode() + "'" +
            ", profil='" + getProfil() + "'" +
            ", profilContentType='" + getProfilContentType() + "'" +
            "}";
    }
}
