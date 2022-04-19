import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnReceivedParcelsComponent } from './un-received-parcels.component';

describe('UnReceivedParcelsComponent', () => {
  let component: UnReceivedParcelsComponent;
  let fixture: ComponentFixture<UnReceivedParcelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnReceivedParcelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnReceivedParcelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
