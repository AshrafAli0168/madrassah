import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MadRegistrationComponent } from './mad-registration.component';

describe('MadRegistrationComponent', () => {
  let component: MadRegistrationComponent;
  let fixture: ComponentFixture<MadRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MadRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MadRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
