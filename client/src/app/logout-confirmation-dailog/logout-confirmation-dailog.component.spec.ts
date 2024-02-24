import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutConfirmationDailogComponent } from './logout-confirmation-dailog.component';

describe('LogoutConfirmationDailogComponent', () => {
  let component: LogoutConfirmationDailogComponent;
  let fixture: ComponentFixture<LogoutConfirmationDailogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogoutConfirmationDailogComponent]
    });
    fixture = TestBed.createComponent(LogoutConfirmationDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
