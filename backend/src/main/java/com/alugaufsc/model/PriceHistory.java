package com.alugaufsc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "price_history")
public class PriceHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id")
    @JsonIgnore
    private Property property;

    private Integer year;
    private String dateLabel;
    private Double monthlyRent;
    private String notes;

    public PriceHistory() {}

    public PriceHistory(Integer year, String dateLabel, Double monthlyRent, String notes) {
        this.year = year;
        this.dateLabel = dateLabel;
        this.monthlyRent = monthlyRent;
        this.notes = notes;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Property getProperty() { return property; }
    public void setProperty(Property property) { this.property = property; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public String getDateLabel() { return dateLabel; }
    public void setDateLabel(String dateLabel) { this.dateLabel = dateLabel; }

    public Double getMonthlyRent() { return monthlyRent; }
    public void setMonthlyRent(Double monthlyRent) { this.monthlyRent = monthlyRent; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}

