import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiverInventoryComponent } from './receiver-inventory.component';

describe('ReceiverInventoryComponent', () => {
  let component: ReceiverInventoryComponent;
  let fixture: ComponentFixture<ReceiverInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiverInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiverInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
