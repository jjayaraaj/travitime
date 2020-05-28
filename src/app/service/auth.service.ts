import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token: string;

  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ){}

  getToken() {
    return this.token;
  }

  checkLogin(authData) {
    this.http.post<{token: string}>(this.commonService.api + 'auth', authData)
    .subscribe(response => {
      this.token = response.token;
    })
  }
}
