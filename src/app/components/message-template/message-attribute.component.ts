import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Lookup, LookupGroup } from 'src/app/models/lookupGroup.model';
import { LookupGroupService } from 'src/app/services/lookup-group.service';
import { LookupService } from 'src/app/services/lookup.service';
import { MessageAttribute, MessageTemplate } from 'src/app/models/message-template.model';
import { MessageTemplateService } from 'src/app/services/message-template.service';
import { MessageAttributeService } from 'src/app/services/message-attribute.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-message-attribute',
  templateUrl: 'message-attribute.component.html'
})
export class MessageAttributeComponent implements OnInit {

  messageTemplateId: string;
  messageTemplate: MessageTemplate;

  messageAttribute: MessageAttribute;
  feedback: any = {};

  dataTypes: String[] = ['String', 'Boolean', 'Number', 'Object', 'Array'];

  messageAttributeForm = new FormGroup({
    id: new FormControl(''),
    messageTemplateId: new FormControl(''),
    name: new FormControl(''),
    dataType: new FormControl(''),
    defaultValue: new FormControl(''),
    depth: new FormControl('')
  });

  get messageAttributesPageable(): Page<MessageAttribute> {
    return this.messageAttributeService.messageAttributePageable;
  }

  constructor(private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router, 
    private messageTemplateService: MessageTemplateService,
    private messageAttributeService: MessageAttributeService
    ) {

    
    }

 get f() { return this.messageAttributeForm.controls; }

 initalizeForm(){
  
  this.messageAttributeForm = this.formBuilder.group({
    id: [null],
    messageTemplateId: [null],
    name: ['',[Validators.required]],
    dataType: ['', [Validators.required]],
    defaultValue: [null],
    depth: [0,[Validators.required]]
  });

 }


  ngOnInit() {

    this.initalizeForm();

    this
    .route
    .params
    .pipe(
      map(p => p.messageTemplateId),
      switchMap(id => {
        
        this.messageTemplateId = id;

        this.messageTemplateService.findById(this.messageTemplateId).subscribe(
          result => {
            this.messageTemplate = result;
          }
        );
         
        this.load(this.messageTemplateId);

        return of(new MessageAttribute());

      })
    )
    .subscribe(lookup => {


      return of(new MessageAttribute());

    });

 }

  load(lookupGroupId: String): void {
    this.messageAttributeService.load(lookupGroupId);
  }


  onSubmit() {

    this.messageAttributeForm.get('messageTemplateId').setValue(this.messageTemplateId);

    this.messageAttributeService.save(this.messageAttributeForm.value).subscribe(
      result => {
        this.messageAttribute = result;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        this.messageAttributeForm.reset();
        setTimeout(() => {
          this.load(this.messageTemplateId);
          this.feedback = null;
        }, 1000);
      }
    );



}

  delete(entity: MessageAttribute): void {
    if (confirm('Are you sure?')) {
      this.messageAttributeService.delete(entity).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.load(this.messageTemplateId);
            this.feedback = null;
          }, 1000);
         }
      );
    }
  }

  setForEdit(messageAttribute: MessageAttribute){
    if (confirm('Are you sure?')) {

      this.messageAttributeForm.get('id').setValue(messageAttribute.id);
      this.messageAttributeForm.get('messageTemplateId').setValue(this.messageTemplateId);
      this.messageAttributeForm.get('name').setValue(messageAttribute.name);
      this.messageAttributeForm.get('dataType').setValue(messageAttribute.dataType);
      this.messageAttributeForm.get('defaultValue').setValue(messageAttribute.defaultValue);
      this.messageAttributeForm.get('depth').setValue(messageAttribute.depth);
    }
  }

  clearForm(){
    this.messageAttributeForm.reset();
  }

}
