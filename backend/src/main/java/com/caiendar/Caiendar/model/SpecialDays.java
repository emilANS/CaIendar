package com.caiendar.Caiendar.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class SpecialDays {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    private String specialDayName;

    private LocalDate specialDayDate;


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getSpecialDayDate() {
        return specialDayDate;
    }

    public void setSpecialDayDate(LocalDate specialDayDate) {
        this.specialDayDate = specialDayDate;
    }

    public String getSpecialDayName() {
        return specialDayName;
    }

    public void setSpecialDayName(String specialDayName) {
        this.specialDayName = specialDayName;
    }

}
