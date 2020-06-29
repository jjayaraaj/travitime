import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';
import { UpcomingTours } from '../model/upcoming-tours.model';
import { Tour } from '../model/tour.model';
import { Subject } from 'rxjs';
import { Traveller } from '../model/traveller.model';
import { Itinerary } from '../model/itinerary.model';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  private tourId: string;
  private tourIdSub = new Subject<{tourId: string}>();
  private travellerSub = new Subject<{traveller: Traveller}>()
  private itinerarySub = new Subject<{itinerary: Itinerary}>()


  constructor(
    private commonService:CommonService,
    private http:HttpClient
  ){}



  newTour(tourData){
    return this.http.post<{message: Tour}>(this.commonService.api + 'tour', tourData)
       .subscribe((response )=>{
        this.tourId = response.message._id;
        this.tourIdSub.next({tourId: this.tourId});
      },
      (error)=>{

      })
  }

  getTourIdListner(){
    return this.tourIdSub.asObservable();
  }

  newGroup(groupData) {

    return this.http.post(this.commonService.api + 'group', groupData)
  }

  newTraveller(travellerData) {
    return this.http.post<{message: Traveller}>(this.commonService.api + 'traveller', travellerData);
  }

  newItinerary(itineraryData) {
    return this.http.post(this.commonService.api + 'itinerary', itineraryData);
  }

  getUpcomingTour() {
    return this.http.get<{tours: UpcomingTours}>(this.commonService.api + 'tour' );
  }

  getAllTour() {
    return this.http.get<{response: Tour}>(this.commonService.api + 'tour/all');

  }

  getTourById(tourId) {
   return this.http.get<{response: Tour}>(this.commonService.api + 'tour/' + tourId);
  }

  getGroupId(groupId) {
    return this.http.get<{groupRes: any}>(this.commonService.api + 'group/' + groupId);
  }

  getTravellers(tourId) {
    this.http.get<{travellers: Traveller}>(this.commonService.api + 'traveller/' + tourId)
    .subscribe( travellers => {
      this.travellerSub.next({traveller: travellers.travellers});
    });
  }

  getTravllersListner() {
    return this.travellerSub.asObservable();
  }

  getitinerary(details) {
    this.http.get<{itinerary: Itinerary}>(this.commonService.api + 'itinerary/' + details)
      .subscribe((data) => {
        this.itinerarySub.next({itinerary: data.itinerary})
      });
  }

  getItineraryListner(){
    return this.itinerarySub.asObservable();
  }

  updateTour(tourDetails) {
    this.http.put(`${this.commonService.api}tour`, tourDetails ).subscribe(data => console.log(data));
  }

  updateGroup(groupDetail) {
    this.http.put(`${this.commonService.api}group`, groupDetail ).subscribe(data => console.log(data));
  }

  updateItinerary(itineraryDetails) {
    this.http.put(this.commonService.api + 'itinerary', itineraryDetails).subscribe(data => console.log(data));
  }

}
