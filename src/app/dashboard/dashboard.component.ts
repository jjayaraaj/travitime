import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'start', 'end',  'visit', 'action'];
  dataSource = [
    {position: 1, name: 'Hydrogen', start: '24 Dec 19', end: '04 jun 19', visit: 'H'},
  {position: 2, name: 'Helium', start: '24 Dec 19', end: '04 jun 19', visit: 'H'},
  {position: 3, name: 'Lithium', start: '24 Dec 19', end: '04 jun 19', visit: 'H'},
  {position: 4, name: 'Beryllium', start: '24 Dec 19', end: '04 jun 19', visit: 'H'},
  {position: 5, name: 'Boron', start: '24 Dec 19', end: '04 jun 19', visit: 'H'}

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
