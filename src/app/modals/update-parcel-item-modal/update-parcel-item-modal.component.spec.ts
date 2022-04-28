import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParcelItemModalComponent } from './update-parcel-item-modal.component';

describe('UpdateParcelItemModalComponent', () => {
  let component: UpdateParcelItemModalComponent;
  let fixture: ComponentFixture<UpdateParcelItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateParcelItemModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateParcelItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
