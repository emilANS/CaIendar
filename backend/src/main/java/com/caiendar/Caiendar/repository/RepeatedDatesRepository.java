package com.caiendar.Caiendar.repository;

import com.caiendar.Caiendar.model.RepeatedDates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RepeatedDatesRepository extends JpaRepository<RepeatedDates, Long> {
    Optional<RepeatedDates> findByRepeatedDateNameAndUserId(String name, Long userId);

    @Query("SELECT r FROM RepeatedDates r WHERE r.userId = :userId AND r.numberOfRepetitions > 2")
    List<RepeatedDates> findByUserId(@Param("userId") Long userId);
}
