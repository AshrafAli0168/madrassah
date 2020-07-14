import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MadrasaService } from './../new-services/madrasa.service';
import { Madrasa, User } from './../shared/sharedModels';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, Form } from '@angular/forms';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css'],
})
export class MadarisComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  noOfMadrasas;

  city = '';
  madrasas$: Observable<Madrasa[]>;

  cities = [];
  user = null;
  isSpinning = false;

  subscription: Subscription;
  subscription1: Subscription;
  userSub: Subscription;
  constructor(
    private madrasaService: MadrasaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private auth: AngularFireAuth
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
    if (this.userSub) this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.loading = true;
    this.userSub = this.auth.user.subscribe((user) => {
      this.user = user;
    });
    this.madrasas$ = this.madrasaService.getMadaris();

    this.subscription = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((x) => {
        if (x.city) {
          this.city = x.city;
          this.cityFilter();
        }
      });

    this.subscription1 = this.madrasaService
      .getLocations()
      .subscribe((locations) => {
        this.cities = locations;
      });
  }

  limit() {
    this.madrasas$ = this.madrasas$.pipe(
      map((cars) => cars.slice(0, this.noOfMadrasas))
    );
  }

  cityFilter() {
    this.madrasas$ = this.madrasas$.pipe(
      map((carsList) => {
        return carsList.filter((madrasa) => {
          if (this.city == '') return true;
          else {
            if (this.city.toLowerCase() == madrasa.city.toLowerCase())
              return true;
          }
        });
      })
    );
  }
  redirect() {
    this.router.navigate(['fleet', 'register']);
  }
}
