import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import Recorder from 'recorder-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

declare const webkitSpeechRecognition;
declare const lib;

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
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { 
    this.speechRecognition = new webkitSpeechRecognition();
    this.audioContext = new AudioContext();
    this.recorder = new Recorder(this.audioContext);
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
    console.log(navigator.mediaDevices);
    
    const mediaConfig = {
      type: 'media-source', // or 'file'
      audio: {
        contentType: 'audio/webm; codecs=opus',
        channels: '2', // audio channels used by the track
        bitrate: 132266, // number of bits used to encode a second of audio
        samplerate: 48000 // number of samples of audio carried per second
      }
    };
    
    (<any>navigator).mediaCapabilities.decodingInfo(mediaConfig).then(result => {
      console.log('This configuration is' +
          (result.supported ? '' : ' NOT') + ' supported,' +
          (result.smooth ? '' : ' NOT') + ' smooth and' +
          (result.powerEfficient ? '' : ' NOT') + ' power efficient.');
    });

    navigator.mediaDevices.getUserMedia(<any>({audio: {channelCount: 1}}))
      .then(stream => {
        // let mediaRecorder = new MediaRecorder(stream);
        
        // let splitter = this.audioContext.createChannelSplitter(2);

        // let gainNode = this.audioContext.createGain();
        // gainNode.gain.value = 1;
        // splitter.connect(gainNode, 1);
        // stream.getAudioTracks()[0].applyConstraints((<any>{channelCount: 1})).then(result => {
          
        // }).catch(err =>;
        // let splitter = this.audioContext.createChannelSplitter(2);
        // let source = this.audioContext.createBufferSource();
        console.log(stream.getAudioTracks()[0].getSettings());
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
        
        // console.log(buffer);
        // Recorder.download(blob, 'something')
        return blob;
      });
  }

  public getTextFromBlob(b: any, language: string): Observable<any> {
    let reader = new FileReader();
    reader.readAsDataURL(b);
    let request;
    reader.onloadend = () => {
      const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 48000,
        languageCode: language
      };
      request = {
        config: config,
        audio: reader.result.slice(reader.result.indexOf(',')+1),
        label: "hi",
        api: environment.google
      };
      
      console.log(request.audio);
      const speechToText = lib.jessebk['speech-to-text']['@dev']
      console.log(typeof request.config);
      console.log(typeof request.audio);
      console.log(typeof request.label);
      this.httpClient.post("https://functions.lib.id/jessebk/speech-to-text@dev/", JSON.stringify(request), this.httpOptions).subscribe(result => {
        console.log(result);
      })
    };
    return null;
  }
}
