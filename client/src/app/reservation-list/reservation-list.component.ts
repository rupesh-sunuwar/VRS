import {Component} from '@angular/core';
import {ReservationResponse, ReservationStatus} from "../model/reservation-response";
import {BookingServiceService} from "../service/booking-service.service";
import {tap} from "rxjs";
import {LoginService} from "../auth/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as CryptoJS from "crypto-js";
import {CustomMessageService} from "../service/message-service/custom-message.service";
import {CancelConfirmationComponent} from "../cancel-confirmation/cancel-confirmation.component";
import {MatDialog} from "@angular/material/dialog";
import {PayConfirmationComponent} from "../pay-confirmation/pay-confirmation.component";

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent {
  reservations: ReservationResponse[] = []; // Array to hold reservation data
  esewaForm!: FormGroup;
  vehicleId!: string;
  amount!: number;


  constructor(private bookingService: BookingServiceService,
              private loginService: LoginService,
              private fb: FormBuilder,
              private messageService: CustomMessageService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.reservationList(this.loginService.getSessionUserId());
    this.createForm();
  }

  reservationList(email: string) {
    this.bookingService.getReservationList(email).pipe(
      tap(response => {
        console.log(response);
        this.reservations = response;
      })
    ).subscribe();
  }

  cancelReservation(reservation: ReservationResponse) {
    const dialogRef = this.dialog.open(CancelConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookingService.changeReservationStatus(reservation.booking_no, ReservationStatus.CANCELLED).pipe(
          tap(response => {
            this.messageService.showSuccess('Successfully', 'Cancelled Reservation Request.');
          })
        ).subscribe();
      }
    });
  }

  createForm() {
    const vehicle_id = this.vehicleId;
    this.esewaForm = this.fb.group({
      amount: [0, Validators.required],
      tax_amount: [0, Validators.required],
      total_amount: [0, Validators.required],
      transaction_uuid: ['', Validators.required],
      product_code: ['EPAYTEST', Validators.required],
      product_service_charge: [0, Validators.required],
      product_delivery_charge: [0, Validators.required],
      failure_url: ['https://google.com', Validators.required],
      success_url: `http://localhost:4200/home?vehicleId=${vehicle_id}`,
      signed_field_names: ['total_amount,transaction_uuid,product_code', Validators.required],
      signature: ['', Validators.required],
    });
  }

  submit(amount: number, vehicleId: string) {

    const dialogRef = this.dialog.open(PayConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Proceed with payment
        this.vehicleId = vehicleId;
        const vehicle_id = this.vehicleId;
        this.esewaForm.patchValue({
          amount: amount,
          total_amount: amount,
          success_url: `http://localhost:4200/home?vehicleId=${vehicle_id}`,
        });

        this.generateUUIDandSignature();
        console.log(this.esewaForm);
        const myform = document.createElement('form');
        myform.method = 'POST';
        myform.enctype = 'application/x-www-form-urlencoded';
        myform.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';
        myform.style.display = 'none';

        for (const key in this.esewaForm.value) {
          if (this.esewaForm.value.hasOwnProperty(key)) {
            const field = document.createElement('input');
            field.type = 'text';
            field.name = key;
            field.value = this.esewaForm.value[key];
            myform.appendChild(field);
          }
        }
        console.log(this.esewaForm);

        document.body.appendChild(myform);
        console.log(myform);
        myform.submit();
      }
    });
  }

  generateUUIDandSignature() {
    const randomNumber = () => Math.floor(Math.random() * 10);
    const digitString = `${randomNumber()}${randomNumber()}-${randomNumber()}${randomNumber()}${randomNumber()}-${randomNumber()}${randomNumber()}`;
    this.esewaForm.patchValue({transaction_uuid: digitString});

    const total_amount = this.esewaForm.get('total_amount')?.value;
    const transaction_uuid = this.esewaForm.get('transaction_uuid')?.value;
    const product_code = this.esewaForm.get('product_code')?.value;
    const secret = '8gBm/:&EnhH.1/q';

    const data = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(data, secret);
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    this.esewaForm.patchValue({signature: hashInBase64});
  }

  isButtonDisabled(reservationStatus: ReservationStatus): boolean {
    return (
      reservationStatus === ReservationStatus.CONFIRMED ||
      reservationStatus === ReservationStatus.CANCELLED ||
      reservationStatus === ReservationStatus.COMPLETED
    );
  }

  isPaymentEnabled(reservationStatus: ReservationStatus): boolean {
    return (
      reservationStatus === ReservationStatus.IN_PROGRESS ||
      reservationStatus === ReservationStatus.PENDING  ||
    reservationStatus === ReservationStatus.CANCELLED);
  }

  getColorForStatus(status: string): string {
    switch (status) {
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

