import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Traveller } from 'src/app/model/traveller.model';

@Component({
  templateUrl: './traveller-edit.component.html',
  styles: [
    'mat-form-field { width: 100%; }'
  ]
})


export class TravellerEditComponent implements OnInit {
travellerEditForm: FormGroup;
traveller: Traveller;

constructor(@Inject(MAT_DIALOG_DATA) public data: {data: Traveller}) {

}

ngOnInit() :void {
  this.initForm();
  this.traveller = this.data.data;
  this.travellerEditForm.setValue({
    travellerName: this.traveller.travellerName,
    gender: this.traveller.gender,
    dob: this.traveller.dob,
    nationality: this.traveller.nationality,
    passportNo: this.traveller.passportNo,
    senior: this.traveller.senior,
    tourId: this.traveller._id,
    documents: this.traveller.documents
  })
}

initForm() {
  this.travellerEditForm = new FormGroup({
    travellerName: new FormControl('', {validators: [Validators.required]}),
      gender: new FormControl('', {validators: [Validators.required]}),
      dob: new FormControl('', {validators: [Validators.required]}),
      nationality: new FormControl('', {validators: [Validators.required]}),
      passportNo: new FormControl('', {validators: [Validators.required]}),
      senior: new FormControl('', {validators: [Validators.required]}),
      tourId: new FormControl('', {validators: [Validators.required]}),
      documents: new FormControl(''),

  });
}

onsubmit() {

}

}
