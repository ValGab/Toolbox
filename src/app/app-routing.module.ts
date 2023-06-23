import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrToolboxComponent } from './screen/scr-toolbox/scr-toolbox.component';
import { ScrAddToolComponent } from './screen/scr-add-tool/scr-add-tool.component';
import { ScrLoginComponent } from './screen/scr-login/scr-login.component';
import { AuthguardGuard } from './shared/authguard.guard';
import { ScrModifyToolComponent } from './screen/scr-modify-tool/scr-modify-tool.component';
import { ScrSharedToolsComponent } from './screen/scr-shared-tools/scr-shared-tools.component';

const routes: Routes = [
  { path: '', component: ScrToolboxComponent },
  { path: 'login', component: ScrLoginComponent },
  {
    path: 'tools/add',
    component: ScrAddToolComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'tools/modify/:id',
    component: ScrModifyToolComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: 'tools/shared',
    component: ScrSharedToolsComponent,
    canActivate: [AuthguardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
