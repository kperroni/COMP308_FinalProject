import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrecedingTicketsComponent } from './view-preceding-tickets.component';

describe('ViewPrecedingTicketsComponent', () => {
  let component: ViewPrecedingTicketsComponent;
  let fixture: ComponentFixture<ViewPrecedingTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPrecedingTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrecedingTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
