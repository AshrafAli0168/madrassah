import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, Madrasa } from '../shared/sharedModels';
import { Subscription } from 'rxjs';
import { MadrasaService } from '../new-services/madrasa.service';
import { UserService } from '../services/login.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css'],
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  dataSet = [];
  loading: boolean = true;
  subscription: Subscription;

  user: User;
  userSubscription: Subscription;
  constructor(
    private madrasaService: MadrasaService,
    private auth: UserService,
    private db: AngularFireDatabase,
    private message: NzMessageService
  ) {}
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loading = true;
    this.userSubscription = this.auth.getMe().subscribe((user) => {
      this.user = user;
      if (user.userType == 'head') {
        this.subscription = this.madrasaService
          .getStudentApplicationsByHead(user.id)
          .subscribe((apps) => {
            this.dataSet = apps;
            console.log(apps);
            this.loading = false;
          });
      }
    });
  }

  //aproving the application for student.
  approve(app) {
    this.db
      .object('/students/' + app.id)
      .update({
        activationStatus: 'approved',
      })
      .then((result) => {
        this.message.success('Application has been approved');
      });
  }
}
