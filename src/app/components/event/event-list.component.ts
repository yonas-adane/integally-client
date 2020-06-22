import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-event',
  templateUrl: 'event-list.component.html'
})
export class EventListComponent implements OnInit {

  selectedEvent: Event;
  feedback: any = {};

  get eventList(): Event[] {
    return this.eventService.eventList;
  }

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.eventService.load();
  }

  select(selected: Event): void {
    this.selectedEvent = selected;
  }

  delete(event: Event): void {
    if (confirm('Are you sure?')) {
      this.eventService.delete(event).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.load();
          }, 1000);
         }
      );
    }
  }
}
