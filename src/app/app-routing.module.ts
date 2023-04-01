import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrToolboxComponent } from './screen/scr-toolbox/scr-toolbox.component';

const routes: Routes = [{ path: '', component: ScrToolboxComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
