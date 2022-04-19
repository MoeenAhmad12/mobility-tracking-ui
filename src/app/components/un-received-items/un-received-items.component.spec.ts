import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnReceivedItemsComponent } from './un-received-items.component';

describe('UnReceivedItemsComponent', () => {
  let component: UnReceivedItemsComponent;
  let fixture: ComponentFixture<UnReceivedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnReceivedItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnReceivedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
