import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrToolboxComponent } from './screen/scr-toolbox/scr-toolbox.component';
import { ScrAddToolComponent } from './screen/scr-add-tool/scr-add-tool.component';
import { ScrLoginComponent } from './screen/scr-login/scr-login.component';

const routes: Routes = [
  { path: '', component: ScrToolboxComponent },
  { path: 'login', component: ScrLoginComponent },
  { path: 'tools/add', component: ScrAddToolComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
