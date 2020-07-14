import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AalimsComponent } from './aalims.component';

describe('AalimsComponent', () => {
  let component: AalimsComponent;
  let fixture: ComponentFixture<AalimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AalimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AalimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
