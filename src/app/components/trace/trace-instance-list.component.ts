import { Component, OnInit } from '@angular/core';
import { Trace } from 'src/app/models/trace.model';
import { TraceService } from 'src/app/services/trace.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trace-instance-list',
  templateUrl: 'trace-instance-list.component.html'
})
export class TraceInstanceListComponent implements OnInit {

  selectedInstance: Trace;
  feedback: any = {};
  eventId: string;

  get traceList(): Trace[] {
    return this.traceService.traceList;
  }

  constructor(private traceService: TraceService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
   
    this.eventId = this
      .route
      .snapshot
      .paramMap
      .get('eventId');

      this.load(this.eventId);
    
  }

  load(tagId: string): void {
    this.traceService.loadByEvent(tagId);
  }

  select(selected: Trace): void {
    this.selectedInstance = selected;
  }

  delete(entity: Trace): void {
    if (confirm('Are you sure?')) {
      this.traceService.deleteByInstance(entity.instanceId).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.load(entity.eventId);
          }, 1000);
         }
      );
    }
  }
}
