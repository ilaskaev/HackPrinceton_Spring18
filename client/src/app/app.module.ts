import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatInputModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule, MatToolbarModule, MatTableModule, MatPaginatorModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from './auth/auth.guard';
import {AuthService} from './auth/auth.service';
import {CoreModule} from './core/core.module';
import {NavComponent} from './core/nav/nav.component';
import {EditorComponent} from './editor/editor.component';
import {QuillEditorModule} from './external/quill/quillEditor.module';
import {DocumentDialogComponent} from './home/document-dialog/document-dialog.component';
import {FolderDialogComponent} from './home/folder-dialog/folder-dialog.component';
import {HomeComponent} from './home/home.component';
import {ApplicationRouterModule} from './router/router.module';
import {DocumentService} from './services/document.service';
import {ToastService} from './services/toast.service';
import {SpeechRecognitionService} from './services/speech-recognition.service';
import {SummaryService} from './services/summary.service';


@NgModule({
  declarations: [
    AppComponent, AuthComponent, EditorComponent, HomeComponent,
    FolderDialogComponent, DocumentDialogComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ApplicationRouterModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    MatMenuModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
    QuillEditorModule,
    HttpClientModule
  ],
  entryComponents: [FolderDialogComponent, DocumentDialogComponent],
  providers: [AuthService, AuthGuard, ToastService, DocumentService,
              SpeechRecognitionService, SummaryService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
