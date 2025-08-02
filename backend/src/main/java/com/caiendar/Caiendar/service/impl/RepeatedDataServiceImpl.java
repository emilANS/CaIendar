package com.caiendar.Caiendar.service.impl;

import com.caiendar.Caiendar.model.RepeatedDates;
import com.caiendar.Caiendar.repository.RepeatedDatesRepository;
import com.caiendar.Caiendar.service.RepeatedDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RepeatedDataServiceImpl implements RepeatedDataService {

    @Autowired
    RepeatedDatesRepository repeatedDatesRepository;

    public void checkForSpecialRepeatedDates(String[] dateName, Long userId) {

        for (String name: dateName) {
            Optional<RepeatedDates> optional = repeatedDatesRepository.findByRepeatedDateNameAndUserId(name, userId);

            RepeatedDates repeatedDates;
            if (optional.isPresent()) {
                repeatedDates = optional.get();

                repeatedDates.setNumberOfRepetitions(repeatedDates.getNumberOfRepetitions() + 1);
            } else {
                repeatedDates = new RepeatedDates();
                repeatedDates.setRepeatedDateName(name);
                repeatedDates.setUserId(userId);
                repeatedDates.setNumberOfRepetitions(1);
            }

            repeatedDatesRepository.save(repeatedDates);
        }

    }

}
