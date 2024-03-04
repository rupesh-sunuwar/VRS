package com.project.vrs.postgres.repository;


import com.project.vrs.postgres.model.ContactForm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepo extends JpaRepository<ContactForm, Long> {

}
