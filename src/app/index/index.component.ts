import { MadrasaService } from './../new-services/madrasa.service';
import { Madrasa } from './../shared/sharedModels';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit, OnDestroy {
  @ViewChild('pickupDate', { static: true }) pickupDate;
  selectedModel: string = 'all';
  madrasas: Madrasa[];
  models;
  uniqueModelList;
  uniqueCityList$;

  loading: boolean = true;

  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;

  constructor(
    private madrasaService: MadrasaService,
    private modelService: MadrasaService,
    private router: Router,
    private modal: NzModalService
  ) {}
  ngOnDestroy(): void {
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    if (this.subscription4) {
      this.subscription4.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.subscription3 = this.madrasaService.getMadaris().subscribe((list) => {
      this.madrasas = list;
      this.loading = false;
    });

    this.subscription2 = this.madrasaService
      .getLocations()
      .subscribe((madrasas: any) => {
        this.models = madrasas;
      });

    this.uniqueCityList$ = this.modelService.getLocations();
  }

  filter(select: any) {
    this.loading = true;
    this.selectedModel = select.model;
    if (select.model === 'all') {
      this.subscription4 = this.madrasaService
        .getMadaris()
        .subscribe((list) => {
          this.madrasas = list;
          this.loading = false;
        });
    } else {
      this.subscription4 = this.madrasaService
        .getMadaris()
        .pipe(
          map((list) => {
            let list1 = list.filter((madrasa: Madrasa) => {
              return (
                madrasa.city.toString().toLowerCase() ===
                (select.city as string).toLowerCase()
              );
            });

            return list1;
          })
        )
        .subscribe((madrasas) => {
          this.madrasas = madrasas;
          this.loading = false;
        });
    }

    this.loading = false;
  }

  route(f) {
    this.router.navigateByUrl('/fleet', { state: f.value });
  }
}
