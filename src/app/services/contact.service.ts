import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private db: AngularFireDatabase) {}

  addContact(contact) {
    return this.db.list('/contacts/').push(contact);
  }

  getContact(id) {
    return this.db.object('/contacts/' + id).valueChanges();
  }

  getContacts() {
    return this.db
      .list('/contacts/', (ref) => ref.orderByChild('date'))
      .snapshotChanges()
      .pipe(
        map((items) => {
          return items.map((a: any) => {
            const data: any = a.payload.val();
            const key = a.payload.key;
            return { key, ...data };
          });
        })
      );
  }

  addRequests(request) {
    return this.db.list('/requests/').push(request);
  }
  getRequests() {
    return this.db
      .list('/requests/', (ref) => ref.orderByChild('date'))
      .valueChanges();
  }
}
