package com.alugaufsc.controller;

import com.alugaufsc.model.University;
import com.alugaufsc.repository.UniversityRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/universities")
@CrossOrigin(origins = "*")
public class UniversityController {

    private final UniversityRepository universityRepository;

    public UniversityController(UniversityRepository universityRepository) {
        this.universityRepository = universityRepository;
    }

    @GetMapping
    public ResponseEntity<List<University>> getAllUniversities() {
        return ResponseEntity.ok(universityRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<University> getUniversityById(@PathVariable String id) {
        return universityRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

