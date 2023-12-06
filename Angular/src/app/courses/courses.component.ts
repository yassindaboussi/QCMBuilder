import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Course {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  academicYearLevel!: string;
  courses: Course[] = [];

  constructor(
     private route: ActivatedRoute,
     private router: Router,
     ) {}  

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.academicYearLevel = params['level'];
      this.loadCourses();
    });
    
  }

  loadCourses(): void {
    if (this.academicYearLevel === '1st Year') {
      this.courses = [
        { name: 'C', logo: 'c_logo.png' },
        { name: 'LINUX', logo: 'linux_logo.png' }
      ];
    } else if (this.academicYearLevel === '2nd Year') {
      this.courses = [
        { name: 'CPP', logo: 'cpp_logo.png' },
        { name: 'PHP', logo: 'php_logo.png' },
        { name: 'HTML', logo: 'html_logo.png' },
        { name: 'JAVASCRIPT', logo: 'javascript_logo.png' },
        { name: 'CSS', logo: 'css_logo.png' },
      ];
    }
    else if (this.academicYearLevel === '3rd Year') {
      this.courses = [
        { name: 'JAVA', logo: 'java_logo.png' },
        { name: 'PYTHON', logo: 'python_logo.png' }
      ];
    }
    console.log(this.courses);
  }

  getCoursesByLevel(): Course[] {
    return this.courses;
  }

  navigateToChapters(courseName: string): void {
      this.router.navigate(['/chapters'], { queryParams: { course: courseName } });
    } 

}
