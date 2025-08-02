package com.caiendar.Caiendar.controller;

import com.caiendar.Caiendar.DTO.SpecialDayRequestDTO;
import com.caiendar.Caiendar.DTO.UserIdDTO;
import com.caiendar.Caiendar.model.SpecialDays;
import com.caiendar.Caiendar.model.User;
import com.caiendar.Caiendar.repository.RepeatedDatesRepository;
import com.caiendar.Caiendar.repository.SpecialDaysRepository;
import com.caiendar.Caiendar.repository.UserRepository;
import com.caiendar.Caiendar.service.RepeatedDataService;
import com.caiendar.Caiendar.service.SpecialDaysService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class SpecialDaysController {

    @Autowired
    SpecialDaysRepository specialDaysRepository;

    @Autowired
    SpecialDaysService specialDaysService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RepeatedDatesRepository repeatedDatesRepository;

    @Autowired
    RepeatedDataService repeatedDataService;

    @PostMapping("/createSpecialDay")
    public ResponseEntity<SpecialDays> createSpecialDay(@RequestBody SpecialDayRequestDTO specialDays) {

        SpecialDays specialDayToDb = specialDaysService.addUserInfoToSpecialDay(specialDays);

        specialDaysRepository.save(specialDayToDb);

        String[] name = specialDayToDb.getSpecialDayName().split(" ");

        return ResponseEntity.ok(specialDayToDb);

    }

    @PostMapping("/showUserSpecialDays")
    public ResponseEntity<?> showUserSpecialDays(@RequestBody UserIdDTO userIdDTO) {

        User user = userRepository.findById(userIdDTO.getId()).orElse(null);

        if (user != null) {
            return ResponseEntity.ok(user.getSpecialDays());
        } else {
            return ResponseEntity.ok("Failed to find special days of user because surely don't have a special day");
        }

    }

}
