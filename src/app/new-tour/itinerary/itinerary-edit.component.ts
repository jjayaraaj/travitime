import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './itinerary-edit.component.html',
  styles: [`
    mat-form-field{width: 100%}
  `]
})

export class ItineraryEditComponent implements OnInit {

  itenaryForm: FormGroup;

  constructor(){

  }

  ngOnInit() {
    this.initItenaryForm();
  }

  initItenaryForm() {
    this.itenaryForm = new FormGroup({
      day: new FormControl('', {validators: [Validators.required]}),
      date: new FormControl('', {validators: [Validators.required]}),
      title: new FormControl('', {validators: [Validators.required]}),
      breakfast: new FormControl(false),
      lunch: new FormControl(false),
      dinner: new FormControl(false),
      description: new FormControl('', {validators: [Validators.required]}),
      place: new FormControl('', {validators: [Validators.required]}),
      tourId: new FormControl('', {validators: [Validators.required]}),


    });
  }

  onSubmitForm() {

  }
}
