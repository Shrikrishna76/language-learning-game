import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Questions } from './questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private apiUrl = 'http://localhost:8080/api/questions';
  private langUrl = 'http://localhost:8080/api/questions/byLanguage';

  constructor(private http: HttpClient) { }


  getQuestionsPaginated(page: number, pageSize: number): Observable<Questions[]> {
    const url = `${this.apiUrl}?page=${page}&size=${pageSize}`;
    return this.http.get<Questions[]>(url);
  }

 

  getQuestionsByLanguageId(languageId: number): Observable<Questions[]> {
    const url = `${this.langUrl}/${languageId}`;
    console.log('Requesting questions from:', url); 
    return this.http.get<Questions[]>(url);
  }

  
  getAllQuestions(): Observable<Questions[]> {
    console.log('Making request to', this.apiUrl);
    return this.http.get<Questions[]>(this.apiUrl);
  }
  
  
}
