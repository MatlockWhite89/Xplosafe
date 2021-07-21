import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BadgeTurnInComponent} from './badge-turn-in.component';

describe('BadgeTurnInComponent', () => {
  let component: BadgeTurnInComponent;
  let fixture: ComponentFixture<BadgeTurnInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeTurnInComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeTurnInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
