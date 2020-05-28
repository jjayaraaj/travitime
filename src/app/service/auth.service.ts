import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token: string;
  private authStatus = false;
  private authListnerStatus = new Subject<boolean>();
  private tokenTimer: any;

  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private router: Router
  ){}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authListnerStatus.asObservable();
  }

  getIsAuth() {
    return this.authStatus;
  }

  checkLogin(authData) {
    this.http.post<{token: string}>(this.commonService.api + 'auth', authData)
    .subscribe(response => {
      const expiresInDuration = 3600;
      this.setAuthTimer(expiresInDuration);
      this.token = response.token;
      this.authStatus = true;
      this.authListnerStatus.next(true);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      console.log(expirationDate);
      this.saveAuthData(this.token, expirationDate);
      this.router.navigate(['/']);
    })
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.authStatus = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authListnerStatus.next(true);
    }
  }

  setAuthTimer(duration: number) {
    console.log("Setting timer: "+ duration);
    this.tokenTimer = setTimeout(()=>{
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = null;
    this.authStatus = false;
    this.authListnerStatus.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/auth']);

  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString())
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if(!token || !expirationDate) {
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}
