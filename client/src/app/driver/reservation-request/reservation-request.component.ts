import {Component} from '@angular/core';
import {ReservationResponse, ReservationStatus} from "../../model/reservation-response";
import {BookingServiceService} from "../../service/booking-service.service";
import {LoginService} from "../../auth/login.service";
import {tap} from "rxjs";
import {CustomMessageService} from "../../service/message-service/custom-message.service";
import {MatDialog} from "@angular/material/dialog";
import {CancelConfirmationComponent} from "../../cancel-confirmation/cancel-confirmation.component";
import {GenericResponse} from "../../model/generic-response";
import {AcceptConfirmationComponent} from "../../accept-confirmation/accept-confirmation.component";

@Component({
  selector: 'app-reservation-request',
  templateUrl: './reservation-request.component.html',
  styleUrls: ['./reservation-request.component.scss']
})
export class ReservationRequestComponent {
  reservations: ReservationResponse[] = []; // Array to hold reservation data

  constructor(private bookingService: BookingServiceService,
              private loginService: LoginService,
              private messageService: CustomMessageService,
              public dialog: MatDialog) {
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

  acceptReservation(bookingNo: string) {
    this.changeReservationStatus(bookingNo, ReservationStatus.CONFIRMED);
  }

  rejectReservation(bookingNo: string) {
    this.changeReservationStatus(bookingNo, ReservationStatus.CANCELLED);
  }

  changeReservationStatus(bookingNo: string, reservationStatus: ReservationStatus) {
    let component: any;
    if (reservationStatus == ReservationStatus.CANCELLED) {
      component = CancelConfirmationComponent;
    } else {
      component = AcceptConfirmationComponent;
    }
    const dialogRef = this.dialog.open(component);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookingService.changeReservationStatus(bookingNo, reservationStatus).pipe(
          tap((response: GenericResponse) => {
            if (response.status_code === 200) {
              this.messageService.showSuccess("Successfully", "Accepted");
            } else {
              this.messageService.showError("Error", response.message);
            }
          })
        ).subscribe();
      }
    });
  }

  isButtonDisabled(reservationStatus: ReservationStatus): boolean {
    return (
      reservationStatus === ReservationStatus.CONFIRMED ||
      reservationStatus === ReservationStatus.CANCELLED ||
      reservationStatus === ReservationStatus.COMPLETED
    );
  }

  getColorForStatus(status: string): string {
    switch(status) {
      case 'CANCELLED':
        return 'red';
      case 'CONFIRMED':
        return 'blue';
      case 'COMPLETED':
        return 'green';
      default:
        return 'black'; // Default color
    }
  }
}
