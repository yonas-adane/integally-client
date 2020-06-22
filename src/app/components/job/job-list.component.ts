import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Job } from 'src/app/models/job.model';

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

  constructor(private jobService: JobService) {
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

  translateStatus(id: number): String{

    switch(id) { 
      case 0: 
         return "Ready"; 
      case 1: 
         return "Processing"; 
      case 2: 
         return "Done"; 
      case 3: 
         return "Failed"; 
      case 4: 
         return "Hold"; 
      default: 
        return "UNKNOWN";  
   } 

  }

  delete(job: Job): void {
    if (confirm('Are you sure?')) {
      this.jobService.delete(job).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.load();
          }, 1000);
         }
      );
    }
  }
}
