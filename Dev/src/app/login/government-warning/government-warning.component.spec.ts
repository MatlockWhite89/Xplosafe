import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GovernmentWarningComponent} from './government-warning.component';

describe('GovernmentWarningComponent', () => {
  let component: GovernmentWarningComponent;
  let fixture: ComponentFixture<GovernmentWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GovernmentWarningComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
