import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnPaidItemsComponent } from './un-paid-items.component';

describe('UnPaidItemsComponent', () => {
  let component: UnPaidItemsComponent;
  let fixture: ComponentFixture<UnPaidItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnPaidItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnPaidItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
