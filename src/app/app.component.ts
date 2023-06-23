import { Component, OnInit } from '@angular/core';
import { Router, NavigationError } from '@angular/router';
import { ThemesService } from './services/themes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private themesService: ThemesService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationError) {
        this.router.navigate(['/']);
      }
    });

    this.themesService.themeSelection();
  }
}
