import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersReservationListComponent } from './users-reservation-list.component';

describe('UsersReservationListComponent', () => {
  let component: UsersReservationListComponent;
  let fixture: ComponentFixture<UsersReservationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersReservationListComponent]
    });
    fixture = TestBed.createComponent(UsersReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
