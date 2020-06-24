import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { TraceService } from 'src/app/services/trace.service';

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

  constructor(private eventService: EventService, private traceService: TraceService) {
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
    if (confirm('Are you sure? This will also delete all trace data for this event.')) {

      this.deleteTraceNoPrompt(event.id);
      this.deleteEventNoPrompt(event);

    }
  }

  deleteTrace(event: Event): void {
    if (confirm('Are you sure? ')) {
      this.deleteTraceNoPrompt(event.id);
    }
  }

  deleteTraceNoPrompt(eventId: string): void {
    this.traceService.deleteByEvent(eventId).subscribe(() => {
      this.feedback = {type: 'success', message: 'Trace delete was successful!'};
      setTimeout(() => {
        this.load();
      }, 1000);
     }
  );
  }

  deleteEventNoPrompt(event: Event): void {
  
    this.eventService.delete(event).subscribe(() => {
      this.feedback = {type: 'success', message: 'Event delete was successful!'};

      setTimeout(() => {
        this.load();
      }, 1000);
      
     }
  );

  }


}
