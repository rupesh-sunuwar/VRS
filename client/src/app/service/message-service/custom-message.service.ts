import {Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MessageService} from "primeng/api";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "../../auth/login.service";
import {environment, route} from "../../env/environment";
import {ContactForm} from "../../model/contact-from";

@Injectable({
  providedIn: 'root'
})
export class CustomMessageService {

  private auth_url: string = environment.localhost + route.vrs_auth;
  constructor(private messageService: MessageService,
              private loginService:LoginService,
              private httpClient:HttpClient) {
  }

  showSuccess(summary: string, detail: string) {
    this.messageService.add({severity: 'success', summary: summary, detail: detail});
  }

  showError(summary: string, detail: string) {
    this.messageService.add({severity: 'error', summary: summary, detail: detail});
  }

  //if you want to show toast message in form submit for required field
  showErrors(formGroup: FormGroup) {
    this.messageService.clear(); // Clear all toasts
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.showErrors(control);
      } else {
        const controlErrors = control?.errors;
        if (controlErrors) {
          if (controlErrors["required"]) {
            this.showError('Error', `${key} is required`);
          }
        }
      }
    });
  }

  clear() {
    this.messageService.clear()
  }

  postContactForm(contactForm:ContactForm){

    const url = `${this.auth_url}post_message`; // Corrected URL construction
    return this.httpClient.post<any>(url, contactForm, {headers: this.getHeaders()});
  }

  getHeaders() {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.loginService.getToken()}`)
  }
}
