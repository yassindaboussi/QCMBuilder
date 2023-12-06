import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  private baseUrl = 'http://localhost:3000/api/chapter';

  constructor(private http: HttpClient) { }

  GetAllChapters(course: string): Observable<any> {
    const url = `${this.baseUrl}/chapters?course=${course}`;
    return this.http.get(url);
  }

  ExtractChapters(course: string): Observable<any> {
    const url = `${this.baseUrl}/extract?course=${course}`;
    return this.http.get(url);
  }
  
}
