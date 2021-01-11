import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MessageAttributeMap, MessageTemplateMap } from 'src/app/models/message-template-map.model';
import { Connector } from 'src/app/models/connector.model';
import { EventTemplateService } from 'src/app/services/event-template.service';
import { EventTemplate } from 'src/app/models/event-template.model';
import { ConnectorService } from 'src/app/services/connector.service';
import { EventMessageService } from 'src/app/services/event-message.service';

@Component({
  selector: 'app-event-template',
  templateUrl: 'event-template.component.html'
})
export class EventTemplateComponent implements OnInit {

  id: string;
  event: EventTemplate;
  eventId: string;

  connectorLookup: Connector[];
  queueNameLookup: String[];

  feedback: any = {};

  eventTemplateForm: FormGroup;

  get eventTemplatesPageable(): Page<EventTemplate> {
    return this.eventTemplateService.eventTemplatePageable;
  }

  constructor(private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router, 
    private eventTemplateService: EventTemplateService,
    private connectorService: ConnectorService,
    private eventMessageService: EventMessageService
    ) {

    
    }

  get f() { return this.eventTemplateForm.controls; }

  initalizeForm() {
  
    this.eventTemplateForm = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      description: [null],
      eventTemplateConnectors: this.formBuilder.array([
        this.newEventTemplateConnectorForm()
      ]),
      message: [null, Validators.required],
      className: ['', Validators.required],
      traceEnabled: [true],
      inactive: [false],
      routeDefinition: [null, Validators.required],
      queueName: ['', Validators.required]
    });

  }
 
  eventTemplateConnectors(): FormArray {
    return this.eventTemplateForm.get("eventTemplateConnectors") as FormArray
  }

  newEventTemplateConnectorForm(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      eventId: [''],
      connectorId: [null, [Validators.required]],
    })
  }

  addEventTemplateConnector() {
    this.eventTemplateConnectors().push(this.newEventTemplateConnectorForm());
  }

  removeEventTemplateConnector(index: number) {
    this.eventTemplateConnectors().removeAt(index);
  }


  ngOnInit() {

   

    this
    .route
    .params
    .pipe(
      map(p => p.id),
      switchMap(id => {
        
        this.id = id;

        this.initalizeForm();

        this.load();

        this.connectorService.lookup().subscribe(
          result => {
            this.connectorLookup = result;
          }
        );

        this.eventMessageService.lookup().subscribe(
          result => { 
            this.queueNameLookup = result;
          }
        );

        return of(new EventTemplate());

      })
    )
    .subscribe(lookup => {


      return of(new EventTemplate());

    });

 }

  load(): void {
    this.eventTemplateService.load();
  }


  onSubmit() {

    this.eventTemplateService.save(this.eventTemplateForm.value).subscribe(
      result => {
        this.event = result;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        this.eventTemplateForm.reset();
        setTimeout(() => {
          this.load();
          this.feedback = null;
        }, 1000);
      }
    );



}

  delete(entity: EventTemplate): void {
    if (confirm('Are you sure?')) {
      this.eventTemplateService.delete(entity).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.load();
            this.feedback = null;
          }, 1000);
         }
      );
    }
  }

  setForEdit(eventTemplate: EventTemplate){
    if (confirm('Are you sure?')) {

      this.f['id'].setValue(eventTemplate.id);
      this.f['name'].setValue(eventTemplate.name);
      this.f['description'].setValue(eventTemplate.description);

      this.eventTemplateConnectors().clear();

      eventTemplate.eventTemplateConnectors.forEach(element => {

        let connector = this.formBuilder.group({
          id: [element.id],
          eventId: [element.eventId],
          connectorId: [element.connectorId],
        });

        this.eventTemplateConnectors().push(connector);
      });


      this.f['message'].setValue(eventTemplate.message);
      this.f['className'].setValue(eventTemplate.className);
      this.f['traceEnabled'].setValue(eventTemplate.traceEnabled);
      this.f['inactive'].setValue(eventTemplate.inactive);
      this.f['routeDefinition'].setValue(eventTemplate.routeDefinition);

    }
  }

  clearForm(){
    this.eventTemplateForm.reset();
  }

}