import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBooking } from './assign-booking';

describe('AssignBooking', () => {
  let component: AssignBooking;
  let fixture: ComponentFixture<AssignBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignBooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignBooking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
