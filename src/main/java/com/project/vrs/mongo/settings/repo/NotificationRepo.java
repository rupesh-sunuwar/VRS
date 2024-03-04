package com.project.vrs.mongo.settings.repo;

import com.project.vrs.mongo.settings.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NotificationRepo extends MongoRepository<Notification, Long> {
}
