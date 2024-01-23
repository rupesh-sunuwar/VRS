import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDasboardComponent } from './driver-dasboard.component';

describe('DriverDasboardComponent', () => {
  let component: DriverDasboardComponent;
  let fixture: ComponentFixture<DriverDasboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriverDasboardComponent]
    });
    fixture = TestBed.createComponent(DriverDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
