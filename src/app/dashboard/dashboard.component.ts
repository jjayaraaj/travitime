import { Component, OnInit } from '@angular/core';
import { TourService } from '../service/tour.service';
import { UpcomingTours } from '../model/upcoming-tours.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'tourName', 'fromDate', 'toDate',  'country', 'action'];
 dataSources: any[] = [{
    _id: "5ed0f4ca4a078e3b44784993", tourName: "sadad", fromDate: "2020-05-27T18:30:00.000Z", toDate: "2020-05-29T18:30:00.000Z", country: "AndorrA"
  }];
  dataSource: UpcomingTours;
  constructor(
    private tourService: TourService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.tourService.getUpcomingTour().subscribe((response) => {
     this.dataSource = response.tours;
    });
  }

  onClickEdit(tourId) {
    this.router.navigate(['dashboard', 'edit-tour', tourId]);
  }

}
