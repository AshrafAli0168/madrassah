import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AalimAppsComponent } from './aalim-apps.component';

describe('AalimAppsComponent', () => {
  let component: AalimAppsComponent;
  let fixture: ComponentFixture<AalimAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AalimAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AalimAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
