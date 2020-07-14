import { NzMessageService } from 'ng-zorro-antd/message';
import { AalimService } from './../new-services/aalim.service';
import { Aalim } from './../shared/sharedModels';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Madrasa } from '../shared/sharedModels';
import { MadrasaService } from '../new-services/madrasa.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-aalims',
  templateUrl: './aalims.component.html',
  styleUrls: ['./aalims.component.css'],
})
export class AalimsComponent implements OnInit {
  loading: boolean = true;
  noOfMadrasas;

  city = '';
  aalims: Observable<Aalim[]>;

  cities = [];

  subscription: Subscription;
  subscription1: Subscription;
  constructor(
    private madrasaService: MadrasaService,
    private activatedRoute: ActivatedRoute,
    private aalimService: AalimService,
    private message: NzMessageService
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }

  ngOnInit(): void {
    this.loading = true;

    this.subscription = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((x) => {
        if (x.city) {
          this.city = x.city;
          this.cityFilter();
        }

        this.loading = false;
      });

    this.subscription1 = this.madrasaService
      .getLocations()
      .subscribe((locations) => {
        this.cities = locations;
      });

    this.aalims = this.aalimService.getAalims();
  }

  limit() {
    this.aalims = this.aalims.pipe(
      map((aalims: Aalim[]) => aalims.slice(0, this.noOfMadrasas))
    );
  }

  cityFilter() {
    this.aalims = this.aalims.pipe(
      map((aalims) => {
        return aalims.filter((aalims) => {
          if (this.city == '') return true;
          else {
            if (this.city.toLowerCase() == aalims.location.toLowerCase())
              return true;
          }
        });
      })
    );
  }

  isVisible = false;
  selectedAalim: Aalim;
  handleContact(f: NgForm) {
    if (f.valid) {
      this.aalimService
        .addContactToAalim(this.selectedAalim, {
          ...f.value,
          date: this.getDate(),
        })
        .then((result) => {
          this.message.success('Form has been submitted.');
          f.resetForm();
        })
        .catch((err) => {
          this.message.error(err.message);
        });
    } else {
      this.message.error(
        'There is problem in validating the form. Please fill controls."'
      );
    }
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk(f) {
    console.log(f);

    if (f.valid) {
      console.log(f);
      this.aalimService
        .addContactToAalim(this.selectedAalim, {
          ...f.value,
          date: this.getDate(),
        })
        .then(() => {
          this.message.success('Request has been added.');
          this.isVisible = false;
        })
        .catch((err) => {
          this.message.error(err.message);
        });
    } else {
      this.message.success('error');
      console.log(f);
    }
  }

  openCall(a: Aalim) {
    this.selectedAalim = a;
    this.isVisible = true;
  }

  getDate() {
    return new Date().toString();
  }
}
