package com.alugaufsc.service;

import com.alugaufsc.dto.ReviewRequestDTO;
import com.alugaufsc.model.Property;
import com.alugaufsc.model.Review;
import com.alugaufsc.model.University;
import com.alugaufsc.repository.PropertyRepository;
import com.alugaufsc.repository.ReviewRepository;
import com.alugaufsc.repository.UniversityRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final UniversityRepository universityRepository;
    private final ReviewRepository reviewRepository;
    private final DistanceCalculationService distanceService;

    public PropertyService(PropertyRepository propertyRepository,
                           UniversityRepository universityRepository,
                           ReviewRepository reviewRepository,
                           DistanceCalculationService distanceService) {
        this.propertyRepository = propertyRepository;
        this.universityRepository = universityRepository;
        this.reviewRepository = reviewRepository;
        this.distanceService = distanceService;
    }

    @Transactional(readOnly = true)
    public List<Property> getFilteredProperties(
            String universityId,
            Double radiusKm,
            Double minPrice,
            Double maxPrice,
            String bedrooms,
            String type,
            String furnished,
            Boolean billsIncluded,
            Boolean availableOnly,
            String search,
            String sortBy
    ) {
        // Busca a universidade de referência (default UFSC Trindade)
        University uni = universityRepository.findById(universityId != null ? universityId : "ufsc-trindade")
                .orElseGet(() -> universityRepository.findAll().stream().findFirst().orElse(null));

        List<Property> all = propertyRepository.findAll();

        return all.stream()
                .peek(p -> {
                    if (uni != null) {
                        double dist = distanceService.calculateDistanceKm(
                                uni.getLatitude(), uni.getLongitude(),
                                p.getLatitude(), p.getLongitude()
                        );
                        p.setDistanceKm(dist);
                    }
                })
                .filter(p -> {
                    // Filtro de Raio
                    if (radiusKm != null && p.getDistanceKm() != null && p.getDistanceKm() > radiusKm) {
                        return false;
                    }
                    // Filtro de Preço
                    if (minPrice != null && p.getMonthlyRent() < minPrice) return false;
                    if (maxPrice != null && p.getMonthlyRent() > maxPrice) return false;

                    // Quartos
                    if (bedrooms != null && !bedrooms.equals("ALL")) {
                        int b = Integer.parseInt(bedrooms);
                        if (b == 3) {
                            if (p.getBedrooms() < 3) return false;
                        } else if (!p.getBedrooms().equals(b)) {
                            return false;
                        }
                    }

                    // Tipo
                    if (type != null && !type.equals("ALL") && !p.getType().equalsIgnoreCase(type)) {
                        return false;
                    }

                    // Mobília
                    if (furnished != null && !furnished.equals("ALL") && !p.getFurnishedStatus().equalsIgnoreCase(furnished)) {
                        return false;
                    }

                    // Contas Inclusas
                    if (Boolean.TRUE.equals(billsIncluded)) {
                        boolean hasBills = Boolean.TRUE.equals(p.getBillsWaterIncluded()) ||
                                           Boolean.TRUE.equals(p.getBillsPowerIncluded()) ||
                                           Boolean.TRUE.equals(p.getBillsInternetIncluded()) ||
                                           Boolean.TRUE.equals(p.getBillsCondoIncluded());
                        if (!hasBills) return false;
                    }

                    // Apenas Disponíveis
                    if (Boolean.TRUE.equals(availableOnly) && !Boolean.TRUE.equals(p.getAvailable())) {
                        return false;
                    }

                    // Busca textual
                    if (search != null && !search.trim().isEmpty()) {
                        String q = search.toLowerCase().trim();
                        boolean matches = p.getTitle().toLowerCase().contains(q) ||
                                          p.getAddress().toLowerCase().contains(q) ||
                                          p.getNeighborhood().toLowerCase().contains(q);
                        if (!matches) return false;
                    }

                    return true;
                })
                .sorted(getComparator(sortBy))
                .collect(Collectors.toList());
    }

    private Comparator<Property> getComparator(String sortBy) {
        if ("PRICE_ASC".equalsIgnoreCase(sortBy)) {
            return Comparator.comparing(Property::getMonthlyRent);
        }
        if ("PRICE_DESC".equalsIgnoreCase(sortBy)) {
            return Comparator.comparing(Property::getMonthlyRent).reversed();
        }
        if ("TRANSPARENCY".equalsIgnoreCase(sortBy)) {
            return Comparator.comparing(Property::getTransparencyScore, Comparator.nullsLast(Comparator.reverseOrder()));
        }
        // Default: DISTANCE
        return Comparator.comparing(Property::getDistanceKm, Comparator.nullsLast(Comparator.naturalOrder()));
    }

    @Transactional(readOnly = true)
    public Optional<Property> getPropertyById(String id, String universityId) {
        Optional<Property> propOpt = propertyRepository.findById(id);
        if (propOpt.isPresent() && universityId != null) {
            universityRepository.findById(universityId).ifPresent(uni -> {
                Property p = propOpt.get();
                p.setDistanceKm(distanceService.calculateDistanceKm(
                        uni.getLatitude(), uni.getLongitude(),
                        p.getLatitude(), p.getLongitude()
                ));
            });
        }
        return propOpt;
    }

    @Transactional
    public Review addReview(String propertyId, ReviewRequestDTO dto) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new IllegalArgumentException("Imóvel não encontrado: " + propertyId));

        Review review = new Review();
        review.setId("rev-" + UUID.randomUUID().toString().substring(0, 8));
        review.setProperty(property);
        review.setStudentName(dto.getStudentName() != null ? dto.getStudentName() : "Estudante UFSC");
        review.setCourse(dto.getCourse() != null ? dto.getCourse() : "Graduação - UFSC");
        review.setPeriod(dto.getPeriod() != null ? dto.getPeriod() : "Residente 2025");
        review.setRating(dto.getRating() != null ? dto.getRating() : 5);
        review.setVerifiedResident(true);
        review.setTitle(dto.getTitle());
        review.setComment(dto.getComment());
        review.setPros(dto.getPros() != null ? String.join(";", dto.getPros()) : null);
        review.setCons(dto.getCons() != null ? String.join(";", dto.getCons()) : null);
        review.setCreatedAt(LocalDate.now());

        // Se informou nível de mofo, atualiza relatório estrutural
        if (dto.getMofoLevel() != null && property.getStructuralReport() != null) {
            property.getStructuralReport().setMofoLevel(dto.getMofoLevel());
        }

        return reviewRepository.save(review);
    }
}

