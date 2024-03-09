import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserKyComponent } from './view-user-ky.component';

describe('ViewUserKyComponent', () => {
  let component: ViewUserKyComponent;
  let fixture: ComponentFixture<ViewUserKyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewUserKyComponent]
    });
    fixture = TestBed.createComponent(ViewUserKyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
