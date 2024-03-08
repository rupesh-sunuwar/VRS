package com.project.vrs.postgres.model;

import com.project.vrs.shared.domain.AbstractEntity;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class ContactForm extends AbstractEntity {
    private String name;
    private String email;
    private String subject;
    private String toUser;
    private String message;
    private String phoneNumber;
    private String company;
    private String country;
    private List<String> replies;
}
