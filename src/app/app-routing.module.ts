import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChaptersComponent } from './chapters/chapters.component';


const routes: Routes = [
  { path: '', redirectTo: 'chapters/1', pathMatch: 'full' },
  { path: 'chapters/:chapter', component: ChaptersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
