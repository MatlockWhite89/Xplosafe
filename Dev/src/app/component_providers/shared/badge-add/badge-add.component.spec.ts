import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BadgeAddComponent} from './badge-add.component';

describe('AccountManagementComponent', () => {
  let component: BadgeAddComponent;
  let fixture: ComponentFixture<BadgeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeAddComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
