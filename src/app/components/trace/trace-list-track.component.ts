import { Component, OnInit } from '@angular/core';
import { Trace } from 'src/app/models/trace.model';
import { TraceService } from 'src/app/services/trace.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trace-list-track',
  templateUrl: 'trace-list-track.component.html'
})
export class TraceListTrackComponent implements OnInit {

  selectedTrace: Trace;
  feedback: any = {};
  tagId: string;
  trackingId: string;

  get traceList(): Trace[] {
    return this.traceService.traceList;
  }

  constructor(private traceService: TraceService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
   
    this.tagId = this
      .route
      .snapshot
      .paramMap
      .get('tagId');

    this.trackingId = this
      .route
      .snapshot
      .paramMap
      .get('trackingId');

      this.load(this.tagId, this.trackingId);
    
  }

  load(tagId: string, trackingId: string): void {
    this.traceService.loadByTracking(tagId, trackingId);
  }

  select(selected: Trace): void {
    this.selectedTrace = selected;
  }

  delete(entity: Trace): void {
    if (confirm('Are you sure?')) {
      this.traceService.delete(entity).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.load(entity.tag, entity.trackingId);
          }, 1000);
         }
      );
    }
  }
}
