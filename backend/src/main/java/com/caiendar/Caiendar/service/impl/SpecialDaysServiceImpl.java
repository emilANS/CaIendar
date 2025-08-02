package com.caiendar.Caiendar.service.impl;

import com.caiendar.Caiendar.DTO.SpecialDayRequestDTO;
import com.caiendar.Caiendar.model.SpecialDays;
import com.caiendar.Caiendar.model.User;
import com.caiendar.Caiendar.repository.SpecialDaysRepository;
import com.caiendar.Caiendar.repository.UserRepository;
import com.caiendar.Caiendar.service.SpecialDaysService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SpecialDaysServiceImpl implements SpecialDaysService {

    @Autowired
    SpecialDaysRepository specialDaysRepository;

    @Autowired
    UserRepository userRepository;

    public SpecialDays addUserInfoToSpecialDay(SpecialDayRequestDTO specialDay) {

        User user = userRepository.findById(specialDay.getIdOfUser()).orElse(null);

        if (user != null) {

            SpecialDays specialDaysToReturn = new SpecialDays();

            specialDaysToReturn.setUser(user);

            specialDaysToReturn.setSpecialDayDate(specialDay.getDate());

            specialDaysToReturn.setSpecialDayName(specialDay.getSpecialDayContent());

            return specialDaysToReturn;
        } else {
            throw new RuntimeException("User not encountered with ID: " + specialDay.getIdOfUser());
        }
    }

}
