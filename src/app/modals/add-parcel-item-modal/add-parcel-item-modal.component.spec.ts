import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParcelItemModalComponent } from './add-parcel-item-modal.component';

describe('AddParcelItemModalComponent', () => {
  let component: AddParcelItemModalComponent;
  let fixture: ComponentFixture<AddParcelItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParcelItemModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParcelItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
