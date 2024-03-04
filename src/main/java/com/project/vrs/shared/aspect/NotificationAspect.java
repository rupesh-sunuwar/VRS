package com.project.vrs.shared.aspect;

import com.project.vrs.postgres.model.Reservation;
import com.project.vrs.service.NotificationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Component
@Aspect
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class NotificationAspect {

    NotificationService notificationService;

    @Around("@annotation(com.project.vrs.annotation.Notification)")
    public Object notificationForReservation(ProceedingJoinPoint joinPoint) throws Throwable {
        try {
            log.info("Saving Notification details.");
            Object proceedResult = joinPoint.proceed();
            if (proceedResult instanceof Reservation) {
                return notificationReservation((Reservation) proceedResult);
            }
            return proceedResult; // Return the result if it's not an instance of Reservation
        } catch (Throwable throwable) {
            throw throwable;
        }
    }

    public Reservation notificationReservation(Reservation reservation) {
        notificationService.saveNotificationForReservation(reservation.getUser().getEmail(), reservation.getUser().getEmail(), reservation);
        return reservation;
    }
}
