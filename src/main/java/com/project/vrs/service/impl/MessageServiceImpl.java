package com.project.vrs.service.impl;


import com.project.vrs.postgres.model.ContactForm;
import com.project.vrs.postgres.repository.MessageRepo;
import com.project.vrs.postgres.security.repository.UserRepository;
import com.project.vrs.resources.response.GenericResponse;
import com.project.vrs.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepo messageRepo;

    @Override
    public GenericResponse postMessage(ContactForm contactForm) {
        if (!contactForm.getReplies().isEmpty() || contactForm.getReplies()!=null) {
            ContactForm contactForm1 = messageRepo.findById(contactForm.getId()).orElseThrow();
            contactForm1.setReplies(contactForm.getReplies());
            messageRepo.save(contactForm);
        } else {
            messageRepo.save(contactForm);
        }
        return new GenericResponse(1, "Contact Successfully posted.");
    }

    @Override
    public List<ContactForm> getUsersMessage() {
        return messageRepo.findAll();
    }

    @Override
    public List<ContactForm> getMessageByUser(String email) {

        return messageRepo.findAllByEmailOrToUser(email, email);
    }
}
