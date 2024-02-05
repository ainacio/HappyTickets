// app.component.ts
import { Component } from '@angular/core';
import { EventService } from './event.service';
import { HttpParams } from '@angular/common/http';

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

    // Fix the typo in date-time string construction
    const startDateTime = `${this.selectedDate}T00:00:00Z`;
    const endDateTime = `${this.selectedDate}T23:59:59Z`;

    this.fetchEvents(startDateTime, endDateTime);
  }

  fetchEvents(startDateTime: string, endDateTime: string) {
    // Add 48 hours to the selected date for the endDateTime
    const endDate = new Date(this.selectedDate);
    endDate.setHours(endDate.getHours() + 48);

    // Format the date manually with two digits for milliseconds
    const formattedEndDateTime = endDate.toISOString().replace(/\.\d{3}/, '');

    const params = new HttpParams()
      .set('apikey', this.eventService.apiKey)
      .set('city', this.selectedCity)
      .set('startDateTime', startDateTime)
      .set('endDateTime', formattedEndDateTime) // Use the formatted date
      .set('page', this.currentPage.toString())
      .set('size', this.pageSize.toString());

    console.log('Fetching events with URL:', this.eventService.apiUrl + '?' + params.toString());

    this.eventService
      .getEvents(this.selectedCity, startDateTime, formattedEndDateTime, this.currentPage, this.pageSize)
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
  
    // Assume the start time is 00:00:00 and end time is 23:59:59 for the selected date
    const startDateTime = `${this.selectedDate}T00:00:00Z`;
    
    // Create a new Date object and set it to the last millisecond of the day
    const endDate = new Date(`${this.selectedDate}T23:59:59Z`);
    
    // Format the date manually with three digits for milliseconds
    const formattedEndDateTime = endDate.toISOString();
  
    this.fetchEvents(startDateTime, formattedEndDateTime);
  }
  
}
