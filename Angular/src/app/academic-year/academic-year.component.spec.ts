import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicYearComponent } from './academic-year.component';

describe('AcademicYearComponent', () => {
  let component: AcademicYearComponent;
  let fixture: ComponentFixture<AcademicYearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcademicYearComponent]
    });
    fixture = TestBed.createComponent(AcademicYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
