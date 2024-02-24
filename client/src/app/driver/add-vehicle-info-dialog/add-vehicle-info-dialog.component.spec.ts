import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleInfoDialogComponent } from './add-vehicle-info-dialog.component';

describe('AddVehicleInfoDialogComponent', () => {
  let component: AddVehicleInfoDialogComponent;
  let fixture: ComponentFixture<AddVehicleInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVehicleInfoDialogComponent]
    });
    fixture = TestBed.createComponent(AddVehicleInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
