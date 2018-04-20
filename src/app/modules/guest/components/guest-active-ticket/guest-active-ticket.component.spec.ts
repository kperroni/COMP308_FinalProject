import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestActiveTicketComponent } from './guest-active-ticket.component';

describe('GuestActiveTicketComponent', () => {
  let component: GuestActiveTicketComponent;
  let fixture: ComponentFixture<GuestActiveTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestActiveTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestActiveTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
