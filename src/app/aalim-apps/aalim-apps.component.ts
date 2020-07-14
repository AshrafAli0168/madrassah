import { NzMessageService } from 'ng-zorro-antd/message';
import { MadrasaService } from './../new-services/madrasa.service';
import { Madrasa } from './../shared/sharedModels';
import { AalimService } from './../new-services/aalim.service';
import { Subscription } from 'rxjs';
import { UserService } from './../services/login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../shared/sharedModels';
import { map, switchMap } from 'rxjs/operators';
import { from as fromPromise, Observable } from 'rxjs';

@Component({
  selector: 'app-aalim-apps',
  templateUrl: './aalim-apps.component.html',
  styleUrls: ['./aalim-apps.component.css'],
})
export class AalimAppsComponent implements OnInit, OnDestroy {
  apps = [];
  user: User;
  userSub: Subscription;
  constructor(
    public userService: UserService,
    private aalimService: AalimService,
    private madrasaService: MadrasaService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.userSub = this.userService
      .getMe()
      .pipe(
        switchMap((user) => {
          this.user = user;
          if (user.userType == 'head')
            return this.aalimService.getAppsByHead(user.id);
          else {
            return this.aalimService.getAppsByUser(user.id);
          }
        })
      )
      .subscribe((apps) => {
        this.apps = apps;
      });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  //Approving Aalim Application
  approve(data) {
    this.aalimService
      .approveApplication(data)
      .then((result) => {
        this.message.success('Application has been approved');
      })
      .catch((err) => {
        this.message.success('There is an error.');
      });
  }
}
