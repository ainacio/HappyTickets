// city-input.component.ts

import { Component, Output, EventEmitter } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.css'],
})
export class CityInputComponent {
  @Output() searchClicked = new EventEmitter<{ city: string; date: string }>(); // Update this line
  selectedCity: string = '';
  selectedDate: string = '';

  constructor(private eventService: EventService) {}

  fetchEvents() {
    this.searchClicked.emit({ city: this.selectedCity, date: this.selectedDate }); // Update this line
  }
}
