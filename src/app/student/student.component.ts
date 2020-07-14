import { AngularFireDatabase } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { UserService } from './../services/login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../shared/sharedModels';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  user: User;

  data = [];
  constructor(private auth: UserService, private db: AngularFireDatabase) {}
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.auth.getMe().subscribe((user) => {
      this.user = user;
      this.db
        .list('/students/', (ref) =>
          ref.orderByChild('userId').equalTo(user.id)
        )
        .valueChanges()
        .subscribe((data) => {
          this.data = data;
        });
    });
  }
}
