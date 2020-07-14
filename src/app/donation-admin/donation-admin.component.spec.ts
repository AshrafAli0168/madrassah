import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationAdminComponent } from './donation-admin.component';

describe('DonationAdminComponent', () => {
  let component: DonationAdminComponent;
  let fixture: ComponentFixture<DonationAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
