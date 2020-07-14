import { Subscription } from 'rxjs';
import { ContactService } from './../services/contact.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css'],
})
export class CallComponent implements OnInit, OnDestroy {
  loading = true;
  dataSet;
  sub: Subscription;

  constructor(private contactService: ContactService) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.contactService.getRequests().subscribe((data) => {
      this.dataSet = data;
      this.loading = false;
    });
  }
}
