package com.project.vrs.service.impl;


import com.project.vrs.model.ContactForm;
import com.project.vrs.repository.MessageRepo;
import com.project.vrs.resources.response.GenericResponse;
import com.project.vrs.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepo messageRepo;

    @Override
    public GenericResponse postMessage(ContactForm contactForm) {

        messageRepo.save(contactForm);
        return new GenericResponse(1, "Contact Successfully posted.");
    }
}