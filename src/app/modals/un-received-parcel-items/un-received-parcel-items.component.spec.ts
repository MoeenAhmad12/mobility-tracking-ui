import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnReceivedParcelItemsComponent } from './un-received-parcel-items.component';

describe('UnReceivedParcelItemsComponent', () => {
  let component: UnReceivedParcelItemsComponent;
  let fixture: ComponentFixture<UnReceivedParcelItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnReceivedParcelItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnReceivedParcelItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
