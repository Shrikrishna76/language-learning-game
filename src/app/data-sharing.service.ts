import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { User } from './user';
import { Progress } from './progress';
import { LoginPageComponent } from './login-page/login-page.component';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  
  userData: User | null = null;
  private connectionStatus = new Subject<boolean>();
  connectionStatus$ = this.connectionStatus.asObservable();
  private apiUrl = "http://localhost:8080/api/users";
 

  constructor(private httpClient: HttpClient) {
    this.checkConnectionStatus();
    window.addEventListener('online', () => this.checkConnectionStatus());
    window.addEventListener('offline', () => this.checkConnectionStatus());

    
  }

  private checkConnectionStatus() {
    this.connectionStatus.next(navigator.onLine);
  }

  postdata(url: string, param: {}): Observable<any> {
    const httpOptionWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(url, param, httpOptionWithToken);
  }

  authenticateUser(username: string, password: string): Observable<LoginPageComponent> {
    const loginData = {
      email: username,
      password: password
      
    };
    return this.httpClient.post< LoginPageComponent >(`${this.apiUrl}/login`, loginData)
      .pipe(
        tap((response: any) => console.log('Authentication Response:', response))
      );
  }

  getUserByEmail(email: string): Observable<User> {
    const url = `${this.apiUrl}/by-email/${email}`;
    return this.httpClient.get<User>(url);
  }

  private userId: number | undefined;

  getUserId(): number | undefined {
    return this.userId;
  }

  setUserId(userId: number): void {
    this.userId = userId;
  }


  private userDataSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  setUser(user: User): void {
    this.userDataSubject.next(user);
  }

  getUser(): Observable<User | null> {
    return this.userDataSubject.asObservable();
  }

  private userEmailSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  userEmail$ = this.userEmailSubject.asObservable();

  setUserEmail(email: string | null): void {
    this.userEmailSubject.next(email);
  }

  private selectedLanguageSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  selectedLanguage$ = this.selectedLanguageSubject.asObservable();



  setSelectedLanguage(selectedLanguage: string | null): void {
    console.log('Setting selected language:', selectedLanguage);
    this.selectedLanguageSubject.next(selectedLanguage);
  }

  

}