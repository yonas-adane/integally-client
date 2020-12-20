import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Job } from 'src/app/models/job.model';
import { TraceService } from 'src/app/services/trace.service';

@Component({
  selector: 'app-job',
  templateUrl: 'job-list.component.html'
})
export class JobListComponent implements OnInit {

  selectedJob: Job;
  feedback: any = {};

  get jobList(): Job[] {
    return this.jobService.jobList;
  }

  constructor(private jobService: JobService, private traceService: TraceService) {
  }

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.jobService.load();
  }

  select(selected: Job): void {
    this.selectedJob = selected;
  }

   start(job: Job): void {
    if (confirm('Are you sure?')) {

      this.jobService.start(job).subscribe(() => {
        this.feedback = {type: 'success', message: 'Job run request submitted'};
        setTimeout(() => {
          this.load();
        }, 1000);
       }
    );

    }
  }

  startQueue(): void {
    if (confirm('Are you sure?')) {

      this.jobService.startQueue().subscribe(() => {
        this.feedback = {type: 'success', message: 'Job queue run request submitted'};
        setTimeout(() => {
          this.load();
        }, 1000);
       }
    );

    }
  }

  delete(job: Job): void {
    if (confirm('Are you sure? This will also delete all trace data for this job.')) {
      this.deleteTraceNoPrompt(job.id);
      this.deleteJobNoPrompt(job);
    }
  }

  deleteTrace(job: Job): void {
    if (confirm('Are you sure?')) {
      this.deleteTraceNoPrompt(job.id);
    }
  }

  deleteJobNoPrompt(job: Job): void{
    this.jobService.delete(job).subscribe(() => {
      this.feedback = {type: 'success', message: 'Job delete was successful!'};
      setTimeout(() => {
        this.load();
      }, 1000);
     }
  );
  }

  deleteTraceNoPrompt(jobId: string): void {
    this.traceService.deleteByJob(jobId).subscribe(() => {
      this.feedback = {type: 'success', message: 'Trace delete was successful!'};
      setTimeout(() => {
        this.load();
      }, 1000);
     }
  );
  }

  getDateDiff(startDate, endDate) {

    return this.traceService.getDateDiff(startDate, endDate);

  }


}
