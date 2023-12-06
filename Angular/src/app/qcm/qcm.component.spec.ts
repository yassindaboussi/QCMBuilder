import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QcmComponent } from './qcm.component';

describe('QcmComponent', () => {
  let component: QcmComponent;
  let fixture: ComponentFixture<QcmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QcmComponent]
    });
    fixture = TestBed.createComponent(QcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
