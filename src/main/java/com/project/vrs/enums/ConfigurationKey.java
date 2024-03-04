package com.project.vrs.enums;

import lombok.Getter;

import java.util.Map;

@Getter
public enum ConfigurationKey {

    NOTIFICATION_MESSAGE_INITIATED(
            Map.of("web", "File {fileName} has Initiated for Approval",
                    "title", "Request Initiated for Approval")),

    NOTIFICATION_MESSAGE_APPROVED(
            Map.of("web", "Initiated File {fileName} Request Approved by: {initiator}",
                    "title", "File Request Approved")),

    NOTIFICATION_MESSAGE_REQUEST_FOR_APPROVAL_FOR_ASSIGNEE(
            Map.of("web", "Dear {assignee}, {username} has assigned a File {fileName} to you for approval",
                    "title", "Request Initiated for Approval")),

    NOTIFICATION_MESSAGE_REJECTED(
            Map.of("web", "Initiated File Request Rejected by: {initiator}",
                    "title", "File Request Rejected")),

    NOTIFICATION_MESSAGE_REJECTED_FOR_ASSIGNEE(
            Map.of("web", "Initiated File {fileName} Request Rejected by: {initiator}",
                    "title", "File Request Rejected")),

    NOTIFICATION_MESSAGE_CANCELLED(
            Map.of("web", "Initiated File {fileName} Request for  Cancelled successfully",
                    "title", "Cancelled Initiated Request"));

    private final Map<String, String> value;

    ConfigurationKey(Map<String, String> messageMap) {
        this.value = messageMap;
    }

}
