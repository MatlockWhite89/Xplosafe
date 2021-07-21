import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BadgeIssueComponent} from './badge-issue.component';

describe('BadgeIssueComponent', () => {
  let component: BadgeIssueComponent;
  let fixture: ComponentFixture<BadgeIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeIssueComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
