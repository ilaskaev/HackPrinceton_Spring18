import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatSnackBarModule, MatToolbarModule, MatDialogModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';

import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from './auth/auth.guard';
import {AuthService} from './auth/auth.service';
import {CoreModule} from './core/core.module';
import {NavComponent} from './core/nav/nav.component';
import {QuillEditorModule} from './external/quill/quillEditor.module';
import {HomeComponent, RecordingDialog} from './home/home.component';
import {ApplicationRouterModule} from './router/router.module';
import {ToastService} from './services/toast.service';
import {SpeechRecognitionService} from './services/speech-recognition.service';


@NgModule({
  declarations: [AppComponent, AuthComponent, HomeComponent, RecordingDialog],
  imports: [
    BrowserModule, CoreModule, FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, AngularFireAuthModule, ApplicationRouterModule,
    MatToolbarModule, MatButtonModule, MatProgressBarModule, MatMenuModule,
    MatIconModule, MatSnackBarModule, MatProgressSpinnerModule, MatCardModule,
    MatDialogModule, QuillEditorModule
  ],
  providers: [AuthService, AuthGuard, ToastService, SpeechRecognitionService],
  bootstrap: [AppComponent],
  entryComponents: [RecordingDialog]
})
export class AppModule {
}
