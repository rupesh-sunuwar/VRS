package com.project.vrs.mongo.settings.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.vrs.enums.NotificationStatus;
import com.project.vrs.shared.domain.AbstractEntity;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Notification implements Serializable {

    private Long id;

    private String title;

    private String message;

    @JsonProperty("notification_id")
    private String notificationId;

    @JsonProperty("user_id")
    private String userId;

    private Map<String, String> properties;

    @JsonProperty("notification_status")
    private NotificationStatus notificationStatus;

    @JsonProperty("notification_read_status")
    private boolean notificationReadStatus;

    private boolean secured;

    @JsonProperty("notification_count")
    private long notificationCount;
}

