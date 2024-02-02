

// event.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiKey = '4aFjKKszETvtnlbhdnqkd7xDjCw3hbB6';
  private apiUrl = '/api/discovery/v2/events.json';

  constructor(private http: HttpClient) {}

  getEvents(city: string, startDateTime: string, page: number = 0, pageSize: number = 20): Observable<any> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('city', city)
      .set('startDateTime', startDateTime) // Add this line
      .set('page', page.toString())
      .set('size', pageSize.toString());

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<any>(this.apiUrl, { params, headers });
  }
}
