import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianSidebar } from './technician-sidebar';

describe('TechnicianSidebar', () => {
  let component: TechnicianSidebar;
  let fixture: ComponentFixture<TechnicianSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicianSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
