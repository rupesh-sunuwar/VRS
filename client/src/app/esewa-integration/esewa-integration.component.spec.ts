import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsewaIntegrationComponent } from './esewa-integration.component';

describe('EsewaIntegrationComponent', () => {
  let component: EsewaIntegrationComponent;
  let fixture: ComponentFixture<EsewaIntegrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsewaIntegrationComponent]
    });
    fixture = TestBed.createComponent(EsewaIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
