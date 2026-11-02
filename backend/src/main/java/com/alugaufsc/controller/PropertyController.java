package com.alugaufsc.controller;

import com.alugaufsc.dto.ReviewRequestDTO;
import com.alugaufsc.model.Property;
import com.alugaufsc.model.Review;
import com.alugaufsc.service.PropertyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    /**
     * Lista imóveis filtrados com cálculo de distância em relação à universidade de referência
     */
    @GetMapping
    public ResponseEntity<List<Property>> getProperties(
            @RequestParam(required = false, defaultValue = "ufsc-trindade") String universityId,
            @RequestParam(required = false) Double radiusKm,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String bedrooms,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String furnished,
            @RequestParam(required = false) Boolean billsIncluded,
            @RequestParam(required = false) Boolean availableOnly,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "DISTANCE") String sortBy
    ) {
        List<Property> properties = propertyService.getFilteredProperties(
                universityId, radiusKm, minPrice, maxPrice, bedrooms, type, furnished, billsIncluded, availableOnly, search, sortBy
        );
        return ResponseEntity.ok(properties);
    }

    /**
     * Retorna detalhes completos de um imóvel
     */
    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(
            @PathVariable String id,
            @RequestParam(required = false, defaultValue = "ufsc-trindade") String universityId
    ) {
        return propertyService.getPropertyById(id, universityId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Registra nova avaliação e diagnóstico de estudante
     */
    @PostMapping("/{id}/reviews")
    public ResponseEntity<Review> addReview(
            @PathVariable String id,
            @Valid @RequestBody ReviewRequestDTO dto
    ) {
        Review review = propertyService.addReview(id, dto);
        return ResponseEntity.ok(review);
    }
}

