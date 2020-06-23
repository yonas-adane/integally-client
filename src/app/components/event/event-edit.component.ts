import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Event } from 'src/app/models/event.model';
import { EventService } from 'src/app/services/event.service';
import { Connector } from 'src/app/models/connector.model';
import { ConnectorService } from 'src/app/services/connector.service';
import { FileService } from 'src/app/services/file.service';
import { File } from 'src/app/models/file.model';


@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html'
})
export class EventEditComponent implements OnInit {

  id: string ;
  event: Event;
  feedback: any = {};
  formHeader: string;

  connectorLookup: Connector[]=[];
  fileLookup: File[]=[];

  settings = new FormArray([]);

  eventForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    sourceConnector : new FormArray([]),
    routeLibrary : new FormArray([]),
    routeName : new FormArray([]),
    traceEnabled : new FormArray([]),
  });

  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private connectorService: ConnectorService,
    private fileService: FileService) {
  }

  ngOnInit() {

    this.eventForm = this.formBuilder.group({
      id: [''],
      name: ['',[Validators.required]],
      description: [''],
      sourceConnector: [null,[Validators.required]],
      routeLibrary: [null,[Validators.required]],
      routeName: ['',[Validators.required]],
      traceEnabled: [false],
    });


    this.connectorService.lookup().subscribe(
      connectors => {
        this.connectorLookup = connectors;
      }
    );

    this.fileService.lookup().subscribe(
      files => {
        this.fileLookup = files;
      }
    );



    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          
          if (id === 'new') { 
            this.formHeader = "New event";
            this.id = id;
            return of(new Event()); 
          }

          this.formHeader = "Edit event";

          this.id = id;

          return this.eventService.findById(id);

        })
      )
      .subscribe(connector => {
        
          this.event = connector;

          this.f.name.setValue(this.event.name);
          this.f.description.setValue(this.event.description);
          this.f.sourceConnector.setValue(this.event.sourceConnector);
          this.f.routeLibrary.setValue(this.event.routeLibrary);
          this.f.routeName.setValue(this.event.routeName);
          this.f.traceEnabled.setValue(this.event.traceEnabled);

          this.feedback = {};
        }
      );
  }

  get f() { return this.eventForm.controls; }


  onSubmit() {

    const event = new Event();

    event.id = this.id =='new' ? null : this.id;
    event.name = this.f.name.value;
    event.description = this.f.description.value;
    event.sourceConnector = this.f.sourceConnector.value;
    event.routeLibrary = this.f.routeLibrary.value;
    event.routeName = this.f.routeName.value;
    event.traceEnabled = this.f.traceEnabled.value;

      this.eventService.save(event, this.id == 'new' ? true : false).subscribe(
        connector => {
          this.event = connector;
          this.feedback = {type: 'success', message: 'Save was successful!'};
          setTimeout(() => {
            this.router.navigate(['/events']);
          }, 1000);
        }
      );

  }

  cancel() {
    this.router.navigate(['/events']);
  }
}
