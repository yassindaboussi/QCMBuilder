import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcademicYearComponent } from './academic-year/academic-year.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NavbarComponent } from './navbar/navbar.component';
import { CoursesComponent } from './courses/courses.component';
import { HttpClientModule } from '@angular/common/http';
import { ChaptersComponent } from './chapters/chapters.component';
import { QcmComponent } from './qcm/qcm.component';
import { ResultDialogComponent } from './result-dialog/result-dialog.component';
import { MatDialogModule } from '@angular/material/dialog'; 


@NgModule({
  declarations: [
    AppComponent,
    AcademicYearComponent,
    NavbarComponent,
    CoursesComponent,
    ChaptersComponent,
    QcmComponent,
    ResultDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
