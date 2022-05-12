import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterTotalComponent } from './counter-total.component';

describe('CounterTotalComponent', () => {
  let component: CounterTotalComponent;
  let fixture: ComponentFixture<CounterTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterTotalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
