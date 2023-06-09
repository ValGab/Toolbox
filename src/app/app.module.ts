import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ScrToolboxComponent } from './screen/scr-toolbox/scr-toolbox.component';
import { HttpClientModule } from '@angular/common/http';
import { ToolComponent } from './components/tool/tool.component';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './components/footer/footer.component';
import { ScrAddToolComponent } from './screen/scr-add-tool/scr-add-tool.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrLoginComponent } from './screen/scr-login/scr-login.component';
import { ScrModifyToolComponent } from './screen/scr-modify-tool/scr-modify-tool.component';
import { ScrSharedToolsComponent } from './screen/scr-shared-tools/scr-shared-tools.component';
import { ThemesService } from './services/themes.service';
import { ThemeSelectionComponent } from './components/theme-selection/theme-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrToolboxComponent,
    ToolComponent,
    FooterComponent,
    ScrAddToolComponent,
    ScrLoginComponent,
    ScrModifyToolComponent,
    ScrSharedToolsComponent,
    ThemeSelectionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ThemesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
