import { Component, OnInit } from '@angular/core';
import { Trace } from 'src/app/models/trace.model';
import { TraceService } from 'src/app/services/trace.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trace',
  templateUrl: 'trace.component.html'
})
export class TraceComponent implements OnInit {

  feedback: any = {};

  traceId: string;

  get trace(): Trace{
    return this.traceService.trace;
  }

  constructor(private traceService: TraceService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
   
    this.traceId = this
      .route
      .snapshot
      .paramMap
      .get('id');

      this.load(this.traceId);
    
  }

  load(traceId: string): void {
    this.traceService.findById(traceId);
  }

}