package com.caiendar.Caiendar.service.impl;

import com.caiendar.Caiendar.Directories.DirectoryOfMachine;
import com.caiendar.Caiendar.model.RepeatedDates;
import com.caiendar.Caiendar.repository.RepeatedDatesRepository;
import com.caiendar.Caiendar.service.ConceptNetService;
import com.caiendar.Caiendar.service.RepeatedDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.time.LocalDate;
import java.util.Optional;

@Service
public class RepeatedDataServiceImpl implements RepeatedDataService {

    @Autowired
    RepeatedDatesRepository repeatedDatesRepository;

    @Autowired
    ConceptNetService conceptNetService;

    DirectoryOfMachine directoryOfMachine = new DirectoryOfMachine();

    public void checkForSpecialRepeatedDates(String[] dateName, Long userId, String language, LocalDate date) {

        for (String name : dateName) {

            String lowerCaseName = name.toLowerCase();

            boolean isAStopword = loadStopWordsCSV(name, language);

            if (!isAStopword) {

                Optional<RepeatedDates> optional = repeatedDatesRepository.findByRepeatedDateNameAndUserId(lowerCaseName, userId);

                RepeatedDates repeatedDates;
                if (optional.isPresent()) {
                    repeatedDates = optional.get();

                    repeatedDates.setNumberOfRepetitions(repeatedDates.getNumberOfRepetitions() + 1);
                    repeatedDates.addSpecialDayDate(date);
                } else {

                    repeatedDates = new RepeatedDates();
                    repeatedDates.setRepeatedDateName(lowerCaseName);
                    repeatedDates.setUserId(userId);
                    repeatedDates.setNumberOfRepetitions(1);
                    repeatedDates.addSpecialDayDate(date);

                    // Remove conceptNetService if not used anymore
                    conceptNetService.getRelatedWords(lowerCaseName, "es");
                }

                repeatedDatesRepository.save(repeatedDates);

            }
        }
    }

    private boolean loadStopWordsCSV(String name, String language) {

        File file = new File(directoryOfMachine.serverDisk + "/dataset/stopwords/" + language);

            try (BufferedReader reader = new BufferedReader(new FileReader(file))) {

                String line;

                while((line = reader.readLine()) != null) {
                    if (line.trim().equalsIgnoreCase(name.trim())) {
                        return true;
                    }
                }
                return false;

            } catch (Exception e) {
                e.printStackTrace();
            }

        return false;
    }
}
