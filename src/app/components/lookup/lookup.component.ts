import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Lookup, LookupGroup } from 'src/app/models/lookupGroup.model';
import { LookupGroupService } from 'src/app/services/lookup-group.service';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-lookup',
  templateUrl: 'lookup.component.html'
})
export class LookupComponent implements OnInit {

  lookupGroup: LookupGroup;
  selectedLookup: Lookup;
  lookup: Lookup;
  feedback: any = {};
  lookupGroupId: string ;

  lookupForm = new FormGroup({
    id: new FormControl(''),
    lookupGroupId: new FormControl(''),
    defKey: new FormControl(''),
    val: new FormControl(''),
    altKey: new FormControl('')
  });

  get lookupsPageable(): Page<Lookup> {
    return this.lookupService.lookupsPageable;
  }


  constructor(private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router, 
    private lookupService: LookupService,
    private lookupGroupService: LookupGroupService
    ) {

    
    }

 get f() { return this.lookupForm.controls; }

 initalizeForm(){
  
  this.lookupForm = this.formBuilder.group({
    id: [null],
    lookupGroupId: [null],
    defKey: ['',[Validators.required]],
    val: ['',[Validators.required]],
    altKey: ['']
  });

 }


  ngOnInit() {

    this.initalizeForm();

    this
    .route
    .params
    .pipe(
      map(p => p.lookupGroupId),
      switchMap(id => {
        
        this.lookupGroupId = id;

        this.lookupGroupService.findById(this.lookupGroupId).subscribe(
          result => {
            this.lookupGroup = result;
          }
        );
         
        this.load(this.lookupGroupId);

        return of(new Lookup());

      })
    )
    .subscribe(lookup => {


      return of(new Lookup());

    });



 }



  load(lookupGroupId: String): void {
    this.lookupService.load(lookupGroupId);
  }


  select(selected: Lookup): void {
    this.selectedLookup = selected;
  }


  onSubmit() {


    this.lookupForm.get('lookupGroupId').setValue(this.lookupGroupId);

    this.lookupService.save(this.lookupForm.value).subscribe(
      lookup => {
        this.lookup = lookup;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        this.lookupForm.reset();
        setTimeout(() => {
          this.load(this.lookupGroupId);
          this.feedback = null;
        }, 1000);
      }
    );



}

  delete(lookup: Lookup): void {
    if (confirm('Are you sure?')) {
      this.lookupService.delete(lookup).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.load(this.lookupGroupId);
            this.feedback = null;
          }, 1000);
         }
      );
    }
  }

  setForEdit(lookup: Lookup){
    if (confirm('Are you sure?')) {

      this.lookupForm.get('id').setValue(lookup.id);
      //this.lookupForm.get('lookupGroupId').setValue(this.lookupGroupId);
      this.lookupForm.get('defKey').setValue(lookup.defKey);
      this.lookupForm.get('val').setValue(lookup.val);
      this.lookupForm.get('altKey').setValue(lookup.altKey);
    }
  }

  clearForm(){
    this.lookupForm.reset();
  }

}
