import { Component, OnInit } from '@angular/core';
import { SpeechRecognitionService } from '../services/speech-recognition.service';

@Component({
  selector: 'tldl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isRecording = false;
  constructor(private speechRecognizer: SpeechRecognitionService) { }

  ngOnInit() {

  }

  toggleRecording(): void {
    this.isRecording = !this.isRecording;
    if (this.isRecording) {
      this.speechRecognizer.startSpeechRecognition(true, true, "en-US").subscribe((item) => {
        console.log(item);
      })
    } else {
      this.speechRecognizer.stopSpeechRecognition();
    }
  }

}
