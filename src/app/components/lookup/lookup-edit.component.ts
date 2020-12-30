import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Connector } from 'src/app/models/connector.model';
import { ConnectorService } from 'src/app/services/connector.service';
import { Lookup } from 'src/app/models/lookup.model';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-lookup-edit',
  templateUrl: './lookup-edit.component.html'
})
export class LookupEditComponent implements OnInit {

  id: string ;
  lookup: Lookup;
  feedback: any = {};
  formHeader: string;


  lookupForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    lookups : new FormArray([]),
  });

  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private lookupService: LookupService) {
  }


  get lookupsForms() {
    return this.lookupForm.get('lookups') as FormArray
  }

  addDefaultSetting(){
    this.addLookup(null, null, null);
  }

  addLookup(defaultKey :string, val: string, alternateKey: string): void {

    const lookup = this.formBuilder.group({ 
      defKey: [defaultKey],
      val: [val],
      altKey: [alternateKey],
    })
  
    this.lookupsForms.push(lookup);
    
  }

  deleteSetting(i) {
    
    if (confirm('Are you sure?')) {
      this.lookupsForms.removeAt(i);
    }

  }

  ngOnInit() {

    this.lookupForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      description: [''],
      lookups:this.formBuilder.array([])
    });

    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          
          if (id === 'new') { 
            this.formHeader = "New lookup";
            this.id = id;
            return of(new Lookup()); 
          }

          this.formHeader = "Edit lookup";

          this.id = id;

          return this.lookupService.findById(id);

        })
      )
      .subscribe(lookup => {
        
          this.lookup = lookup;

          this.lookupForm.get('name').setValue(this.lookup.name);
          this.lookupForm.get('description').setValue(this.lookup.description);

          if(this.lookup.lookups != null){
            for (let lookup of this.lookup.lookups) {
              this.addLookup(lookup.defKey, lookup.val, lookup.altKey);
            }
          }
          this.feedback = {};
        }
      );
  }

  get f() { return this.lookupForm.controls; }


  onSubmit() {

      this.lookupService.save(this.lookupForm.value, this.id == 'new' ? true : false).subscribe(
        lookup => {
          this.lookup = lookup;
          this.feedback = {type: 'success', message: 'Save was successful!'};
          setTimeout(() => {
            this.router.navigate(['/lookups']);
          }, 1000);
        }
      );

  }

  cancel() {
    this.router.navigate(['/lookups']);
  }
}
