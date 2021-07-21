import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HipaaWarningComponent} from './hipaa-warning.component';

describe('HipaaWarningComponent', () => {
  let component: HipaaWarningComponent;
  let fixture: ComponentFixture<HipaaWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HipaaWarningComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HipaaWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
