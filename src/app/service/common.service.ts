import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class CommonService {
  private apiUrl = "http://localhost:3000/api/";

  get api() {
    return this.apiUrl;
  }

}
