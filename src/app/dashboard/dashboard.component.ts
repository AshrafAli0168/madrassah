import { User } from './../shared/sharedModels';
import { Subscription } from 'rxjs';
import { UserService } from './../services/login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  isCollapsed = false;

  userSubscipriotn;

  user: User;
  userSub: Subscription;
  constructor(private loginService: UserService, private router: Router) {}
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.loginService.getMe().subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['../login']);
  }
}
