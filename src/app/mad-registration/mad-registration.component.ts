import { UserService } from './../services/login.service';
import { Subscription } from 'rxjs';
import { MapObject, User } from './../shared/sharedModels';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MadrasaService } from '../new-services/madrasa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-mad-registration',
  templateUrl: './mad-registration.component.html',
  styleUrls: ['./mad-registration.component.css'],
})
export class MadRegistrationComponent implements OnInit, OnDestroy {
  user: User;
  isSpinning = false;

  address: MapObject;
  @ViewChild('modal', { static: true }) form: any;

  constructor(
    private madrasaService: MadrasaService,
    private message: NzMessageService,
    private auth: UserService,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase
  ) {}
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  userSub: Subscription;

  ngOnInit(): void {
    this.isSpinning = true;
    this.userSub = this.auth.getMe().subscribe((user) => {
      this.user = user;
    });
    this.isSpinning = false;
  }

  isVisible = false;

  handleCancel() {
    this.isVisible = false;
  }

  uploadPercent;
  fileSelectionEvent: File;
  photoUrl;

  handleOk(f) {
    if (!f.valid) {
      this.message.error('Please fill all fields!');

      return;
    }

    if (!this.user) {
      this.message.error('Please login to submit the form.');
      return;
    }

    if (this.address == null) {
      this.message.error('Please select address from map!');
      return;
    }

    this.isSpinning = true;

    this.madrasaService
      .checkForMadrasahExistence(f.value.registrationNumber)
      .subscribe((result) => {
        if (result.length == 0) {
          const file = this.fileSelectionEvent;
          var metadata = {
            contentType: file.type,
          };
          let storageref = this.storage.ref('images/madrasa/' + file.name);
          const task = storageref.put(file, metadata);
          this.uploadPercent = task.percentageChanges();
          task.then((x) => {
            storageref.getDownloadURL().subscribe((url) => {
              this.madrasaService
                .addMadApplication({
                  ...f.value,
                  headId: this.user?.id,
                  registraionDate: this.getDate(),
                  img: url,
                  address: this.address,
                })
                .then(() => {
                  return this.db
                    .object('/users/' + this.user.id)
                    .update({ userType: 'head' });
                })
                .then((result) => {
                  this.message.success('Request has been added.');
                  this.isSpinning = false;
                })
                .catch((err) => {
                  this.isSpinning = false;
                });
            });
          });
        } else {
          this.message.error('Duplicate Madrasah!');
          this.isSpinning = false;
        }
      });
  }

  onSelectFile(event) {
    this.fileSelectionEvent = event.target.files[0];
  }

  openCall() {
    this.isVisible = true;
  }

  getDate() {
    return new Date().toString();
  }

  locationDetail(data: MapObject) {
    this.address = data;
  }
}
