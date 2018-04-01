import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SumarrizerService {
  libUrl = "https://functions.lib.id/jessebk/summary-generator@dev/"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getSummary(text: string): Observable<string> {
    let request = {
      text: text
    };
    return this.httpClient.post<string>(this.libUrl, request, this.httpOptions).map(result => {
      return result['sm_api_content'];
    });
  }
  
}
