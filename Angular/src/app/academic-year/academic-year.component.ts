import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-academic-year',
  templateUrl: './academic-year.component.html',
  styleUrls: ['./academic-year.component.css']
})
export class AcademicYearComponent implements OnInit {
  classLevels: string[] = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToCourses(level: string): void {
    this.router.navigate(['/courses'], { queryParams: { level } });
  }
}
