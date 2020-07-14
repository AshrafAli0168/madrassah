import { MadrasaService } from './../new-services/madrasa.service';
import { AalimService } from './../new-services/aalim.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from './../services/login.service';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { User } from '../shared/sharedModels';

@Component({
  selector: 'app-new-aalim',
  templateUrl: './new-aalim.component.html',
  styleUrls: ['./new-aalim.component.css'],
})
export class NewAalimComponent implements OnInit, OnDestroy {
  user: User;

  madSub: Subscription;
  userSub: Subscription;

  madaris = [];
  spin = false;

  @ViewChild('f', { static: true }) form: any;

  constructor(
    private message: NzMessageService,
    private auth: UserService,
    private storage: AngularFireStorage,
    private aalimService: AalimService,
    private madarisService: MadrasaService
  ) {}
  ngOnDestroy(): void {
    this.madSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.auth.getMe().subscribe((user) => {
      this.user = user;

      this.madSub = this.madarisService
        .getSpecificMadrasas(this.user?.id)
        .subscribe((m) => {
          this.madaris = m;
        });
    });
  }

  uploadPercent;
  fileSelectionEvent: File;
  photoUrl;
  submit(f) {
    if (!f.valid) {
      this.message.error('error');
      return;
    }

    this.spin = true;

    const file = this.fileSelectionEvent;
    var metadata = {
      contentType: file.type,
    };
    let storageref = this.storage.ref('images/aalims/' + file.name);
    const task = storageref.put(file, metadata);
    this.uploadPercent = task.percentageChanges();
    task.then((x) => {
      storageref.getDownloadURL().subscribe((url) => {
        this.aalimService
          .addNewAalim({ ...f.value, headId: this.user.id, img: url })
          .then((result) => {
            this.spin = false;
            this.form.reset();
            this.message.success('New Aalim has been added.');
          })
          .catch((err) => {
            this.spin = false;
            this.message.error('There is an error.');
          });
      });
    });
  }
  onSelectFile(event) {
    this.fileSelectionEvent = event.target.files[0];
  }
}
