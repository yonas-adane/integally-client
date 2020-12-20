import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Connector } from 'src/app/models/connector.model';
import { ConnectorService } from 'src/app/services/connector.service';

@Component({
  selector: 'app-lookup-edit',
  templateUrl: './lookup-edit.component.html'
})
export class LookupEditComponent implements OnInit {

  id: string ;
  connector: Connector;
  feedback: any = {};
  formHeader: string;

  settings = new FormArray([]);

  connectorForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    settings : new FormArray([]),
  });

  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private connectorService: ConnectorService) {
  }


  get settingForms() {
    return this.connectorForm.get('settings') as FormArray
  }

  addDefaultSetting(){
    this.addSetting(null, null, null);
  }

  addSetting(profile :string, key: string, value: string): void {

    const setting = this.formBuilder.group({ 
      profile: [profile],
      key: [key],
      value: [value],
    })
  
    this.settingForms.push(setting);
    
  }

  deleteSetting(i) {
    
    if (confirm('Are you sure?')) {
      this.settingForms.removeAt(i);
    }

  }

  ngOnInit() {

    this.connectorForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      description: [''],
      settings:this.formBuilder.array([])
    });

    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          
          if (id === 'new') { 
            this.formHeader = "New connector";
            this.id = id;
            return of(new Connector()); 
          }

          this.formHeader = "Edit connector";

          this.id = id;

          return this.connectorService.findById(id);

        })
      )
      .subscribe(connector => {
        
          this.connector = connector;

          this.connectorForm.get('name').setValue(this.connector.name);
          this.connectorForm.get('description').setValue(this.connector.description);

          if(this.connector.setting != null){
            for (let setting of this.connector.setting) {
              this.addSetting(setting.profile, setting.key, setting.value);
            }
          }
          this.feedback = {};
        }
      );
  }

  get f() { return this.connectorForm.controls; }


  onSubmit() {

    const connnector = new Connector();

    connnector.id = this.id =='new' ? null : this.id;
    connnector.name = this.connectorForm.get('name').value;
    connnector.description = this.connectorForm.get('description').value;
    connnector.setting = this.connectorForm.get('settings').value;

      this.connectorService.save(connnector, this.id == 'new' ? true : false).subscribe(
        connector => {
          this.connector = connector;
          this.feedback = {type: 'success', message: 'Save was successful!'};
          setTimeout(() => {
            this.router.navigate(['/connectors']);
          }, 1000);
        }
      );

  }

  cancel() {
    this.router.navigate(['/connectors']);
  }
}
