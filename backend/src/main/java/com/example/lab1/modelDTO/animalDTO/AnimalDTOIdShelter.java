package com.example.lab1.modelDTO.animalDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnimalDTOIdShelter {
    private Long animalId;
    private String name;
    private String type;
    private Double weight;
    private LocalDate dateOfBirth;
    private String breed;
    private Long shelterId;
}
