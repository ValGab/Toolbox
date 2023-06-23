import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/themes.service';
import themes from 'src/app/enums/themes';

@Component({
  selector: 'app-theme-selection',
  templateUrl: './theme-selection.component.html',
  styleUrls: ['./theme-selection.component.scss'],
})
export class ThemeSelectionComponent implements OnInit {
  public themesList: any[any];

  constructor(private themesService: ThemesService) {}

  ngOnInit(): void {
    this.themesList = themes;
  }

  onClickTheme(themeId: string) {
    this.themesService.changeColor(themeId);
  }
}
