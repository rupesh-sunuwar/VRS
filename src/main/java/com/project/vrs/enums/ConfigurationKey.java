package com.project.vrs.enums;

import lombok.Getter;

import java.util.Map;

@Getter
public enum ConfigurationKey {

    NOTIFICATION_MESSAGE_INITIATED(
            Map.of("web", "Reservation request by {username} has Initiated for Approval",
                    "title", "Request Initiated for Reservation")),

    NOTIFICATION_MESSAGE_APPROVED(
            Map.of("web", "Initiated Reservation {fileName} Request Approved by: {username}",
                    "title", "Reservation Request Accepted")),

    NOTIFICATION_MESSAGE_REJECTED(
            Map.of("web", "Reservation Request Rejected by: {username}",
                    "title", "Reservation Request Rejected")),

    NOTIFICATION_MESSAGE_COMPLETED(
            Map.of("web", "Reservation Request Completed",
                    "title", "Reservation Request Completed")),

    NOTIFICATION_MESSAGE_CONFIRMED(
            Map.of("web", "Reservation Request Confirmed",
                    "title", "Reservation Request Confirmed.")),

    NOTIFICATION_MESSAGE_PAYMENT(
            Map.of("web", "Payment done by user: {username}",
                    "title", "Payment Completed")),

    NOTIFICATION_MESSAGE_CANCELLED(
            Map.of("web", "Reservation Request  Cancelled by  {username} .",
                    "title", "Cancelled Initiated Request"));

    private final Map<String, String> value;

    ConfigurationKey(Map<String, String> messageMap) {
        this.value = messageMap;
    }

}
