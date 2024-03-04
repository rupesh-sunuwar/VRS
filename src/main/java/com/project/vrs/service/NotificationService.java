package com.project.vrs.service;

import com.project.vrs.enums.ReservationStatus;
import com.project.vrs.postgres.model.ContactForm;
import com.project.vrs.mongo.settings.model.Notification;
import com.project.vrs.postgres.model.Reservation;
import com.project.vrs.resources.response.GenericResponse;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface NotificationService {

    Notification saveNotificationForReservation(String userId, String notificationId, Reservation reservation);

    Notification saveNotificationForContactForm(String notificationId, String userId, ContactForm contactForm);


    Notification saveNotificationBasedOnStatus(
            String notificationId,
            String userId,
           Map<String, String> properties,
            ReservationStatus reservationStatus,
            String title,
            String message
    );

   Notification saveNotification(
            String notificationId,
            Map<String, String> properties,
            String title,
            String message
    );


    GenericResponse markNotificationReadStatusTrue(String id);


    GenericResponse markAllNotificationReadStatusTrue(String id);

    Notification getNotificationByReadStatus(String userId, Pageable pageable);
}
