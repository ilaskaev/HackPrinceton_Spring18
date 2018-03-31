import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Sentence } from './sentence';
import * as uuid from 'uuid';
import Recorder from 'recorder-js';

declare const webkitSpeechRecognition;

@Injectable()
export class SpeechRecognitionService {
  recognition = null;
  currentResultIndex = 0;
  permText = "";
  recording = false;
  sentences: Sentence[] = [];
  recordingStart = 0;
  recordingUUID = "";
  recorder: Recorder;
  audioContext: AudioContext;
  blob: Blob;

  constructor() {
    this.recognition = new webkitSpeechRecognition();
    this.audioContext = new AudioContext();
    this.recorder = new Recorder(this.audioContext);
  }

  /**
   * Starts the speech recognition, returning an observable every time a result is had
   * 
   * @param {boolean} continuous Have the speech recognition always on
   * @param {boolean} interimResults Have the speech recognition return results before a phrase is finished
   * @param {string} language The language and/or dialect to use to improve accuracy
   * @returns {Observable<string>} 
   * 
   * @memberOf SpeechRecognitionService
   */
  public startSpeechRecognition(continuous: boolean, interimResults: boolean, language: string): Observable<string> {
    this.recording = true;
    this.recordingUUID = uuid();
    this.recordingStart = new Date().getTime();
    this.recognition.continuous = continuous;
    this.recognition.interimResults = interimResults;
    this.recognition.lang = language;
    this.currentResultIndex = 0;
    this.permText = "";
    // If it ends before it is told to, just start it again.
    this.recognition.onend = () => {
      this.recognition.start();
    };

    this.recognition.onstart = () => {
      this.currentResultIndex = 0;
    }

    this.recognition.start();
    setInterval(() => {
      if (this.recording) {
        this.recognition.stop(); 
      }
    }, 50000)
    navigator.mediaDevices.getUserMedia({audio:true})
      .then(stream => {
        this.recorder.init(stream)
        this.recorder.start();
      })
      .catch(err => console.log('No stream...', err));

    return Observable.create((observer) => {
      this.recognition.onresult = (e) => {
        if (e.resultIndex != this.currentResultIndex) {
          this.sentences.push(new Sentence(e.results[this.currentResultIndex][0].transcript, new Date().getTime() - this.recordingStart, this.recordingUUID))
          this.permText += e.results[this.currentResultIndex][0].transcript + ".";
          this.currentResultIndex = e.resultIndex;
        }
        return observer.next(this.permText + e.results[e.resultIndex][0].transcript);
      };
    });
  }

  public stopSpeechRecognition(): any {
    this.recording = false;
    this.recognition.onend = (e) => {};
    this.recognition.stop();
    return this.recorder.stop()
      .then(({blob, buffer}) => {
        this.blob = blob;
        Recorder.download(blob, 'a_blob_file');
        return this.blob;
      });
  }
}
