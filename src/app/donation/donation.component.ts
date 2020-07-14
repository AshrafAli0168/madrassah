import { DonationService } from './../donation.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgForm } from '@angular/forms';
import { MadrasaService } from './../new-services/madrasa.service';
import { Subscription } from 'rxjs';
import { Madrasa } from './../shared/sharedModels';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css'],
})
export class DonationComponent implements OnInit, OnDestroy {
  madaris: Madrasa[] = [];

  madSub: Subscription;
  constructor(
    private madService: MadrasaService,
    private message: NzMessageService,
    private donation: DonationService
  ) {}
  ngOnDestroy(): void {
    if (this.madSub) this.madSub.unsubscribe();
  }

  ngOnInit(): void {
    this.madService.getMadaris().subscribe((madaris) => {
      this.madaris = madaris;
    });
  }

  submit(f: NgForm) {
    if (!f.valid) {
      this.message.error('Please fill the form completely');
      return;
    }

    this.donation
      .addDonation(f.value)
      .then((result) => {
        this.message.success('Your donation has been recorded!');
      })
      .catch((err) => {
        this.message.error(err.message);
      });
  }
}
