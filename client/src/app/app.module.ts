import { ApplicationRouterModule } from './router/router.module';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatToolbarModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {AuthService} from './auth/auth.service';
import {CoreModule} from './core/core.module';
import {NavComponent} from './core/nav/nav.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [AppComponent, AuthComponent, HomeComponent],
  imports: [
    BrowserModule, CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, AngularFireAuthModule,  ApplicationRouterModule, MatToolbarModule,
    MatButtonModule, MatProgressBarModule, MatMenuModule, MatIconModule,
    MatProgressSpinnerModule, MatCardModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
