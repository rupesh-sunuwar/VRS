package com.project.vrs.mongo.settings.repo;

import com.project.vrs.mongo.settings.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepo extends MongoRepository<Notification, Long> {

    List<Notification> findAllByUserIdOrDriverId(String userId, String driverId);
}
