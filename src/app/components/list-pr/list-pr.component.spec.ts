import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrComponent } from './list-pr.component';

describe('ListPrComponent', () => {
  let component: ListPrComponent;
  let fixture: ComponentFixture<ListPrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
