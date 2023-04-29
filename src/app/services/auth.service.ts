import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  userConnected(): boolean {
    if (this.cookieService.get('token')) {
      return true;
    }
    return false;
  }
}
