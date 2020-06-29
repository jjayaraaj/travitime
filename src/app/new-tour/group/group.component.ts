import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TourService } from 'src/app/service/tour.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {
  @Output() tourCreated = new EventEmitter<{tourId: string}>();

  groupForm: FormGroup;
  tourId: string;
  editMode = false;
  noGroupMode = false;
  $tourId: Subscription;

  @Input('tourId') tourIdFrom: any;


  constructor(
    private formBuilder: FormBuilder,
    private tourService: TourService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    console.log(this.tourIdFrom);

    this.$tourId = this.tourService.getTourIdListner().subscribe((tourId) => {
      this.tourId = tourId.tourId;
      this.groupForm.get('tourId').patchValue(this.tourId);
      this.tourCreated.emit({tourId: this.tourId});
    }, (error) => {})
    this.initGroupForm();


    this.tourId = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.tourId = params['id'];

    });

    if(this.tourId)
    {
      this.editMode = true;
      this.tourService.getGroupId(this.tourId).subscribe((response)=> {
        const data = response.groupRes.group;
        if(data !== 'noGroup') {
          this.groupForm.setValue({
            groupName: data.groupName,
            emailId: data.emailId,
            noOfTravellers: data.noOfTravellers,
            countryCode: data.countryCode,
            contactNumber: data.contactNumber,
            tourId: this.tourId
          });
        } else {
          console.log(`nogroup mode ${this.tourId}`);
          this.groupForm.get('tourId').patchValue(this.tourId);
          this.noGroupMode = true;
        }



      })
    }
  }

  ngOnDestroy() {
    this.$tourId.unsubscribe();
  }

  onSubmitGroup() {

    if(this.editMode){

        this.tourService.updateGroup(this.groupForm.value);

    }else{
      this.tourService.newGroup(this.groupForm.value).subscribe(data=>console.log(data));
    }


  }

  initGroupForm() {


    this.groupForm = new FormGroup({
      groupName: new FormControl('', {validators: [Validators.required]}),
      emailId: new FormControl('', {validators: [Validators.required]}),
      noOfTravellers: new FormControl('', {validators: [Validators.required]}),
      countryCode: new FormControl('', {validators: [Validators.required]}),
      contactNumber: new FormControl('', {validators: [Validators.required]}),
      tourId: new FormControl('')
    });



  }

}
