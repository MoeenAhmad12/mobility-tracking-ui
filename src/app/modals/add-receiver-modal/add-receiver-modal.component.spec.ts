import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReceiverModalComponent } from './add-receiver-modal.component';

describe('AddReceiverModalComponent', () => {
  let component: AddReceiverModalComponent;
  let fixture: ComponentFixture<AddReceiverModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReceiverModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReceiverModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
