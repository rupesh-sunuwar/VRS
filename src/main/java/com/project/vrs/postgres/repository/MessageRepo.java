package com.project.vrs.postgres.repository;


import com.project.vrs.postgres.model.ContactForm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface MessageRepo extends JpaRepository<ContactForm, Long> {

    List<ContactForm> findAllByEmailOrToUser(String name, String toUser);

    List<ContactForm> findByEmail(String email);

    List<ContactForm> findByToUser(String email);
}
