package com.project.vrs.service;

import com.project.vrs.model.ContactForm;
import com.project.vrs.resources.response.GenericResponse;

import java.util.List;

public interface MessageService {
    GenericResponse postMessage(ContactForm contactForm);

    List<ContactForm> getUsersMessage();
}
