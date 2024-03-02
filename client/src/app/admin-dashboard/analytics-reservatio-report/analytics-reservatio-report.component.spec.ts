import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsReservatioReportComponent } from './analytics-reservatio-report.component';

describe('AnalyticsReservatioReportComponent', () => {
  let component: AnalyticsReservatioReportComponent;
  let fixture: ComponentFixture<AnalyticsReservatioReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyticsReservatioReportComponent]
    });
    fixture = TestBed.createComponent(AnalyticsReservatioReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
