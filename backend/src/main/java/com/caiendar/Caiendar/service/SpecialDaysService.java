package com.caiendar.Caiendar.service;

import com.caiendar.Caiendar.DTO.SpecialDayRequestDTO;
import com.caiendar.Caiendar.model.SpecialDays;

public interface SpecialDaysService {
    public SpecialDays addUserInfoToSpecialDay(SpecialDayRequestDTO specialDay);
}
