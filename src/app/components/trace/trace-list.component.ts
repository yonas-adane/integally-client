import { Component, OnInit } from '@angular/core';
import { Trace } from 'src/app/models/trace.model';
import { TraceService } from 'src/app/services/trace.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/models/page.model';

@Component({
  selector: 'app-trace-list',
  templateUrl: 'trace-list.component.html'
})
export class TraceListComponent implements OnInit {

  selectedTrace: Trace;
  feedback: any = {};
  tagId: string;
  instanceId: string;

  get tracePageable(): Page<Trace> {
    return this.traceService.tracePageable;
  }

  constructor(private traceService: TraceService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.instanceId = this
      .route
      .snapshot
      .paramMap
      .get('instanceId');

      this.load(this.instanceId);
    
  }

  load(instanceId: string): void {
    this.traceService.loadByInstance(instanceId);
  }

  select(selected: Trace): void {
    this.selectedTrace = selected;
  }

  delete(entity: Trace): void {
    if (confirm('Are you sure?')) {
      this.traceService.deleteTrace(entity).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.load(entity.instanceId);
            this.feedback = null;
          }, 1000);
         }
      );
    }
  }
}
