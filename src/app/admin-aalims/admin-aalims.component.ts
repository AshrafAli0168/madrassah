import { MadrasaService } from './../new-services/madrasa.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Madrasa } from './../shared/sharedModels';
import { Subscription } from 'rxjs';
import { UserService } from './../services/login.service';
import { AalimService } from './../new-services/aalim.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Aalim, User } from '../shared/sharedModels';

@Component({
  selector: 'app-admin-aalims',
  templateUrl: './admin-aalims.component.html',
  styleUrls: ['./admin-aalims.component.css'],
})
export class AdminAalimsComponent implements OnInit, OnDestroy {
  aalims: Aalim[];
  user: User;
  userSub: Subscription;
  aalimSub: Subscription;

  madaris: Madrasa[];

  constructor(
    private aalimService: AalimService,
    private auth: UserService,
    private db: AngularFireDatabase,
    private madrasaService: MadrasaService
  ) {}
  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
    this.aalimSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.auth.getMe().subscribe((data) => {
      this.user = data;

      this.aalimSub = this.aalimService
        .getSpecificAalimsByHead(data.id)
        .subscribe((data) => {
          data.forEach((aalim) => {
            let contact = [];
            for (const key in aalim.contacts) {
              if (aalim.contacts.hasOwnProperty(key)) {
                const element = aalim.contacts[key];
                contact.push(element);
              }
            }
            aalim.contacts = contact;
          });
          this.aalims = data;
          console.log(this.aalims);
        });
    });
  }
}
