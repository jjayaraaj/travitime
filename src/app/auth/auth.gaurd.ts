import { CanActivate,  ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn:'root'
})

export class AuthGaurd implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate(
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean>
  {

    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/auth'])
    }
    return isAuth;
  }
}
