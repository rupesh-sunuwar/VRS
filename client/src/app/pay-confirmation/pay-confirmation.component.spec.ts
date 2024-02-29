import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayConfirmationComponent } from './pay-confirmation.component';

describe('PayConfirmationComponent', () => {
  let component: PayConfirmationComponent;
  let fixture: ComponentFixture<PayConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayConfirmationComponent]
    });
    fixture = TestBed.createComponent(PayConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
