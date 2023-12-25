import { Component, Inject, OnInit } from '@angular/core';
import { Progress } from '../progress';
import { ProgressService } from '../progress.service';
import { DataSharingService } from '../data-sharing.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit  {
  
 
  userEmail: string | null = null;
  userScore: number | null = null;
  totalMarks: number = 0;
  languageName: string | null = null;
  timeRemaining: number = 0;
  saveSuccess: boolean = false;

  constructor(private route: ActivatedRoute, private dataSharingService: DataSharingService,private progressService: ProgressService,) {}
  ngOnInit(): void {
  
  
    this.route.queryParams.subscribe(params => {
      this.userScore = params['score'] || null;
      this.totalMarks = params['totalMarks'] || 0;
      this.languageName = params['languageName'] || null;
      this.timeRemaining = params['timeRemaining'] || 0;
      this.userEmail=params['userEmail'];

    
    });

   
       

      
   
  }

   saveProgress(): void {
    const progressData = {
      email: this.userEmail,
      languageName: this.languageName,
      totalScore: this.userScore,
      totalPossibleScore: this.totalMarks,
      timestamp: new Date().toISOString() 
    };
    

console.log(progressData);

  this.progressService.saveProgress(progressData).subscribe(
    (response: any) => {
      console.log('Progress saved successfully:', response);
      this.saveSuccess = true;
      setTimeout(() => {
        this.saveSuccess = false; 
      }, 3000);
    },
    (error: any) => {
      console.error('Error saving progress:', error);
    }
  );
    
    
  }

  // userEmail: string | null = null;
  // userScore: number | null = null;
  // totalMarks: number = 0;
  // languageName: string | null = null;
  // timeRemaining: number = 0;

  // constructor(private route: ActivatedRoute, private dataSharingService: DataSharingService) {}

  // ngOnInit(): void {
  //   // Get user details from query parameters
  //   this.route.queryParams.subscribe(params => {
  //     this.userScore = params['score'] || null;
  //     this.totalMarks = params['totalMarks'] || 0;
  //     this.languageName = params['languageName'] || null;
  //     this.timeRemaining = params['timeRemaining'] || 0;

  //     console.log('userScore:', this.userScore);
  //     console.log('totalMarks:', this.totalMarks);
  //     console.log('languageName:', this.languageName);
  //     console.log('timeRemaining:', this.timeRemaining);
  //   });
  //   this.dataSharingService.selectedLanguage$.subscribe(language => {
  //     console.log('Received selected language:', language);
  //     this.languageName = language;
  //     console.log('Selected Language in ProgressComponent:', this.languageName);
  //   });
  // }

  private convertSecondsToMinutes(seconds: number): number {
    return Math.floor(seconds / 60);
  }

  }


  
  

