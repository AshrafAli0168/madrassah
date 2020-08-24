import { NzMessageService } from 'ng-zorro-antd/message';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { MadrasaService } from './../../new-services/madrasa.service';
import { UserService } from './../../services/login.service';
import { User } from './../../shared/sharedModels';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
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
      if (user.isAdmin) {
        this.subscription = this.madrasaService
          .getEveryThingApplications()
          .subscribe(
            (data) => {
              this.dataSet = data;
              console.log(data);
              this.loading = false;
            },
            (err) => {
              console.log(err);
            }
          );
      } else {
        this.subscription = this.madrasaService
          .getStudentApplicationsByHead(user.id)
          .subscribe(
            (data) => {
              this.dataSet = data;
              console.log(data);

              this.loading = false;
            },
            (err) => {
              console.log(err);
            }
          );
      }
    });
  }

  approve(id) {
    let mRef = this.db.object('/madrasas/' + id);
    mRef
      .update({ activationStatus: true })
      .then((result) => {
        this.message.success('Approved');
      })
      .catch((err) => {
        this.message.error(err.message);
      });
  }
}
