import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TourService } from 'src/app/service/tour.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Itinerary } from 'src/app/model/itinerary.model';
import { MatDialog } from '@angular/material/dialog';
import { ItineraryEditComponent } from './itinerary-edit.component';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css']
})
export class ItineraryComponent implements OnInit, OnDestroy {

  itenaryForm: FormGroup;
  tourId: string;
  editMode = false;
  $tourId: Subscription;
  $itinerary: Subscription;
  itinerarys: Itinerary[];

  constructor(
    private tourService: TourService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.$tourId = this.tourService.getTourIdListner().subscribe((tourId) => {
      this.tourId = tourId.tourId;
      console.log(this.tourId);
      this.itenaryForm.get('tourId').patchValue(this.tourId);
    }, (error) => {});

    this.initItenaryForm();

    this.tourId = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.tourId = params['id'];
      this.editMode = true;
    });


      this.savedItinerary(this.tourId);

      if(this.editMode) {
        this.itenaryForm.get('tourId').patchValue(this.tourId);
      }

  }

  ngOnDestroy() {
    this.$tourId.unsubscribe();

  }

  savedItinerary(tourId) {
    this.tourService.getitinerary(tourId);
    this.tourService.getItineraryListner()
    .subscribe((response: any)=> {
      this.itinerarys = response.itinerary
    })
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
      tourId: new FormControl(this.tourId, {validators: [Validators.required]}),


    });
  }

  onSubmitForm() {
    console.log(this.itenaryForm.value);


      this.tourService.newItinerary(this.itenaryForm.value)
      .subscribe((data:{message:Itinerary[]})=> {
        this.itinerarys = data.message
     });



  }

  onClickEdit() {
    console.log("asd");
    this.dialog.open(ItineraryEditComponent, {
      data: {data: ''},
      width: '50%'
    });
  }

}
