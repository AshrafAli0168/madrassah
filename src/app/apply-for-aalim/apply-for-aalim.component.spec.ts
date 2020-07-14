import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyForAalimComponent } from './apply-for-aalim.component';

describe('ApplyForAalimComponent', () => {
  let component: ApplyForAalimComponent;
  let fixture: ComponentFixture<ApplyForAalimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyForAalimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyForAalimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
