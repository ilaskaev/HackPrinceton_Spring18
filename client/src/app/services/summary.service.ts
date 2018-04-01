import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class SummaryService {
  libUrl = "https://functions.lib.id/jessebk/summary-generator@dev/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getSummary(text: string): Observable<string> {
    let request = {
      text: text,
      api_key: environment.smmryApiKey
    };
    return this.httpClient.post<string>(this.libUrl, request, this.httpOptions)
      .map(result => {
        console.log(JSON.parse(result));
        return JSON.parse(result)['sm_api_content'];
      });
  }
}
