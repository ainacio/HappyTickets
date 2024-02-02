// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CityInputComponent } from './city-input/city-input.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventService } from './event.service';

@NgModule({
  declarations: [AppComponent, CityInputComponent, EventListComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [EventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
