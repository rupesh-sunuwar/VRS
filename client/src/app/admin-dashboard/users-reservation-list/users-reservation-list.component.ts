import {Component} from '@angular/core';
import {ReservationResponse, ReservationStatus} from "../../model/reservation-response";
import {FormGroup} from "@angular/forms";
import {BookingServiceService} from "../../service/booking-service.service";
import {LoginService} from "../../auth/login.service";
import {CustomMessageService} from "../../service/message-service/custom-message.service";
import {MatDialog} from "@angular/material/dialog";
import {tap} from "rxjs";

@Component({
  selector: 'app-users-reservation-list',
  templateUrl: './users-reservation-list.component.html',
  styleUrls: ['./users-reservation-list.component.scss']
})
export class UsersReservationListComponent {
  reservations: ReservationResponse[] = []; // Array to hold reservation data
  esewaForm!: FormGroup;
  vehicleId!: number;
  amount!: number;


  constructor(private bookingService: BookingServiceService,
              private loginService: LoginService,
              private messageService: CustomMessageService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.reservationList(this.loginService.getSessionUserId());
  }

  reservationList(email: string) {
    this.bookingService.getAllUsersReservationList().pipe(
      tap(response => {
        console.log(response);
        this.reservations = response;
      })
    ).subscribe();
  }


  isButtonDisabled(reservationStatus: ReservationStatus): boolean {
    return (
      reservationStatus === ReservationStatus.CONFIRMED ||
      reservationStatus === ReservationStatus.CANCELLED ||
      reservationStatus === ReservationStatus.COMPLETED
    );
  }

}
