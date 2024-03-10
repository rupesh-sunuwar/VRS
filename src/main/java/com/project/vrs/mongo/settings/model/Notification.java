package com.project.vrs.mongo.settings.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.vrs.enums.NotificationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
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

    @JsonProperty("driver_id")
    private String driverId;

    private Map<String, String> properties;

    @JsonProperty("notification_status")
    private NotificationStatus notificationStatus;

    @JsonProperty("notification_read_status")
    private boolean notificationReadStatus;

    private boolean secured;

    @JsonProperty("notification_count")
    private long notificationCount;

    @JsonProperty("created_at")
    private Date createdAt;
}

