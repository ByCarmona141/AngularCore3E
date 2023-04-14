import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  public helper = new JwtHelperService();

  constructor(private auth: AuthService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    if (!this.auth.isLogged()) {
      this.router.navigate(['/login']);
      return of(false);
    } else {
      const url = state.url.split('/');
      this.auth.refreshToken();
      return this.auth.getRoutePrivilege(url[1], next.data.privilege).pipe(
          map((response: { authenticated: boolean }) => {
            if (response.authenticated) {
              return true;
            } else {
              return false;
            }
          }), catchError(error => {
            return of(false);
          })
      );
    }
  }
}
