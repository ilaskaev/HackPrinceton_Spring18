import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {environment} from 'environments/environment';

import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {CoreModule} from './core/core.module';
import {NavComponent} from './core/nav/nav.component';


@NgModule({
  declarations: [AppComponent, AuthComponent],
  imports: [
    BrowserModule, CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
