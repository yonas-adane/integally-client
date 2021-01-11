import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventMessage } from 'src/app/models/event-message.model';
import { EventTemplate } from 'src/app/models/event-template.model';
import { Page } from 'src/app/models/page.model';
import { EventMessageService } from 'src/app/services/event-message.service';
import { EventTemplateService } from 'src/app/services/event-template.service';

@Component({
  selector: 'app-event-message',
  templateUrl: 'event-message.component.html'
})
export class EventMessageComponent implements OnInit {

  selectedEventMessage: EventMessage;
  eventMessage: EventMessage;
  eventLookup: EventTemplate[];

  feedback: any = {};

  get eventMessagesPageable(): Page<EventMessage> {
    return this.eventMessageService.eventMessagePageable;
  }

  constructor(    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private eventMessageService: EventMessageService,
    private eventTemplateService: EventTemplateService) {
  }

  eventMessageForm = new FormGroup({
    id: new FormControl(''),
    eventId: new FormControl(''),
    message: new FormControl('')
  });

  get f() { return this.eventMessageForm.controls; }

  ngOnInit() {

    this.eventMessageForm = this.formBuilder.group({
      id: [''],
      eventId: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });

    this.eventTemplateService.lookup().subscribe(
      result => {
        this.eventLookup = result;
      }
    );

    this.load();
  }

  load(): void {
    this.eventMessageService.load(null, null);
  }

  delete(entity: EventMessage): void {
    if (confirm('Are you sure?')) {
      this.eventMessageService.delete(entity).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.load();
            this.feedback = null;
          }, 1000);
         }
      );
    }
  }

  setForEdit(entity: EventMessage){

    if (confirm('Are you sure?')) {

      this.f['id'].setValue(entity.id);
      this.f['eventId'].setValue(entity.eventId);
      this.f['message'].setValue(entity.message);

    }

  }

  onSubmit(){

    const id = this.eventMessageForm.get('id').value;

    const isCreate = id == null || id.length == 0 ? true : false;
    
        this.eventMessageService.save(this.eventMessageForm.value, isCreate ).subscribe(
        result => {
            this.eventMessage = result;
          this.feedback = {type: 'success', message: 'Save was successful!'};
          this.eventMessageForm.reset();
          this.load();
          setTimeout(() => {
            this.feedback = null;
          }, 1000);
        }
      );

  }

  clearForm(){
    this.eventMessageForm.reset();
  }

  

}

