package com.alugaufsc.repository;

import com.alugaufsc.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, String>, JpaSpecificationExecutor<Property> {

    List<Property> findByAvailableTrue();

    List<Property> findByNeighborhoodIgnoreCase(String neighborhood);
}

