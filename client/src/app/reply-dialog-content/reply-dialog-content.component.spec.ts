import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyDialogContentComponent } from './reply-dialog-content.component';

describe('ReplyDialogContentComponent', () => {
  let component: ReplyDialogContentComponent;
  let fixture: ComponentFixture<ReplyDialogContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReplyDialogContentComponent]
    });
    fixture = TestBed.createComponent(ReplyDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
