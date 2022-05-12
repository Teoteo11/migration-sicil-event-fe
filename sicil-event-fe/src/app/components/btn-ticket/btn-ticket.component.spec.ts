import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnTicketComponent } from './btn-ticket.component';

describe('BtnTicketComponent', () => {
  let component: BtnTicketComponent;
  let fixture: ComponentFixture<BtnTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
