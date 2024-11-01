import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCardsComponent } from './appointment-cards.component';

describe('AppointmentCardsComponent', () => {
  let component: AppointmentCardsComponent;
  let fixture: ComponentFixture<AppointmentCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
