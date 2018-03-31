import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import Recorder from 'recorder-js';

declare const webkitSpeechRecognition;

@Injectable()
export class SpeechRecognitionService {
  speechRecognition: any;
  audioContext: AudioContext;
  recorder: Recorder;
  isRecording = false;
  speechRecognitionObservable: Observable<string>;
  currentResultIndex = 0; // Keeps track of the unfinalized result for our speech recognition
  finalizedText = "";
  restartInterval: any;

  constructor() { 
    this.speechRecognition = new webkitSpeechRecognition();
    this.audioContext = new AudioContext();
    this.recorder = new Recorder(this.audioContext)
  }

  /**
   * Returns an observable that yields a result every time some speech is recognized. 
   * The string returned is the full string since the speech recognition was started.
   * 
   * @param {boolean} continuous If true, the speech recognition continues indefinitely
   * @param {boolean} interimResults If true, results are returned as they are parsed, and are subject to change
   * @param {string} language Language Code for the speech recognition
   * @returns {Observable<string>} 
   * 
   * @memberOf SpeechRecognitionService
   */
  public startSpeechRecognition(continuous: boolean, interimResults: boolean, language: string): Observable<string> {;
    if (this.isRecording) { // If we are already recording, return that observable
      return this.speechRecognitionObservable;
    }
    this.isRecording = true;
    this.speechRecognition.continuous = continuous;
    this.speechRecognition.interimResults = interimResults;
    this.speechRecognition.lang = language;
    this.finalizedText = "";
    
    // Set up speech events to provide stability
    // If it ends before it is told to, start again.
    this.speechRecognition.onend = () => {
      this.speechRecognition.start();
    };

    this.speechRecognition.onstart = () => {
      this.currentResultIndex = 0;
    }

    this.speechRecognition.start();
    this.restartInterval = setInterval(() => { // Restart every once and a while because it stops working for some reason
      if (this.isRecording) {
        this.speechRecognition.stop();
      }
    }, 30000)
    
    // Start the voice recording
    navigator.mediaDevices.getUserMedia({audio: true})
      .then(stream => {
        this.recorder.init(stream);
        this.recorder.start();
      })
      .catch(err => console.log("Could not start recorder", err));

    // Return results as they come in
    return Observable.create((observer) => {
      console.log("here");
      this.speechRecognition.onresult = (e) => {
        if (e.resultIndex != this.currentResultIndex) {
          this.finalizedText += e.results[this.currentResultIndex][0].transcript + ".";
          this.currentResultIndex = e.resultIndex;
        }
        return observer.next(this.finalizedText + e.results[e.resultIndex][0].transcript);
      };
    });
  }

  public stopSpeechRecognition(): Promise<Blob> {
    this.isRecording = false;
    // Prevent the speech recognition from restarting
    clearInterval(this.restartInterval);
    this.speechRecognition.onend = (e) => {};
    this.speechRecognition.stop();

    return this.recorder.stop()
      .then(({blob, buffer}) => {
        return blob;
      });
  }
}
