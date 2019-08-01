import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistartionDialogComponent } from './registartion-dialog.component';

describe('RegistartionDialogComponent', () => {
  let component: RegistartionDialogComponent;
  let fixture: ComponentFixture<RegistartionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistartionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistartionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
