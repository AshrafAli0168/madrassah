import { AalimService } from './aalim.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Madrasa } from '../shared/sharedModels';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MadrasaService {
  constructor(private db: AngularFireDatabase) {}

  getMadaris(): Observable<Madrasa[]> {
    return this.db
      .list<Madrasa>('/madrasas/')
      .snapshotChanges()
      .pipe(
        map((items) => {
          return items.map((a) => {
            const data: any = a.payload.val();
            data.id = a.payload.key;
            return { ...data };
          });
        }),
        map((madaris) => {
          return madaris.filter((m) => m.activationStatus == true);
        })
      );
  }
  getSpecificMadrasas(id): Observable<Madrasa[]> {
    return this.db
      .list<Madrasa>('/madrasas/', (ref) =>
        ref.orderByChild('headId').equalTo(id)
      )
      .snapshotChanges()
      .pipe(
        map((items) => {
          return items.map((a) => {
            const data: any = a.payload.val();
            data.id = a.payload.key;
            return { ...data };
          });
        }),
        map((madaris) => {
          return madaris.filter((m) => m.activationStatus == true);
        })
      );
  }

  getMadrasa(id): Observable<Madrasa> {
    return this.db
      .object<Madrasa>('/madrasas/' + id)
      .snapshotChanges()
      .pipe(
        map((item) => {
          const data: any = item.payload.val();
          if (data) data.id = item.payload.key;

          return data;
        })
      );
  }

  getLocations(): Observable<string[]> {
    return this.db
      .list('/madrasas/')
      .valueChanges()
      .pipe(
        map((MadrasaList) => {
          return [
            ...new Set(
              [].concat(...MadrasaList.map((Madrasa: Madrasa) => Madrasa.city))
            ),
          ];
        })
      );
  }

  deleteMadrasa(id) {
    return this.db.object('/madrasas/' + id).remove();
  }

  saveMadrasa(Madrasa: Madrasa) {
    return this.db.object('/madrasas/' + Madrasa.id).update(Madrasa);
  }

  addMadrasa(Madrasa: Madrasa) {
    return this.db.list<Madrasa>('/madrasas/').push(Madrasa);
  }

  getRegistrationApplication() {
    return this.db
      .list('/madrasas/')
      .snapshotChanges()
      .pipe(
        map((items) => {
          return items.map((a) => {
            const data: any = a.payload.val();
            data.id = a.payload.key;
            return { ...data };
          });
        }),
        map((madaris) => {
          return madaris.filter((m) => m.activationStatus == false);
        })
      );
  }

  getEveryThingApplications() {
    return this.db
      .list('/madrasas/')
      .snapshotChanges()
      .pipe(
        map((items) => {
          items.map((a) => {
            const data: any = a.payload.val();
            data.id = a.payload.key;
            return { ...data };
          });

          return items;
        })
      );
  }

  //Getting the applications by student wise.
  getStudentApplicationsByStudent(id) {
    return this.db
      .object('/students/' + id)
      .snapshotChanges()
      .pipe(
        map((item) => {
          const data: any = item.payload.val();
          data.id = item.payload.key;
          return { ...data };
        })
      );
  }

  //Getting the applications by head wise.
  getStudentApplicationsByHead(id) {
    return this.db
      .list('/students/', (ref) => ref.orderByChild('headId').equalTo(id))
      .snapshotChanges()
      .pipe(
        map((items) => {
          return items.map((a) => {
            const data: any = a.payload.val();
            data.id = a.payload.key;
            data.madrasa = this.getMadrasa(data.madrasaId);

            return { ...data };
          });
        })
      );
  }

  addMadApplication(data) {
    return this.db.list('/madrasas').push(data);
  }

  //Checking for already existed Madrasah. i.e. Primary key constraint.
  checkForMadrasahExistence(id) {
    return this.db
      .list('/madrasas/', (ref) =>
        ref.orderByChild('registrationNumber').equalTo(id)
      )
      .valueChanges();
  }

  // Adding the registrations for students.
  addRegistrationApplication(data) {
    return this.db.object('/students/' + data.userId).set(data);
  }

  //checking for duplicate student apply
  checkStudentApplicationExistence(id) {
    return this.db.object('/students/' + id).valueChanges();
  }
}
