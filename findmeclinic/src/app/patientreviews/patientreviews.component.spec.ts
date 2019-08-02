import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientreviewsComponent } from './patientreviews.component';

describe('PatientreviewsComponent', () => {
  let component: PatientreviewsComponent;
  let fixture: ComponentFixture<PatientreviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientreviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
