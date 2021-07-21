import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AnalyteExposureComponent} from './analyte-exposure.component';

describe('AnalyteExposureComponent', () => {
  let component: AnalyteExposureComponent;
  let fixture: ComponentFixture<AnalyteExposureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyteExposureComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyteExposureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
