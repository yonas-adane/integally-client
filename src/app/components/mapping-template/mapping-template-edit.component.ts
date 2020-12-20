import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Connector } from 'src/app/models/connector.model';
import { ConnectorService } from 'src/app/services/connector.service';
import { Attribute, MappingTemplate } from 'src/app/models/mapping-template.model';
import { MappingTemplateService } from 'src/app/services/mapping-template.service';

@Component({
  selector: 'app-mapping-template-edit',
  templateUrl: './mapping-template-edit.component.html'
})
export class MappingTemplateEditComponent implements OnInit {

  id: string ;
  mappingTemplate: MappingTemplate;
  feedback: any = {};
  formHeader: string;

  dataTypes: string[] = ['Boolean','Number','String','Object','Array'];

  

  mappingTemplateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private mappingTemplateService: MappingTemplateService) {

      this.mappingTemplateForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        description: new FormControl(''),
        sourceTemplate: new FormControl(''),
        targetTemplate: new FormControl(''),
        transformScript: new FormControl(''),
        mapping : new FormArray([]),
      });

  }


  get mappigForm(): FormArray {
    return this.mappingTemplateForm.get('mapping') as FormArray
  }


  buildMapping(functionId: string, clientFunctionId: string,  target: Attribute, source: Attribute[],  inactive: boolean): void {

    const mapping = this.formBuilder.group({ 
      function: [functionId],
      clientFunction: [clientFunctionId],
      target: this.buildAttribute(target),
      source: this.buildAttributes(source),
      inactive: [inactive],
    })
  
    this.mappigForm.push(mapping);
    
  }

  getSourceAttributes(mappingIndex: number): FormArray {
    return this.mappigForm
      .at(mappingIndex)
      .get("source") as FormArray;
  }

  buildAttributes(attribute: Attribute[]): FormArray {

    let attributes = this.formBuilder.array([]);

    attribute.forEach(attribute => {
      const sourceAttribute = this.buildAttribute(attribute);
      attributes.push(sourceAttribute);
    });

    return attributes;

  }

  buildAttribute(attribute: Attribute): FormGroup{

    return this.formBuilder.group({
      name: [attribute.name,[Validators.required]],
      dataType: [attribute.dataType,[Validators.required]],
      defaultValue: [attribute.defaultValue],
    });

  }


  deleteMapping(mappingIndex: number) {
    
    if (confirm('Are you sure to delete this mapping?')) {
      this.mappigForm.removeAt(mappingIndex);
    }

  }


  deleteSourceAttribute(mappingIndex: number, sourceIndex: number){

    if (confirm('Are you sure to delete this source?')) {
      this.getSourceAttributes(mappingIndex).removeAt(sourceIndex);
    }

  }

  addMapping() {
    this.mappigForm.push(this.newMapping());
  }

  newMapping(): FormGroup{

    return this.formBuilder.group({ 
      function: [''],
      clientFunction: [''],
      target: this.newSourceAttribute(),
      source: this.formBuilder.array([
        this.newSourceAttribute()
      ]),
      inactive: [false],
    })

  }

  addSourceAttribute(mappingIndex: number) {
    this.getSourceAttributes(mappingIndex).push(this.newSourceAttribute());
  }

  newSourceAttribute(): FormGroup {
    return this.formBuilder.group({
      name: ['',[Validators.required]],
      dataType: ['',[Validators.required]],
      defaultValue: [''],
    });
  }

  ngOnInit() {

    this.mappingTemplateForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      description: [''],
      transformScript: ['',[Validators.required]],
      mapping:this.formBuilder.array([])
    });

    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          
          if (id === 'new') { 
            this.formHeader = "New mapping";
            this.id = id;
            return of(new MappingTemplate()); 
          }

          this.formHeader = "Edit mapping";

          this.id = id;

          return this.mappingTemplateService.findById(id);

        })
      )
      .subscribe(mappingTemplate => {
        
          this.mappingTemplate = mappingTemplate;

          this.mappingTemplateForm.get('name').setValue(this.mappingTemplate.name);
          this.mappingTemplateForm.get('description').setValue(this.mappingTemplate.description);
          this.mappingTemplateForm.get('transformScript').setValue(this.mappingTemplate.transformScript);

          if(this.mappingTemplate.maps != null){
            for (let mapping of this.mappingTemplate.maps) {
              this.buildMapping(mapping.function, mapping.clientFunction, mapping.target, mapping.source, mapping.inactive);
            }
          }

          this.feedback = {};
        }
      );
  }

  get f() { return this.mappingTemplateForm.controls; }


  onSubmit() {

    // const connnector = new Connector();

    // connnector.id = this.id =='new' ? null : this.id;
    // connnector.name = this.connectorForm.get('name').value;
    // connnector.description = this.connectorForm.get('description').value;
    // connnector.setting = this.connectorForm.get('settings').value;

    //   this.connectorService.save(connnector, this.id == 'new' ? true : false).subscribe(
    //     connector => {
    //       this.connector = connector;
    //       this.feedback = {type: 'success', message: 'Save was successful!'};
    //       setTimeout(() => {
    //         this.router.navigate(['/connectors']);
    //       }, 1000);
    //     }
    //   );

  }

  cancel() {
    this.router.navigate(['/mappingTemplate']);
  }
}
