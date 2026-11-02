package com.alugaufsc.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "properties")
public class Property {

    @Id
    private String id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String type; // INDIVIDUAL, COMPARTILHADO

    private String subtype; // Studio, Kitnet, Apê 2Q, República

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String neighborhood;

    private String city;
    private String cep;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    private Boolean available;

    @Column(nullable = false)
    private Double monthlyRent;

    private Double condoFee;
    private Double iptu;
    private Double insurance;

    private Boolean billsWaterIncluded;
    private Boolean billsPowerIncluded;
    private Boolean billsInternetIncluded;
    private Boolean billsCondoIncluded;
    private String billsSummary;

    private Integer bedrooms;
    private Integer bathrooms;
    private Integer areaM2;
    private Integer parkingSpots;
    private Integer floor;
    private String sunOrientation;

    private String furnishedStatus; // MOBILIADO, SEMI_MOBILIADO, SEM_MOBILIA

    @Column(length = 2000)
    private String furnitureItems; // Itens separados por vírgula

    @Column(length = 2000)
    private String amenities; // Comodidades separadas por vírgula

    @Column(length = 3000)
    private String description;

    @Column(length = 3000)
    private String photos; // URLs das fotos separadas por ponto e vírgula

    private String contactName;
    private String contactType;
    private String contactPhone;
    private String contactWhatsapp;
    private String contactEmail;
    private String contactCreci;

    private Double transparencyScore;

    @Embedded
    private StructuralReport structuralReport;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<PriceHistory> priceHistory = new ArrayList<>();

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Review> reviews = new ArrayList<>();

    @Transient
    private Double distanceKm;

    public Property() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getSubtype() { return subtype; }
    public void setSubtype(String subtype) { this.subtype = subtype; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getNeighborhood() { return neighborhood; }
    public void setNeighborhood(String neighborhood) { this.neighborhood = neighborhood; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getCep() { return cep; }
    public void setCep(String cep) { this.cep = cep; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public Boolean getAvailable() { return available; }
    public void setAvailable(Boolean available) { this.available = available; }

    public Double getMonthlyRent() { return monthlyRent; }
    public void setMonthlyRent(Double monthlyRent) { this.monthlyRent = monthlyRent; }

    public Double getCondoFee() { return condoFee; }
    public void setCondoFee(Double condoFee) { this.condoFee = condoFee; }

    public Double getIptu() { return iptu; }
    public void setIptu(Double iptu) { this.iptu = iptu; }

    public Double getInsurance() { return insurance; }
    public void setInsurance(Double insurance) { this.insurance = insurance; }

    public Boolean getBillsWaterIncluded() { return billsWaterIncluded; }
    public void setBillsWaterIncluded(Boolean billsWaterIncluded) { this.billsWaterIncluded = billsWaterIncluded; }

    public Boolean getBillsPowerIncluded() { return billsPowerIncluded; }
    public void setBillsPowerIncluded(Boolean billsPowerIncluded) { this.billsPowerIncluded = billsPowerIncluded; }

    public Boolean getBillsInternetIncluded() { return billsInternetIncluded; }
    public void setBillsInternetIncluded(Boolean billsInternetIncluded) { this.billsInternetIncluded = billsInternetIncluded; }

    public Boolean getBillsCondoIncluded() { return billsCondoIncluded; }
    public void setBillsCondoIncluded(Boolean billsCondoIncluded) { this.billsCondoIncluded = billsCondoIncluded; }

    public String getBillsSummary() { return billsSummary; }
    public void setBillsSummary(String billsSummary) { this.billsSummary = billsSummary; }

    public Integer getBedrooms() { return bedrooms; }
    public void setBedrooms(Integer bedrooms) { this.bedrooms = bedrooms; }

    public Integer getBathrooms() { return bathrooms; }
    public void setBathrooms(Integer bathrooms) { this.bathrooms = bathrooms; }

    public Integer getAreaM2() { return areaM2; }
    public void setAreaM2(Integer areaM2) { this.areaM2 = areaM2; }

    public Integer getParkingSpots() { return parkingSpots; }
    public void setParkingSpots(Integer parkingSpots) { this.parkingSpots = parkingSpots; }

    public Integer getFloor() { return floor; }
    public void setFloor(Integer floor) { this.floor = floor; }

    public String getSunOrientation() { return sunOrientation; }
    public void setSunOrientation(String sunOrientation) { this.sunOrientation = sunOrientation; }

    public String getFurnishedStatus() { return furnishedStatus; }
    public void setFurnishedStatus(String furnishedStatus) { this.furnishedStatus = furnishedStatus; }

    public String getFurnitureItems() { return furnitureItems; }
    public void setFurnitureItems(String furnitureItems) { this.furnitureItems = furnitureItems; }

    public String getAmenities() { return amenities; }
    public void setAmenities(String amenities) { this.amenities = amenities; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPhotos() { return photos; }
    public void setPhotos(String photos) { this.photos = photos; }

    public String getContactName() { return contactName; }
    public void setContactName(String contactName) { this.contactName = contactName; }

    public String getContactType() { return contactType; }
    public void setContactType(String contactType) { this.contactType = contactType; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getContactWhatsapp() { return contactWhatsapp; }
    public void setContactWhatsapp(String contactWhatsapp) { this.contactWhatsapp = contactWhatsapp; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getContactCreci() { return contactCreci; }
    public void setContactCreci(String contactCreci) { this.contactCreci = contactCreci; }

    public Double getTransparencyScore() { return transparencyScore; }
    public void setTransparencyScore(Double transparencyScore) { this.transparencyScore = transparencyScore; }

    public StructuralReport getStructuralReport() { return structuralReport; }
    public void setStructuralReport(StructuralReport structuralReport) { this.structuralReport = structuralReport; }

    public List<PriceHistory> getPriceHistory() { return priceHistory; }
    public void setPriceHistory(List<PriceHistory> priceHistory) { this.priceHistory = priceHistory; }

    public List<Review> getReviews() { return reviews; }
    public void setReviews(List<Review> reviews) { this.reviews = reviews; }

    public Double getDistanceKm() { return distanceKm; }
    public void setDistanceKm(Double distanceKm) { this.distanceKm = distanceKm; }
}

