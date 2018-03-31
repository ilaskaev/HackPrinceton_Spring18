import {Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {SpeechRecognitionService} from '../services/speech-recognition.service';

@Component({
  selector: 'tldl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public editor;
  existingText: string;
  editorContent: string;

  constructor(private speechRecognition: SpeechRecognitionService,
              public dialog: MatDialog) {}

  ngOnInit() {}

  onEditorBlured(quill) {
    console.log('editor blur!', quill);
  }

  onEditorFocused(quill) {
    console.log('editor focus!', quill);
  }

  onEditorCreated(quill) {
    this.editor = quill;
    console.log('quill is ready! this is current quill instance object', quill);
  }

  onContentChanged({quill, html, text}) {
    console.log('quill content is changed!', quill, html, text);
  }

  startRecording() {
    this.existingText = this.editorContent || "";
    this.speechRecognition.startSpeechRecognition(true, true, "en-US").subscribe((result) => {
      this.editorContent = this.existingText + '<p>' + result + '</p>';
    });
    let dialogRef = this.dialog.open(RecordingDialog, {
      width: '50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.stopRecording();
    })
  }

  stopRecording() {
    this.speechRecognition.stopSpeechRecognition().then(value => {
      console.log(value);
    });
  }
}

@Component({
  selector: 'recording-dialog',
  template: `<p>Recording</p><button (click)="dialogRef.close()">Stop Recording</button>`
})
export class RecordingDialog {
  constructor(
    public dialogRef: MatDialogRef<RecordingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
}
