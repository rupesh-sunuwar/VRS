import {Component} from '@angular/core';
import {ReservationResponse, ReservationStatus} from "../../model/reservation-response";
import {BookingServiceService} from "../../service/booking-service.service";
import {LoginService} from "../../auth/login.service";
import {tap} from "rxjs";
import {CustomMessageService} from "../../service/message-service/custom-message.service";

@Component({
  selector: 'app-reservation-request',
  templateUrl: './reservation-request.component.html',
  styleUrls: ['./reservation-request.component.scss']
})
export class ReservationRequestComponent {
  reservations: ReservationResponse[] = []; // Array to hold reservation data

  constructor(private bookingService: BookingServiceService,
              private loginService: LoginService,
              private messageService: CustomMessageService) {
  }

  ngOnInit(): void {

    this.reservationRequest(this.loginService.getSessionUserId());
  }

  reservationRequest(email: string) {
    this.bookingService.getReservationRequest(email).pipe(
      tap(response => {
        this.reservations = response;
      })
    ).subscribe();
  }

  acceptReservation(vehicleID: number) {

    this.bookingService.changeReservationStatus(vehicleID,ReservationStatus.CONFIRMED).pipe(
      tap(response => {
        this.messageService.showSuccess("Successfully", "Accepted")
      })).subscribe();
  }

  rejectReservation(reservation: ReservationResponse) {

  }
}
