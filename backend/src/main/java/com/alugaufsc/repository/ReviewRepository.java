package com.alugaufsc.repository;

import com.alugaufsc.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {
    List<Review> findByPropertyIdOrderByCreatedAtDesc(String propertyId);
}

