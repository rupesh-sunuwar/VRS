package com.project.vrs.service.impl;


import com.project.vrs.enums.ConfigurationKey;
import com.project.vrs.enums.NotificationStatus;
import com.project.vrs.enums.ReservationStatus;
import com.project.vrs.mongo.settings.model.Notification;
import com.project.vrs.mongo.settings.repo.NotificationRepo;
import com.project.vrs.mongo.settings.service.DisplayMessage;
import com.project.vrs.postgres.model.ContactForm;
import com.project.vrs.postgres.model.Reservation;
import com.project.vrs.resources.response.GenericResponse;
import com.project.vrs.service.NotificationService;
import com.project.vrs.shared.utils.NarrationUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepo notificationRepo;
    private final DisplayMessage displayMessage;

    @Override
    public Notification saveNotificationForReservation(String userId, String notificationId, Reservation reservation) {
        log.info("Saving notification for user {}", userId);
        return saveNotification(userId,
                mapReservationData(reservation), getTitleFromStatus(reservation.getReservationStatus()
                ), getMessage(reservation.getReservationStatus())
        );
    }

    @Override
    public Notification saveNotificationForContactForm(String notificationId, String userId, ContactForm contactForm) {
        return null;
    }

    @Override
    public Notification saveNotificationBasedOnStatus(String notificationId, String userId, Map<String, String> properties, ReservationStatus reservationStatus, String title, String message) {
        return null;
    }

    @Override
    public Notification saveNotification(String notificationId, Map<String, String> properties, String title, String message) {

        Notification notification = new Notification();
        notification.setId(generateRandomLong());
        notification.setDriverId(properties.get("driver"));
        notification.setTitle(NarrationUtils.compileMessage(title, properties));
        notification.setMessage(NarrationUtils.compileMessage(message, properties));
        notification.setNotificationId(notificationId);
        notification.setUserId(notificationId);
        notification.setProperties(properties);
        notification.setNotificationStatus(NotificationStatus.PENDING);
        notification.setCreatedAt(new Date());
        log.info("Saving Notification Based on Status");

        return notificationRepo.save(notification);
    }

    public long generateRandomLong() {

        long randomLong = ThreadLocalRandom.current().nextLong(Long.MAX_VALUE);

        while (isDuplicate(randomLong)) {

            randomLong = ThreadLocalRandom.current().nextLong(Long.MAX_VALUE);
        }

        // Return the generated random long value
        return randomLong;
    }

    private boolean isDuplicate(long randomLong) {
        return notificationRepo.findById(randomLong).isPresent();
    }

    @Override
    public GenericResponse markNotificationReadStatusTrue(String id) {
        return null;
    }

    @Override
    public GenericResponse markAllNotificationReadStatusTrue(String id) {
        return null;
    }

    @Override
    public List<Notification> getNotificationByReadStatus(String userId, Pageable pageable) {
        return notificationRepo.findAllByUserIdOrDriverId(userId, userId);
    }

    private Map<String, String> mapReservationData(Reservation reservation) {
        log.info("Mapping Notification Data");
        Map<String, String> props = new HashMap<>();
        props.put("userId", reservation.getUser().getEmail());
        props.put("reservationId", String.valueOf(reservation.getId()));
        props.put("username", reservation.getUser().fullName());
        props.put("driver", reservation.getVehicle().getUsers().getEmail());

        return props;
    }

    private String getTitleFromStatus(ReservationStatus reservationStatus) {
        log.info("Getting Title on the basis of Status");
        return switch (reservationStatus) {
            case PENDING, IN_PROGRESS ->
                    displayMessage.retrieveResponseMessage(ConfigurationKey.NOTIFICATION_MESSAGE_INITIATED, "title");
            case CANCELLED ->
                    displayMessage.retrieveResponseMessage(ConfigurationKey.NOTIFICATION_MESSAGE_CANCELLED, "title");
            case COMPLETED ->
                    displayMessage.retrieveResponseMessage(ConfigurationKey.NOTIFICATION_MESSAGE_COMPLETED, "title");
            case CONFIRMED ->
                    displayMessage.retrieveResponseMessage(ConfigurationKey.NOTIFICATION_MESSAGE_CONFIRMED, "title");
        };
    }

    private String getMessage(ReservationStatus reservationStatus) {
        log.info("Getting Message from Status");
        return switch (reservationStatus) {
            case PENDING, IN_PROGRESS ->
                    displayMessage.retrieveResponseMessage(ConfigurationKey.NOTIFICATION_MESSAGE_INITIATED, "web");
            case CANCELLED ->
                    displayMessage.retrieveResponseMessage(ConfigurationKey.NOTIFICATION_MESSAGE_CANCELLED, "web");
            case COMPLETED ->
                    displayMessage.retrieveResponseMessage(ConfigurationKey.NOTIFICATION_MESSAGE_COMPLETED, "web");
            case CONFIRMED ->
                    displayMessage.retrieveResponseMessage(ConfigurationKey.NOTIFICATION_MESSAGE_CONFIRMED, "web");
        };
    }


}
