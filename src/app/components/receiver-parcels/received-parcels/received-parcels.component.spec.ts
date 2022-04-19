import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedParcelsComponent } from './received-parcels.component';

describe('ReceivedParcelsComponent', () => {
  let component: ReceivedParcelsComponent;
  let fixture: ComponentFixture<ReceivedParcelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedParcelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedParcelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
