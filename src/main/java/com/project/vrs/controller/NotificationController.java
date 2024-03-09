package com.project.vrs.controller;


import com.project.vrs.constant.Routes;
import com.project.vrs.mongo.settings.model.Notification;
import com.project.vrs.service.NotificationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class NotificationController {

    NotificationService notificationService;


    @GetMapping(Routes.USER_NOTIFICATION)
    List<Notification> getUserNotification(@PathVariable String userId) {

        return notificationService.getNotificationByReadStatus(userId, PageRequest.of(0, 10));

    }

}
