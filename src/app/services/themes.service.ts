import { Injectable } from '@angular/core';
import themes from '../enums/themes';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ThemesService {
  constructor(private cookieService: CookieService) {}

  themeSelection() {
    if (this.cookieService.get('theme')) {
      this.changeColor(this.cookieService.get('theme'));
    } else {
      this.changeColor(themes[0].themeId);
    }
  }

  changeColor(theme: string) {
    for (let i = 0; i < themes.length; i++) {
      if (theme === themes[i].themeId) {
        document.documentElement.style.setProperty(
          '--primary',
          themes[i].colors[0].primaryColor
        );
        document.documentElement.style.setProperty(
          '--secondary',
          themes[i].colors[0].secondaryColor
        );
        document.documentElement.style.setProperty(
          '--hover',
          themes[i].colors[0].hoverColor
        );
        document.documentElement.style.setProperty(
          '--font',
          themes[i].colors[0].fontColor
        );
        this.cookieService.set('theme', theme);
        break;
      }
    }
  }
}
