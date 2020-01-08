import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebComponent } from './web.component';
import {ProfesionalesComponent} from './profesionales/profesionales.component'

const routes: Routes = [
  { 
    path: '', 
    component: WebComponent,
    children: [
         {path:'profesionales',component: ProfesionalesComponent}
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
