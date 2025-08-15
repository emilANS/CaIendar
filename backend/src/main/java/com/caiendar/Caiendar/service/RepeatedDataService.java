package com.caiendar.Caiendar.service;

import java.time.LocalDate;

public interface RepeatedDataService {
    public void checkForSpecialRepeatedDates(String[] dateName, Long userId, String language, LocalDate date);
}
