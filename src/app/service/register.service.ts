import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) {}

  newUser(userData) {
    this.http.post(this.commonService.api+'register/', userData)
    .subscribe(data=>{console.log(data)})
  }
}
