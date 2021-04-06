import { Component, OnInit } from '@angular/core';
import { Trace } from 'src/app/models/trace.model';
import { TraceService } from 'src/app/services/trace.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/models/page.model';

@Component({
  selector: 'app-trace-instance-list',
  templateUrl: 'trace-instance-list.component.html'
})
export class TraceInstanceListComponent implements OnInit {

  selectedInstance: Trace;
  feedback: any = null;
  eventId: string;

  currentPage: number = 1;

  header: string;

  get tracePageable(): Page<Trace> {
    return this.traceService.tracePageable;
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

      this.header = "Event";

    if(this.eventId == null){

      this.eventId = this
      .route
      .snapshot
      .paramMap
      .get('jobId');

      this.header = "Job";

    }

      this.load(this.eventId,this.currentPage);
    
  }

  loadPage(page: number) {
    this.load(this.eventId, page);
  }

  load(tagId: string, page: number): void {
    this.traceService.loadByEvent(tagId, page);
  }

  select(selected: Trace): void {
    this.selectedInstance = selected;
  }

  getDateDiff(startDate, endDate) {

    return this.traceService.getDateDiff(startDate, endDate);

  }

  delete(entity: Trace): void {
    if (confirm('Are you sure?')) {
      this.traceService.deleteByInstance(entity.instanceId).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.load(this.eventId, this.currentPage);
            this.feedback = null;
          }, 1000);
         }
      );
    }
  }
}
