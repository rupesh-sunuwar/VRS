import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptConfirmationComponent } from './accept-confirmation.component';

describe('AcceptConfirmationComponent', () => {
  let component: AcceptConfirmationComponent;
  let fixture: ComponentFixture<AcceptConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptConfirmationComponent]
    });
    fixture = TestBed.createComponent(AcceptConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
