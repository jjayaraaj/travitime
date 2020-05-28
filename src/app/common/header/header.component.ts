import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  userIsAuthendicated = false;
  private $authListner: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userIsAuthendicated = this.authService.getIsAuth();
    this.$authListner = this.authService.getAuthStatusListener().subscribe(isAuthendicated => {
      this.userIsAuthendicated = isAuthendicated;
    })
  }

  ngOnDestroy(): void {
    this.$authListner.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
