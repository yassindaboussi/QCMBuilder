import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicYearComponent } from './academic-year/academic-year.component';
import { CoursesComponent } from './courses/courses.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { QcmComponent } from './qcm/qcm.component'; 

const routes: Routes = [
  { path: '', component: AcademicYearComponent }, 
  { path: 'courses', component: CoursesComponent }, 
  { path: 'chapters', component: ChaptersComponent },
  { path: 'qcm', component: QcmComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
