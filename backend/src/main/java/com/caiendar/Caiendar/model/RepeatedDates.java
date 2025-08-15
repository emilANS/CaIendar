package com.caiendar.Caiendar.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class RepeatedDates {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String repeatedDateName;

    private Integer numberOfRepetitions;

    private List<LocalDate> specialDayDate = new ArrayList<>();

    public void addSpecialDayDate(LocalDate date) {
        this.specialDayDate.add(date);
    }

    public List<LocalDate> getSpecialDayDate() {
        return specialDayDate;
    }

    public void setSpecialDayDate(List<LocalDate> specialDayDate) {
        this.specialDayDate = specialDayDate;
    }

    public Integer getNumberOfRepetitions() {
        return numberOfRepetitions;
    }

    public void setNumberOfRepetitions(Integer numberOfRepetitions) {
        this.numberOfRepetitions = numberOfRepetitions;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRepeatedDateName() {
        return repeatedDateName;
    }

    public void setRepeatedDateName(String repeatedDateName) {
        this.repeatedDateName = repeatedDateName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
