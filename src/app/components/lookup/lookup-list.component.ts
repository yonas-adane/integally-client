import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { TraceService } from 'src/app/services/trace.service';
import { Lookup } from 'src/app/models/lookup.model';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-lookup',
  templateUrl: 'lookup-list.component.html'
})
export class LookupListComponent implements OnInit {

  selectedLookup: Lookup;
  feedback: any = {};

  get lookupList(): Lookup[] {
    
    return this.lookupService.lookupList;
  }

  constructor(private lookupService: LookupService) {
  }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.lookupService.load();
    
  }

  select(selected: Lookup): void {
    this.selectedLookup = selected;
  }

  delete(event: Event): void {
    if (confirm('Are you sure? This will also delete all trace data for this event.')) {

 

    }
  }

  

}

