import {Component} from '@angular/core';
import {ReservationResponse} from "../model/reservation-response";
import {BookingServiceService} from "../service/booking-service.service";
import {tap} from "rxjs";
import {LoginService} from "../auth/login.service";

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent {
  reservations: ReservationResponse[] = []; // Array to hold reservation data

  constructor(private bookingService:BookingServiceService,
              private loginService:LoginService) {
  }

  ngOnInit(): void {

    console.log(this.reservationList(this.loginService.getSessionUserId()));
    console.log("ReservationList")
  }

  reservationList(email:string){
    this.bookingService.getReservationList(email).pipe(
      tap(response=>{
        console.log(response);
         this.reservations=response;
      })
    ).subscribe();
  }
}

