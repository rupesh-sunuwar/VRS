package com.project.vrs.repository;


import com.project.vrs.model.ContactForm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepo extends JpaRepository<ContactForm, Long> {

}
