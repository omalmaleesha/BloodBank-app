import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterHospitalPageComponent } from './register-hospital-page.component';

describe('RegisterHospitalPageComponent', () => {
  let component: RegisterHospitalPageComponent;
  let fixture: ComponentFixture<RegisterHospitalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterHospitalPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterHospitalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
