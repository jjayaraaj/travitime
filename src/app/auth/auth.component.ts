import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    if(form.invalid) return;

    this.authService.checkLogin(form.value);
  }

}
