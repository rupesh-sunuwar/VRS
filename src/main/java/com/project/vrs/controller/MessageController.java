package com.project.vrs.controller;

import com.project.vrs.constant.Routes;
import com.project.vrs.model.ContactForm;
import com.project.vrs.resources.response.GenericResponse;
import com.project.vrs.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @PostMapping(Routes.POST_MESSAGE)
    public GenericResponse postMessage(@RequestBody ContactForm contactForm) {

        return messageService.postMessage(contactForm);
    }
}
