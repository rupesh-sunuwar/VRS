import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckStatusDialogComponent } from './check-status-dialog.component';

describe('CheckStatusDialogComponent', () => {
  let component: CheckStatusDialogComponent;
  let fixture: ComponentFixture<CheckStatusDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckStatusDialogComponent]
    });
    fixture = TestBed.createComponent(CheckStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
