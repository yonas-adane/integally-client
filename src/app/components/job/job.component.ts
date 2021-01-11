import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job',
  templateUrl: 'job.component.html'
})
export class JobComponent implements OnInit {

  id: string;
  job: Job;

  events: Event[];
  statuses: String[] =['BEGIN','RUN','HOLD','DONE'];

  feedback: any = {};

  jobForm: FormGroup;

  get jobsPageable(): Page<Job> {
    return this.jobService.jobPageable;
  }

  constructor(private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router, 
    private jobService: JobService
    ) {

    
    }

  get f() { return this.jobForm.controls; }

  initalizeForm() {
  
    this.jobForm = this.formBuilder.group({
      id: [null],
      eventId: [null, Validators.required],
      message: ['', Validators.required],
      status: [null, Validators.required]
    });

  }
  

  ngOnInit() {

    this.initalizeForm();

    this
    .route
    .params
    .pipe(
      map(p => p.id),
      switchMap(id => {
        
        this.id = id;

         
        this.load();

        

        return of(new Job());

      })
    )
    .subscribe(lookup => {


      return of(new Job());

    });

 }

  load(): void {
    this.jobService.load();
  }


  onSubmit() {

    this.jobService.save(this.jobForm.value).subscribe(
      result => {
        this.job = result;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        this.jobForm.reset();
        setTimeout(() => {
          this.load();
          this.feedback = null;
        }, 1000);
      }
    );



}

  delete(entity: Job): void {
    if (confirm('Are you sure?')) {
      this.jobService.delete(entity).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.load();
            this.feedback = null;
          }, 1000);
         }
      );
    }
  }

  setForEdit(job: Job){
    if (confirm('Are you sure?')) {

      this.f['id'].setValue(job.id);
      this.f['eventId'].setValue(job.eventId);
      this.f['message'].setValue(job.message);
      this.f['status'].setValue(job.status);

    }
  }

  clearForm(){
    this.jobForm.reset();
  }

}
