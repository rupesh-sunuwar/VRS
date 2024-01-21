import {Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MessageService} from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class CustomMessageService {
    constructor(private messageService: MessageService) {
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
}
