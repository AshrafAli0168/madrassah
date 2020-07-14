import { MadrasaService } from './new-services/madrasa.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  constructor(
    private db: AngularFireDatabase,
    private madService: MadrasaService
  ) {}

  addDonation(data) {
    return this.db.list('/donations/').push(data);
  }

  getDonations() {
    return this.db
      .list('/donations/')
      .valueChanges()
      .pipe(
        map((d) => {
          d.forEach((donation: any) => {
            donation.madrasa$ = this.madService.getMadrasa(donation.madrasa);
          });
          return d;
        })
      );
  }
}
