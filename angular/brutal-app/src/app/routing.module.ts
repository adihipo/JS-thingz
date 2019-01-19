import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NameComponent } from './name/name.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
  {path: 'pandalist', component: NameComponent},
  {path: 'start', component: TutorialComponent},
  {path: '', redirectTo:'/start', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
