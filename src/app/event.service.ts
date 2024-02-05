//src/app/event.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlfredConfig } from '../config';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  public apiKey = AlfredConfig.apiKey;
  public apiUrl = '/api/discovery/v2/events.json'; // Include .json extension

  constructor(private http: HttpClient) {}

  getEvents(city: string, startDateTime: string, endDateTime: string, page: number = 0, pageSize: number = 20): Observable<any> {
    // Do not encode the date-time parameters
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('city', city)
      .set('startDateTime', startDateTime)
      .set('endDateTime', endDateTime)
      .set('page', page.toString())
      .set('size', pageSize.toString())
      .set('locale', '*');
  
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  
    return this.http.get<any>(this.apiUrl, { params, headers });
  }
  
}
