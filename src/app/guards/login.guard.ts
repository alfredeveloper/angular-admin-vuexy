import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

  canActivate() {

    if ( this.authService.estaLogueado() ) {
      return true;
    } else {
      console.log( 'Bloqueado por guard' );
      this.router.navigate(['/iniciar-sesion']);
      return false;
    }

  }
}
