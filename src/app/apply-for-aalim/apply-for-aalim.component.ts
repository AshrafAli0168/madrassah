import { NzMessageService } from 'ng-zorro-antd/message';
import { AalimService } from './../new-services/aalim.service';
import { UserService } from './../services/login.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MadrasaService } from './../new-services/madrasa.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Madrasa, User } from '../shared/sharedModels';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-apply-for-aalim',
  templateUrl: './apply-for-aalim.component.html',
  styleUrls: ['./apply-for-aalim.component.css'],
})
export class ApplyForAalimComponent implements OnInit, OnDestroy {
  madaris: Madrasa[] = [];

  sub: Subscription;
  isSpinning = true;

  constructor(
    private madarisService: MadrasaService,
    private userService: UserService,
    private aalimService: AalimService,
    private message: NzMessageService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.madarisService.getMadaris().subscribe((data) => {
      this.madaris = data;
      this.isSpinning = false;
    });
  }

  submit(f: NgForm) {
    let application: any = {
      activationStatus: 'pending',
      bio: f.value.bio,
    };

    this.madarisService
      .getMadrasa(f.value.madrasaId)
      .pipe(
        switchMap((result: any) => {
          application.headId = result?.headId;
          application.madrasaId = result.id;
          application.location = result.city;

          return this.userService.getMe();
        })
      )
      .subscribe((result) => {
        application.phone = result.phoneNumber || 'Add Phone!';
        application.name = result.name || 'Update name!';
        application.userId = result.id;

        this.aalimService
          .addApplicaton(application)
          .then((result) => {
            this.message.success('Application has been submitted!');
          })
          .catch((err) => {
            this.message.error(
              'There is an error. Try again later.' + err.message
            );
          });
      });
  }
}
