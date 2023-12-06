import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QcmService {

//http://localhost:3000/api/qcm/extract?url=https://letsfindcourse.com/technical-questions/java-mcq/basic-of-java&course=JAVA
//http://localhost:3000/api/qcm/GenerateQcm?course=JAVA&chapter=Java%20MCQ%20Questions%20-%20Java%20Basics
  private baseUrl = 'http://localhost:3000/api/qcm';

  constructor(private http: HttpClient) { }

  GenerateQcm(course: string,chapter: string): Observable<any> {
    const url = `${this.baseUrl}/GenerateQcm?course=${course}&chapter=${chapter}`;
    return this.http.get(url);
  }

  ExtractQCM(urlquiz: string,course: string,chapter: string): Observable<any> {
    const url = `${this.baseUrl}/extract?url=${urlquiz}&course=${course}&chapter=${chapter}`;
    return this.http.get(url);
  }


  private qcmUrl: string = '';
  setQcmUrl(url: string) {
    this.qcmUrl = url;
  }
  getQcmUrl() {
    return this.qcmUrl;
  }

  private courseName: string = '';
  setcourseName(course: string) {
    this.courseName = course;
  }
  getcourseName() {
    return this.courseName;
  }

  private chapterName: string = '';
  setchapterName(chapter: string) {
    this.chapterName = chapter;
  }
  getchapterName() {
    return this.chapterName;
  }
}
