// app.component.ts

import { Component } from '@angular/core';
import { EventService } from './event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  events: any[] = [];
  selectedCity: string = '';
  selectedDate: string = '';
  currentPage: number = 0;
  pageSize: number = 20;

  constructor(private eventService: EventService) {}

  onSearch(searchParams: { city: string; date: string }) {
    this.currentPage = 0;
    this.selectedCity = searchParams.city;
    this.selectedDate = searchParams.date;
    this.fetchEvents();
  }

  fetchEvents() {
    this.eventService
      .getEvents(this.selectedCity, this.selectedDate, this.currentPage, this.pageSize)
      .subscribe(
        (data) => {
          this.events = data._embedded?.events || [];
        },
        (error) => {
          console.error(error);
        }
      );
  }

  loadMore() {
    this.currentPage++;
    this.fetchEvents();
  }
}
