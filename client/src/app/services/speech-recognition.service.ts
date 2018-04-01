import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

declare const webkitSpeechRecognition; // For built in speech recognition

@Injectable()
export class SpeechRecognitionService {
  private speechRecognition: any;
  public isRecording = false;
  private speechRecognitionObservable: Observable<string>;
  private finalizedText = "";
  private currentResultIndex = 0; // Keeps track of the results of the speech stream
  private restartInterval;

  constructor() { 
    this.speechRecognition = new webkitSpeechRecognition();
  }

  /**
   * Returns an observable that yields a result every time some speech is recognized.
   * The string returned is the string from the entire duration of the speech recognition
   * 
   * @param {boolean} continous If true, the speech recognition continues indefinitely
   * @param {boolean} interimResults If true, results are returned as they are parsed, and are subject to change
   * @param {string} language Language code for the speech recognition (e.g. 'en-US')
   * @returns {Observable<string>} 
   * 
   * @memberOf SpeechRecognitionService
   */
  public startSpeechRecognition(continuous: boolean, interimResults: boolean, language: string): Observable<string> {
    if (this.isRecording) { // If we are already recording, returnt that observable
      return this.speechRecognitionObservable;
    }
    this.isRecording = true;
    this.speechRecognition.continuous = continuous;
    this.speechRecognition.interimResults = interimResults;
    this.speechRecognition.lang = language;
    this.finalizedText = "";

    // If the speech recognition ends randomly, restart it
    this.speechRecognition.onend = () => {
      this.speechRecognition.start();
    };

    this.speechRecognition.onstart = () => {
      this.currentResultIndex = 0;
    };

    this.speechRecognition.start();
    this.restartInterval = setInterval(() => {
      if (this.isRecording) {
        this.speechRecognition.stop();
      }
    }, 30000);

    return Observable.create((observer) => {
      this.speechRecognition.onresult = (e) => {
        let newText;
        if (e.resultIndex != this.currentResultIndex) {
          newText = (e.results[this.currentResultIndex][0].transcript + ".").trim();
          newText = " " + newText.trim().charAt(0).toUpperCase() + newText.slice(1);
          this.finalizedText += newText;
          this.currentResultIndex = e.resultIndex;
        }
        newText = e.results[e.resultIndex][0].transcript.trim();
        newText = " " + newText.trim().charAt(0).toUpperCase() + newText.slice(1);
        return observer.next(this.finalizedText + newText);
      }
    });
  }

  /**
   * Stops the speech recognition and returns the final text value
   * 
   * @returns {string} 
   * 
   * @memberOf SpeechRecognitionService
   */
  public stopSpeechRecognition(): string {
    this.isRecording = false;
    clearInterval(this.restartInterval);
    this.speechRecognition.onend = (e) => {};
    this.speechRecognition.stop();
    return this.finalizedText;
  }
}
