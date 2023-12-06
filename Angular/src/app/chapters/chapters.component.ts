import { Component, OnInit } from '@angular/core';
import { ChapterService } from '../chapters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QcmService } from '../qcm.service'; 

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {
  chapters: any[] = [];
  course: string | null = null; 

  constructor(
    private route: ActivatedRoute,
    private chapterService: ChapterService,
    private router: Router ,
    private QcmService: QcmService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.course = params['course']; 
      this.ExtractChapters();
    });
  }

  GetAllChapters(): void {
    if (this.course) {
      this.chapterService.GetAllChapters(this.course)
        .subscribe(
          (data) => {
            this.chapters = data.chapters;
          },
          (error) => {
            console.error('Error fetching chapters:', error);
          }
        );
    }
  }

  ExtractChapters(): void {
    if (this.course) {
      this.chapterService.ExtractChapters(this.course) 
        .subscribe(
          (data) => {
            this.chapters = data.chapters;
            this.GetAllChapters();
          },
          (error) => {
            console.error('Error fetching chapters:', error);
            this.GetAllChapters();
          }
        );
    }
  }

  generateQCM(chapter: string, url: string) {
    this.QcmService.setQcmUrl(url);
    this.QcmService.setcourseName(this.course!);
    this.QcmService.setchapterName(chapter);
    this.router.navigate(['/qcm']);
  }

}