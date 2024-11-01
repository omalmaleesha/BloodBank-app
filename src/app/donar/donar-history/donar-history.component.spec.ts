import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonarHistoryComponent } from './donar-history.component';

describe('DonarHistoryComponent', () => {
  let component: DonarHistoryComponent;
  let fixture: ComponentFixture<DonarHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonarHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonarHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
