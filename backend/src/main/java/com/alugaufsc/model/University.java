package com.alugaufsc.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "universities")
public class University {

    @Id
    private String id; // Ex: "ufsc-trindade", "udesc-itacorubi"

    @Column(nullable = false)
    private String shortName;

    @Column(nullable = false)
    private String fullName;

    private String campus;

    private String city;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    private Integer defaultZoom;

    private String tag;

    @Column(length = 1000)
    private String description;

    public University() {}

    public University(String id, String shortName, String fullName, String campus, String city,
                      Double latitude, Double longitude, Integer defaultZoom, String tag, String description) {
        this.id = id;
        this.shortName = shortName;
        this.fullName = fullName;
        this.campus = campus;
        this.city = city;
        this.latitude = latitude;
        this.longitude = longitude;
        this.defaultZoom = defaultZoom;
        this.tag = tag;
        this.description = description;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getShortName() { return shortName; }
    public void setShortName(String shortName) { this.shortName = shortName; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getCampus() { return campus; }
    public void setCampus(String campus) { this.campus = campus; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public Integer getDefaultZoom() { return defaultZoom; }
    public void setDefaultZoom(Integer defaultZoom) { this.defaultZoom = defaultZoom; }

    public String getTag() { return tag; }
    public void setTag(String tag) { this.tag = tag; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}

