import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TourService } from 'src/app/service/tour.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Traveller } from 'src/app/model/traveller.model';
import { MatDialog } from '@angular/material/dialog';
import { TravellerEditComponent } from './traveller-edit.component';

@Component({
  selector: 'app-traveller',
  templateUrl: './traveller.component.html',
  styleUrls: ['./traveller.component.css']
})
export class TravellerComponent implements OnInit, OnDestroy {
  travellerForm: FormGroup;
  tourId: string;
  editMode = false;
  $tourId: Subscription;
  $travellers: Subscription;
  travellers: Traveller[];

  constructor(
    private tourService: TourService,
    private route: ActivatedRoute,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {

    this.$tourId = this.tourService.getTourIdListner().subscribe((tourId) => {
      this.tourId = tourId.tourId;
      console.log(this.tourId);
      this.travellerForm.get('tourId').patchValue(this.tourId);
    }, (error) => {});

    this.initTravellerForm();

    this.tourId = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.tourId = params['id'];
      this.editMode = true;
    });

    if(this.editMode) {
      this.travellerForm.get('tourId').patchValue(this.tourId);
      this.getTravellersList();

    }
  }

  getTravellersList () {
    this.tourService.getTravellers(this.tourId);
    this.$travellers = this.tourService.getTravllersListner()
    .subscribe((data: any) => {
      this.travellers = data.traveller;

    });
  }


  ngOnDestroy() {
    if(this.editMode){
      this.$tourId.unsubscribe();
    }

    this.$travellers.unsubscribe();
  }

  initTravellerForm() {
    this.travellerForm = new FormGroup({
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

  onSubmitForm() {
    console.log(this.travellerForm.value);
    this.tourService.newTraveller(this.travellerForm.value)
    .subscribe((data: any) => {
      this.travellers = data.message;

    });

  }

  onClickEdit(traveller: Traveller) {
    console.log(traveller);
    this.dialog.open(TravellerEditComponent, {
        data: {data: traveller},
        width: '50%'

    })
  }

}
