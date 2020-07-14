import { UserService } from '../services/login.service';
import { NgForm } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AalimService } from '../new-services/aalim.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { MadrasaService } from '../new-services/madrasa.service';
import { Madrasa, Aalim, User } from '../shared/sharedModels';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take, map } from 'rxjs/operators';
import { Subscription, combineLatest } from 'rxjs';
import { app } from 'firebase';

@Component({
  selector: 'app-singl-car',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css'],
})
export class SingleCarComponent implements OnInit {
  madrasa: Madrasa;
  user: User;
  spin = false;

  appSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private madrasaService: MadrasaService,
    private db: AngularFireDatabase,
    private aalimService: AalimService,
    private message: NzMessageService,
    private auth: UserService
  ) {}

  MadSub: Subscription;
  aalims;
  AalimSub: Subscription;
  userSub: Subscription;

  ngOnInit(): void {
    this.MadSub = this.route.paramMap
      .pipe(
        switchMap((params) => {
          let carId = params.get('id');
          return this.madrasaService.getMadrasa(carId);
        })
      )
      .subscribe((mad) => {
        this.madrasa = mad;
        this.aalimService.getSpecificAalims(mad.id).subscribe((data) => {
          this.aalims = data;
        });
      });

    this.userSub = this.auth.getMe().subscribe((user) => {
      this.user = user;
    });
  }

  isVisible = false;
  selectedAalim;

  handleCancel() {
    this.isVisible = false;
  }

  handleOk(f) {
    if (f.valid) {
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

  openCall(a) {
    this.selectedAalim = a;

    this.isVisible = true;
  }

  getDate() {
    return new Date().toString();
  }
  submitApplication(f: NgForm) {
    this.spin = true;
    if (!this.user) {
      this.message.error('Pleae login');
      return;
    }

    this.appSub = this.madrasaService
      .checkStudentApplicationExistence(this.user.id)
      .subscribe((apps) => {
        console.log(apps);

        if (!apps) {
          this.madrasaService
            .addRegistrationApplication({
              ...f.value,
              date: new Date(),
              activationStatus: 'pending',
              userId: this.user.id,
              madrasaId: this.madrasa.id,
              headId: this.madrasa.headId,
            })
            .then((result) => {
              return this.db
                .object('/users/' + this.user?.id)
                .update({ userType: 'student' });
            })
            .then(() => {
              this.message.success('Application has been added');
              f.resetForm();
              this.spin = false;
              this.appSub.unsubscribe();
            })
            .catch((err) => {
              this.spin = false;
              console.log(err);
              this.appSub.unsubscribe();
            });
        } else {
          this.message.error('Your application already exists!');
          this.spin = false;
          this.appSub.unsubscribe();
        }
      });
  }
}
