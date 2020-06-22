import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html'
})
export class JobEditComponent implements OnInit {

  id: string ;
  job: Job;
  feedback: any = {};
  formHeader: string;

  settings = new FormArray([]);

  jobForm = new FormGroup({
    id: new FormControl(''),
    dateStart: new FormControl(''),
    dateEnd: new FormControl(''),
    dateAdded : new FormArray([]),
    priority : new FormArray([]),
    event : new FormArray([]),
    status : new FormArray([]),
    tag : new FormArray([]),
  });

  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService) {
  }

  ngOnInit() {

    this.jobForm = this.formBuilder.group({
      id: [''],
      dateStart: [''],
      dateEnd: [''],
      dateAdded: [''],
      priority: ['',[Validators.required]],
      event: [''],
      status: ['',[Validators.required]],
      tag: ['']
    });

    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          
          if (id === 'new') { 
            this.formHeader = "New job";
            this.id = id;
            return of(new Job()); 
          }

          this.formHeader = "Edit job";

          this.id = id;

          return this.jobService.findById(id);

        })
      )
      .subscribe(job => {
        
          this.job = job;

          this.f.dateStart.setValue(this.job.dateStart);
          this.f.dateEnd.setValue(this.job.dateEnd);
          this.f.dateAdded.setValue(this.job.dateAdded);
          this.f.priority.setValue(this.job.priority);
          this.f.event.setValue(this.job.event);
          this.f.status.setValue(this.job.status);
          this.f.tag.setValue(this.job.tag);

          this.feedback = {};
        }
      );
  }

  get f() { return this.jobForm.controls; }


  onSubmit() {

    const job = new Job();

    job.id = this.id =='new' ? null : this.id;
    job.dateStart = this.f.dateStart.value;
    job.dateEnd = this.f.dateEnd.value;
    job.dateAdded = this.f.dateAdded.value;
    job.priority = this.f.priority.value;
    job.event = this.f.event.value;
    job.status = this.f.status.value;
    job.tag = this.f.tag.value;


      this.jobService.save(job, this.id == 'new' ? true : false).subscribe(
        connector => {
          this.job = connector;
          this.feedback = {type: 'success', message: 'Save was successful!'};
          setTimeout(() => {
            this.router.navigate(['/jobs']);
          }, 1000);
        }
      );

  }

  cancel() {
    this.router.navigate(['/jobs']);
  }
}
