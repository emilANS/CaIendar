package com.caiendar.Caiendar.DTO;

import java.time.Instant;
import java.time.LocalDate;

public class SpecialDayRequestDTO {
    public LocalDate date;
    public String specialDayContent;
    public Long idOfUser;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getIdOfUser() {
        return idOfUser;
    }

    public void setIdOfUser(Long idOfUser) {
        this.idOfUser = idOfUser;
    }

    public String getSpecialDayContent() {
        return specialDayContent;
    }

    public void setSpecialDayContent(String specialDayContent) {
        this.specialDayContent = specialDayContent;
    }
}
