import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {}

  isVisible = false;
  handleContact(f: NgForm) {
    if (f.valid) {
      this.contactService
        .addContact({ ...f.value, date: this.getDate() })
        .then((result) => {
          this.message.success('Form has been submitted.');
          f.resetForm();
        })
        .catch((err) => {
          this.message.error(err.message);
        });
    } else {
      this.message.error(
        'There is problem in validating the form. Please fill controls."'
      );
    }
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk(f) {
    console.log(f);

    if (f.valid) {
      console.log(f);
      this.contactService
        .addRequests({ ...f.value, date: this.getDate() })
        .then(() => {
          this.message.success('Request has been added.');
          this.isVisible = false;
        })
        .catch((err) => {
          this.message.error(err.message);
        });
    } else {
      this.message.success('error');
      console.log(f);
    }
  }

  openCall() {
    this.isVisible = true;
  }

  getDate() {
    return new Date().toString();
  }
}
