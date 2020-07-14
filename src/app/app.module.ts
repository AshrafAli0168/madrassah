import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule, Routes } from '@angular/router';
import { environment } from './../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzListModule } from 'ng-zorro-antd/list';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzProgressModule } from 'ng-zorro-antd/progress';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MadarisComponent } from './fleet/fleet.component';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { SingleCarComponent } from './single/single.component';

import { OrdersComponent } from './admin/orders/orders.component';
import { SettingComponent } from './admin/setting/setting.component';
import { AngularFireModule } from '@angular/fire';
import { LoginComponent } from './login/login.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { MembershipComponent } from './membership/membership.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordConfirmComponent } from './reset-password-confirm/reset-password-confirm.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { CallComponent } from './call/call.component';
import { ContactFormComponent } from './conact-form/conact-form.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { AalimsComponent } from './aalims/aalims.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { StudentComponent } from './student/student.component';
import { ApplicationsComponent } from './applications/applications.component';
import { AdminAalimsComponent } from './admin-aalims/admin-aalims.component';
import { NewAalimComponent } from './new-aalim/new-aalim.component';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { DonationComponent } from './donation/donation.component';
import { DonationAdminComponent } from './donation-admin/donation-admin.component';
import { ApplyForAalimComponent } from './apply-for-aalim/apply-for-aalim.component';
import { AalimAppsComponent } from './aalim-apps/aalim-apps.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Authguard } from './services/authguard.service';
import { MapsComponent } from './maps-try/maps-try.component';
import { AgmCoreModule } from '@agm/core';
import { MadRegistrationComponent } from './mad-registration/mad-registration.component';

registerLocaleData(en);
const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  { path: 'try', component: MapsComponent },
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  { path: 'madrasa/:id', component: SingleCarComponent },

  {
    path: 'fleet',
    component: MadarisComponent,
  },
  {
    path: 'fleet/register',
    component: MadRegistrationComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'aalims',
    component: AalimsComponent,
  },
  {
    path: 'donation',
    component: DonationComponent,
  },
  {
    path: 'login',
    component: MembershipComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'reset',
        component: ResetPasswordComponent,
      },
      {
        path: 'confirm',
        component: ResetPasswordConfirmComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [Authguard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        canActivate: [Authguard],
        component: WelcomeComponent,
      },

      {
        path: 'orders',
        canActivate: [Authguard],
        component: OrdersComponent,
      },
      {
        path: 'student',
        canActivate: [Authguard],
        component: StudentComponent,
      },
      {
        path: 'apply-for-aalim',
        canActivate: [Authguard],
        component: ApplyForAalimComponent,
      },
      {
        path: 'aalim-apps',
        canActivate: [Authguard],
        component: AalimAppsComponent,
      },
      {
        path: 'donation',
        canActivate: [Authguard],
        component: DonationAdminComponent,
      },

      {
        path: 'applications',
        canActivate: [Authguard],
        component: ApplicationsComponent,
      },
      {
        path: 'aalimscontacts',
        canActivate: [Authguard],
        component: AdminAalimsComponent,
      },
      {
        path: 'newaalim',
        canActivate: [Authguard],
        component: NewAalimComponent,
      },
      {
        path: 'setting',
        canActivate: [Authguard],
        component: SettingComponent,
      },

      {
        path: 'requests',
        canActivate: [Authguard],
        component: CallComponent,
      },

      {
        path: 'contacts',
        canActivate: [Authguard],
        component: ContactFormComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    AboutComponent,
    MadarisComponent,
    SingleCarComponent,
    DashboardComponent,
    OrdersComponent,
    SettingComponent,
    LoginComponent,
    MapsComponent,
    MembershipComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmComponent,

    ContactComponent,
    CallComponent,
    ContactFormComponent,
    AalimsComponent,
    WelcomeComponent,
    StudentComponent,
    ApplicationsComponent,
    AdminAalimsComponent,
    NewAalimComponent,
    DonationComponent,
    DonationAdminComponent,
    ApplyForAalimComponent,
    AalimAppsComponent,
    MadRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    NzMenuModule,
    NzDescriptionsModule,
    NzInputModule,
    NzLayoutModule,
    NzCommentModule,
    NzButtonModule,
    NzGridModule,
    NzUploadModule,
    NzListModule,
    NzIconModule,
    NzPageHeaderModule,
    NzSkeletonModule,
    FormsModule,
    NzSelectModule,
    NzSliderModule,
    NzCardModule,
    NzCheckboxModule,
    NzTabsModule,
    NzBadgeModule,
    NzCarouselModule,
    NzNotificationModule,
    NzMessageModule,
    NzStepsModule,
    ReactiveFormsModule,
    NzAvatarModule,
    NzModalModule,
    NzAlertModule,
    NzResultModule,
    NzTableModule,
    NzDividerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NzSpinModule,
    NzDrawerModule,
    NzSwitchModule,
    AngularFireStorageModule,
    NzProgressModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBLEuEqesIgR5YCgOgWMAzduZvQ6QTQOVQ',
      libraries: ['places'],
    }),

    //    apiKey: 'AIzaSyC5WqWCu_xpLhP3Fj_d9DL-5TAaifZeJ_o',
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
