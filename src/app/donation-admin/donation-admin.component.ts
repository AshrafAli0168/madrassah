import { Subscription } from 'rxjs';
import { DonationService } from './../donation.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-donation-admin',
  templateUrl: './donation-admin.component.html',
  styleUrls: ['./donation-admin.component.css'],
})
export class DonationAdminComponent implements OnInit, OnDestroy {
  donations = [];
  loading = true;
  donationSub: Subscription;

  constructor(private donationService: DonationService) {}
  ngOnDestroy(): void {
    if (this.donationSub) this.donationSub.unsubscribe();
  }

  ngOnInit(): void {
    this.donationService.getDonations().subscribe((d) => {
      this.donations = d;
      this.loading = false;
    });
  }
}
