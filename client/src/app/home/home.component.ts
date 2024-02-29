import {Component, OnInit} from '@angular/core';
import {catchError, interval, tap, throwError} from 'rxjs';
import {ActivatedRoute} from "@angular/router";
import {PaymentService} from "../service/payment.service";
import {CustomMessageService} from "../service/message-service/custom-message.service";
import {Payment, PaymentStatus} from "../model/payment";
import {TransactionData} from "../model/transaction-data";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  backgroundImageUrl: string = 'assets/river.avif'; // Initial image path
  imageIndex: number = 1; // Initial image index
  imagePaths: string[] = [
    'assets/river.avif',
    'assets/mountain.avif',
    'assets/nature.jpg'
    // Add more image paths as needed
  ];
  vehicleId: number | null = null;
  transactionData!:TransactionData;

  constructor(private route: ActivatedRoute,
              private paymentService: PaymentService,
              private messageService: CustomMessageService) {

  }

  ngOnInit() {
    interval(5000) // Emit value every 5 seconds
      .subscribe(() => {
        this.changeBackgroundImage();
      });

    this.route.queryParams.subscribe(params => {
      this.vehicleId = params['vehicleId'] || null; // Retrieve the vehicle ID from query params
      this.savePaymentAfterSuccessfullyPayment();
    });
  }


  changeBackgroundImage() {
    this.imageIndex = (this.imageIndex + 1) % this.imagePaths.length; // Cycle through image paths
    this.backgroundImageUrl = this.imagePaths[this.imageIndex];
  }

  savePaymentAfterSuccessfullyPayment() {
    if (this.vehicleId) {

      const vehicleId=this.vehicleId.toString();
      const wordBeforeQuestionMark = vehicleId.substring(0, vehicleId.indexOf('?'));
      const vehicleIdParam = vehicleId.split('=')[1]; // Extract value after '='
      const paymentResponse = atob(vehicleIdParam);
      this.transactionData=JSON.parse(paymentResponse);

      console.log(this.transactionData);
      const payment: Payment = {
        paymentNo:'',
         // Replace with actual payment number
        paymentStatus: PaymentStatus.SUCCESSFUL, // Set initial status as PENDING
        amount: parseInt(this.transactionData.total_amount), // Set the payment amount
        vehicleId: parseInt(wordBeforeQuestionMark) // Parse vehicle ID from query params
      };
      this.paymentService.makePayment(payment).pipe(
        tap(response => {
          this.messageService.showSuccess("Message", "Reserved Successfully.");
        }),
        catchError(error => {
          this.handleError(error);
          return throwError(error);
        })
      )
        .subscribe();
    } else {
      console.log('Vehicle ID not found');
    }
  }

  private handleError(error: any) {
    const errorMessage = error?.error?.message || 'Service not available';
    this.messageService.showError('Error:', errorMessage);
  }



}
