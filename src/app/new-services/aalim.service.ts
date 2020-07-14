import { UserService } from './../services/login.service';
import { Aalim } from './../shared/sharedModels';
import { MadrasaService } from './madrasa.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { apps } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AalimService {
  constructor(
    private db: AngularFireDatabase,
    private madrasaService: MadrasaService,
    private userService: UserService
  ) {}

  getAalims(): Observable<Aalim[]> {
    return this.db
      .list<Aalim>('/aalims/')
      .snapshotChanges()
      .pipe(
        map((items) => {
          return items.map((a) => {
            const data: any = a.payload.val();
            const key = a.payload.key;
            return { id: key, ...data };
          });
        }),
        map((list) => {
          let newList = [];
          list.map((aalim: Aalim) => {
            aalim.madrasa = this.madrasaService.getMadrasa(aalim.madrasaId);
          });
          newList = list.filter((aalim: any) => {
            return aalim.activationStatus != 'pending';
          });
          return newList;
        })
      );
  }

  addContactToAalim(aalim: Aalim, message) {
    return this.db.list('/aalims/' + aalim.id + '/contacts').push(message);
  }

  getAalim(id) {
    return this.db.object('/aalims/' + id);
  }

  getSpecificAalims(id) {
    return this.db
      .list<Aalim>('/aalims/', (ref) =>
        ref.orderByChild('madrasaId').equalTo(id)
      )
      .snapshotChanges()
      .pipe(
        map((items) => {
          return items.map((a) => {
            const data: any = a.payload.val();
            const key = a.payload.key;
            return { id: key, ...data };
          });
        })
      );
  }

  getSpecificAalimsByHead(id) {
    return this.db
      .list<Aalim>('/aalims/', (ref) => ref.orderByChild('headId').equalTo(id))
      .snapshotChanges()
      .pipe(
        map((items) => {
          return items.map((a) => {
            const data: any = a.payload.val();
            const key = a.payload.key;
            return { id: key, ...data };
          });
        })
      );
  }

  addNewAalim(data) {
    return this.db
      .list('/aalims/')
      .push({ ...data, activationStatus: 'active' });
  }

  //Adding option for student to apply as an aalim.
  addApplicaton(app: any) {
    return this.db.list('/aalims/').push(app);
  }

  getAppsByHead(id) {
    return this.db
      .list('/aalims/', (ref) => ref.orderByChild('headId').equalTo(id))
      .snapshotChanges()
      .pipe(
        map((items) => {
          return items.map((a) => {
            const data: any = a.payload.val();

            data.madrasah = this.madrasaService.getMadrasa(data.madrasaId);

            const key = a.payload.key;
            return { id: key, ...data };
          });
        })
      );
  }

  getAppsByUser(id) {
    return this.db
      .list('/aalims/', (ref) => ref.orderByChild('userId').equalTo(id))
      .snapshotChanges()
      .pipe(
        map((items) => {
          return items.map((a) => {
            const data: any = a.payload.val();

            data.madrasah = this.madrasaService.getMadrasa(data.madrasaId);

            const key = a.payload.key;
            return { id: key, ...data };
          });
        })
      );
  }

  //Implementation for Actually approval in db
  approveApplication(data) {
    let p1 = this.db.object('/aalims/' + data.id).update({
      activationStatus: 'active',
    });

    let p2 = this.db.object('/users/' + data.userId).update({
      userType: 'aalim',
    });

    return Promise.all([p1, p2]);
  }
}
