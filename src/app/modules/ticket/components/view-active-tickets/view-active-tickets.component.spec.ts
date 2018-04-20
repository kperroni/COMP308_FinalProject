import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActiveTicketsComponent } from './view-active-tickets.component';

describe('ViewActiveTicketsComponent', () => {
  let component: ViewActiveTicketsComponent;
  let fixture: ComponentFixture<ViewActiveTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewActiveTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewActiveTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
