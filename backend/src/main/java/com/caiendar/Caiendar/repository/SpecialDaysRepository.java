package com.caiendar.Caiendar.repository;

import com.caiendar.Caiendar.model.RepeatedDates;
import com.caiendar.Caiendar.model.SpecialDays;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpecialDaysRepository extends JpaRepository<SpecialDays, Long> {
}
