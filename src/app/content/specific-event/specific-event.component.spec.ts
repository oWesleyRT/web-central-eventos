import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpecificEventComponent as SpecificEventComponent } from './specific-event.component';

describe('SpecificEventComponent', () => {
  let component: SpecificEventComponent;
  let fixture: ComponentFixture<SpecificEventComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
