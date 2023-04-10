import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private router: Router, private authService: AuthService) {}

  onClickName() {
    if (!this.authService.userConnected()) {
      this.router.navigateByUrl('login');
    }
  }
}
