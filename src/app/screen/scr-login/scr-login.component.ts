import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scr-login',
  templateUrl: './scr-login.component.html',
  styleUrls: ['./scr-login.component.scss'],
})
export class ScrLoginComponent implements OnInit {
  userEmail!: string;
  userPassword!: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    if (this.cookieService.get('token')) {
      this.router.navigateByUrl('/');
    }
  }

  onLoginSuccess(response: any): void {
    this.cookieService.set('token', response.token, 7); // stocker le token dans un cookie nommé 'token', expire dans 7 jours
    this.router.navigateByUrl('/');
  }

  onSubmitForm() {
    this.http
      .post(environment.apiUrl + '/login', {
        email: this.userEmail,
        password: this.userPassword,
      })
      .subscribe((response) => {
        if (response) {
          this.onLoginSuccess(response);
        }
      });
  }
}
