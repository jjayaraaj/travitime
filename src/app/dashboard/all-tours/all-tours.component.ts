import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { TourService } from 'src/app/service/tour.service';
import { Tour } from 'src/app/model/tour.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-tours',
  templateUrl: './all-tours.component.html',
  styleUrls: ['./all-tours.component.css']
})
export class AllToursComponent implements OnInit {

  tours: Tour[] = [];

  displayedColumns: string[] = ['sno', 'tourName',  'days',  'from', 'to',  'purpose', 'status', 'view', 'edit', 'exportPDF', 'delete'];
  dataSource: Tour[] = [];

  constructor(
    private tourService: TourService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTour();
  }

  getTour() {
    this.tourService.getAllTour().subscribe((data:{response:any}) => {
      this.dataSource = data.response;
    })
  }

  onClickEdit(tourId: string) {
    this.router.navigate(['dashboard', 'edit-tour', tourId]);
  }

}
