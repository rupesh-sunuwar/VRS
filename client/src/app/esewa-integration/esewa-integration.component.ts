import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-esewa-integration',
  templateUrl: './esewa-integration.component.html',
  styleUrls: ['./esewa-integration.component.scss']
})
export class EsewaIntegrationComponent {

  esewaForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.esewaForm = this.fb.group({
      amount: [100, Validators.required],
      tax_amount: [10, Validators.required],
      total_amount: [110, Validators.required],
      transaction_uuid: ['', Validators.required],
      product_code: ['EPAYTEST', Validators.required],
      product_service_charge: [0, Validators.required],
      product_delivery_charge: [0, Validators.required],
      success_url: ['http://localhost:4200/payment', Validators.required],
      failure_url: ['https://google.com', Validators.required],
      signed_field_names: ['total_amount,transaction_uuid,product_code', Validators.required],
      signature: ['', Validators.required],
    });
  }

  submitMyFormBro() {
    this.generateUUIDandSignature();

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

    document.body.appendChild(myform);
    myform.submit();
  }

  generateUUIDandSignature() {
    const randomNumber = () => Math.floor(Math.random() * 10);
    const digitString =
      `${randomNumber()}${randomNumber()}-${randomNumber()}${randomNumber()}${randomNumber()}-${randomNumber()}${randomNumber()}`;
    this.esewaForm.patchValue({ transaction_uuid: digitString });

    let total_amount = (document.getElementById("total_amount") as HTMLInputElement)?.value;
    let transaction_uuid = (document.getElementById("transaction_uuid") as HTMLInputElement)?.value;
    let product_code = (document.getElementById("product_code") as HTMLInputElement)?.value;
    let secret = (document.getElementById("secret") as HTMLInputElement)?.value;
    let hash = CryptoJS.HmacSHA256(`total_amount=$
    {total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`, `${secret}`);
    let hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    this.esewaForm.patchValue({ signature: hashInBase64 });
  }
}
