import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Progress } from './progress';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  
  

  private userScore: number | null = null;
  private totalMarks: number = 0;
  private timeRemaining: number = 1800;

  setUserScore(score: number): void {
    this.userScore = score;
  }

  setTotalMarks(marks: number): void {
    this.totalMarks = marks;
  }

  setTimeRemaining(time: number): void {
    this.timeRemaining = time;
  }

  getUserScore(): number | null {
    return this.userScore;
  }

  getTotalMarks(): number {
    return this.totalMarks;
  }

  getTimeRemaining(): number {
    return this.timeRemaining;
  }

  private apiUrlpr = 'http://localhost:8080/api/progress/save'; 

  constructor(private http: HttpClient) {}

  getUserProgress(userId: number): Observable<Progress[]> {
    const url = `${this.apiUrlpr}/user-progress/${userId}`;
    return this.http.get<Progress[]>(url);
  }

  
  
  private selectedLanguageSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  selectedLanguage$ = this.selectedLanguageSubject.asObservable();

  setSelectedLanguage(language: string | null): void {
    this.selectedLanguageSubject.next(language);
  }

  saveProgress(progressData: any): Observable<any> {
    console.log('Request payload:', progressData);
  
    const url = 'http://localhost:8080/api/progress/save';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post(url, progressData, { headers }).pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        console.error('Error:', error);
        throw error;
      })
    );
  }


  private apiUrl = 'http://localhost:8080/api/progress/all';

 

  getAllProgress(): Observable<any> {
      return this.http.get(`${this.apiUrl}`);
  }
}
