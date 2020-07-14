import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactService } from './../services/contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conact-form',
  templateUrl: './conact-form.component.html',
  styleUrls: ['./conact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  dataSet;
  loading;

  subscription: Subscription;

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.contactService.getContacts().subscribe((data) => {
      this.dataSet = data;
      this.loading = false;
    });
  }

  navigateToDetails(data) {
    this.router.navigate(['/dashboard/contacts', data.key]);
  }
}
