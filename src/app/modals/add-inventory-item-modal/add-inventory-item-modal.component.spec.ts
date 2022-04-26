import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInventoryItemModalComponent } from './add-inventory-item-modal.component';

describe('AddInventoryItemModalComponent', () => {
  let component: AddInventoryItemModalComponent;
  let fixture: ComponentFixture<AddInventoryItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInventoryItemModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInventoryItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
