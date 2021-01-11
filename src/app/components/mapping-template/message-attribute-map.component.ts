import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MessageAttributeMap, MessageTemplateMap } from 'src/app/models/message-template-map.model';
import { MessageAttributeMapService } from 'src/app/services/message-attribute-map.service';
import { MessageTemplateMapService } from 'src/app/services/message-template-map.service';
import { MessageAttribute } from 'src/app/models/message-template.model';
import { MessageAttributeService } from 'src/app/services/message-attribute.service';

@Component({
  selector: 'app-message-attribute-map',
  templateUrl: 'message-attribute-map.component.html'
})
export class MessageAttributeMapComponent implements OnInit {

  messageTemplateMapId: string;
  messageTemplateMap: MessageTemplateMap;
  messageAttributeMap: MessageAttributeMap;

  sourceMessageAttributeLookup: MessageAttribute[];
  targetMessageAttributeLookup: MessageAttribute[];

  feedback: any = {};

  messageAttributeMapForm: FormGroup;

  get messageAttributeMapsPageable(): Page<MessageAttributeMap> {
    return this.messageAttributeMapService.messageAttributeMapPageable;
  }

  constructor(private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router, 
    private messageTemplateMapService: MessageTemplateMapService,
    private messageAttributeMapService: MessageAttributeMapService,
    private messageAttributeService: MessageAttributeService
    ) {

    
    }

 get f() { return this.messageAttributeMapForm.controls; }

 initalizeForm(){
  
  this.messageAttributeMapForm = this.formBuilder.group({
    id: [null],
    sourceMessageAttributes: this.formBuilder.array([
      this.newSourceMessageAttribute(this.messageTemplateMapId)
    ]),
    messageTemplateMapId: [null],
    function: ['',[Validators.required]],
    clientFunction: [''],
    targetMessageAttributeId: [null,[Validators.required]],
    inactive: [false]
  });

 }
  
  
  sourceMessageAttributes(): FormArray {
    return this.messageAttributeMapForm.get("sourceMessageAttributes") as FormArray
  }

  newSourceMessageAttribute(messageTemplateMapId: String): FormGroup {
    return this.formBuilder.group({
      id: [null],
      messageAttributeMapId: [messageTemplateMapId],
      sourceMessageAttributeId: [null, [Validators.required]],
    })
  }

  addSourceMessageAttribute() {
    this.sourceMessageAttributes().push(this.newSourceMessageAttribute(this.messageTemplateMapId));
  }

  removeSourceMessageAttribute(index: number) {
    this.sourceMessageAttributes().removeAt(index);
  }


  ngOnInit() {


    this
    .route
    .params
    .pipe(
      map(p => p.messageTemplateMapId),
      switchMap(id => {
        
        this.messageTemplateMapId = id;

        this.initalizeForm();

        this.messageTemplateMapService.findById(this.messageTemplateMapId).subscribe(
          result => {
            this.messageTemplateMap = result;

            this.messageAttributeService.lookup(this.messageTemplateMap.sourceMessageTemplateId).subscribe(
              result => {
                this.sourceMessageAttributeLookup = result;
              }
            );

            this.messageAttributeService.lookup(this.messageTemplateMap.targetMessageTemplateId).subscribe(
              result => {
                this.targetMessageAttributeLookup = result;
              }
            );


          }
        );
         
        this.load(this.messageTemplateMapId);

        

        return of(new MessageAttributeMap());

      })
    )
    .subscribe(lookup => {


      return of(new MessageAttributeMap());

    });

 }

  load(lookupGroupId: String): void {
    this.messageAttributeMapService.load(lookupGroupId);
  }


  onSubmit() {

    this.messageAttributeMapForm.get('messageTemplateMapId').setValue(this.messageTemplateMapId);

    this.messageAttributeMapService.save(this.messageAttributeMapForm.value).subscribe(
      result => {
        this.messageAttributeMap = result;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        this.messageAttributeMapForm.reset();
        setTimeout(() => {
          this.load(this.messageTemplateMapId);
          this.feedback = null;
        }, 1000);
      }
    );



}

  delete(entity: MessageAttributeMap): void {
    if (confirm('Are you sure?')) {
      this.messageAttributeMapService.delete(entity).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.load(this.messageTemplateMapId);
            this.feedback = null;
          }, 1000);
         }
      );
    }
  }

  setForEdit(messageAttributeMap: MessageAttributeMap){
    if (confirm('Are you sure?')) {

      this.messageAttributeMapForm.get('id').setValue(messageAttributeMap.id);
      this.messageAttributeMapForm.get('messageTemplateMapId').setValue(this.messageTemplateMapId);
      this.messageAttributeMapForm.get('function').setValue(messageAttributeMap.function);

      this.sourceMessageAttributes().clear();

      messageAttributeMap.sourceMessageAttributes.forEach(element => {
        
        let sourceAttributes = this.formBuilder.group({
          id: [element.id],
          messageAttributeMapId: [this.messageTemplateMapId],
          sourceMessageAttributeId: [element.sourceMessageAttributeId],
        });

        this.sourceMessageAttributes().push(sourceAttributes);
      });

      this.messageAttributeMapForm.get('clientFunction').setValue(messageAttributeMap.clientFunction);
      this.messageAttributeMapForm.get('targetMessageAttributeId').setValue(messageAttributeMap.targetMessageAttributeId);
      this.messageAttributeMapForm.get('inactive').setValue(messageAttributeMap.inactive);
    }
  }

  clearForm(){
    this.messageAttributeMapForm.reset();
  }

}
