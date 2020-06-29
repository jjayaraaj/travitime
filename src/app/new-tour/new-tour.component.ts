import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-tour',
  templateUrl: './new-tour.component.html',
  styleUrls: ['./new-tour.component.css']
})
export class NewTourComponent implements OnInit {
  tourId="asdjhvtsdfa123jgahsd";

  constructor() { }

  ngOnInit(): void {
  }

  onTourAdded(data: {tourId: string}) {
    console.log("this is from event emitter " + data.tourId);
  }


}
