import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FriendComponent } from './friend.component';

describe('FriendComponent', () => {
  let component: FriendComponent;
  let fixture: ComponentFixture<FriendComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
