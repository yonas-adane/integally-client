import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { File } from 'src/app/models/file.model';
import { ConnectorService } from 'src/app/services/connector.service';
import { Connector } from 'src/app/models/connector.model';
import { Page } from 'src/app/models/page.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-connector',
  templateUrl: 'connector.component.html'
})
export class ConnectorListComponent implements OnInit {

  connector: Connector;
  selectedConnector: Connector;
  feedback: any = {};

  connectorForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    packageFile: new FormControl('')
  });

  get connectorsPageable(): Page<Connector> {
    return this.connectorService.connectorsPageable;
  }

  constructor(  private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router, private connectorService: ConnectorService) {
  }

  ngOnInit() {

    this.connector = new Connector();
    
    this.connectorForm = this.formBuilder.group({
      id: [''],
      name: ['',[Validators.required]],
      description: [''],
      packageFile: [null]
    });
    
    this.load();
  }

  load(): void {
    this.connectorService.load();
  }

  get f() { return this.connectorForm.controls; }


  select(selected: Connector): void {
    this.selectedConnector = selected;
  }

  clearForm(){
    this.connectorForm.reset();
  }

  setForEdit(connector: Connector){


    if (confirm('Are you sure?')) {

      this.f['id'].setValue(connector.id);
      this.f['name'].setValue(connector.name);
      this.f['description'].setValue(connector.description);
      this.f['packageFile'].setValue(connector.packageFile);

    }

  }

  delete(connector: Connector): void {
    if (confirm('Are you sure?')) {
      this.connectorService.delete(connector).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.load();
            this.feedback = null;
          }, 1000);
         }
      );
    }
  }


  onSubmit() {

    const formData = new FormData();
    const id = this.connectorForm.get('id').value;

    formData.append('id', id);
    formData.append('name', this.connectorForm.get('name').value);
    formData.append('description', this.connectorForm.get('description').value);
    formData.append('packageFile', this.connectorForm.get('packageFile').value);

      this.connectorService.save(formData, id ).subscribe(
      connector => {
        this.connector = connector;
        this.connectorForm.reset();
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.load();
          this.feedback = null;
        }, 1000);
      }
    );



}


onFileSelect(event) {
  if (event.target.files.length > 0) {
    const packageFile = event.target.files[0];
    this.connectorForm.get('packageFile').setValue(packageFile);    
  }
}

}


