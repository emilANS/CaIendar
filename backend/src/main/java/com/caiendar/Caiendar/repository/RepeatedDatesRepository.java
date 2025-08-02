package com.caiendar.Caiendar.repository;

import com.caiendar.Caiendar.model.SpecialDays;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepeatedDatesRepository extends JpaRepository<SpecialDays, Long> {
}
