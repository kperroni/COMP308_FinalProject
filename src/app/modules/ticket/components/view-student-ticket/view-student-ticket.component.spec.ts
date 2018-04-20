import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentTicketComponent } from './view-student-ticket.component';

describe('ViewStudentTicketComponent', () => {
  let component: ViewStudentTicketComponent;
  let fixture: ComponentFixture<ViewStudentTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStudentTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
