import { Component, OnInit } from '@angular/core';
import { Trace } from 'src/app/models/trace.model';
import { TraceService } from 'src/app/services/trace.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trace-list',
  templateUrl: 'trace-list.component.html'
})
export class TraceListComponent implements OnInit {

  selectedTrace: Trace;
  feedback: any = {};
  tagId: string;

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

      this.load(this.tagId);
    
  }

  load(tagId: string): void {
    this.traceService.load(tagId);
  }

  select(selected: Trace): void {
    this.selectedTrace = selected;
  }

  delete(entity: Trace): void {
    if (confirm('Are you sure?')) {
      this.traceService.deleteByTagTracking(entity.tagId, entity.trackingId).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.load(entity.tagId);
          }, 1000);
         }
      );
    }
  }
}
