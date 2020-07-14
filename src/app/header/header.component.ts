import { UserService } from './../services/login.service';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  count = 0;
  noOfFav = 0;

  user$: Observable<firebase.User>;
  constructor(public loginService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.loginService.user$;
  }

  ngOnDestroy(): void {}
}
