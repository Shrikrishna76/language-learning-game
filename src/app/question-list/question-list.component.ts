import { Component } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { Questions } from '../questions';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';
import { ProgressService } from '../progress.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent {

  questions: Questions[] = [];
  currentPage = 1;
  pageSize = 2; 
  currentSetIndex = 0; 
  selectedLanguageId: number = 0; 
  userScore: number | null = null;
  totalMarks: number = 0;
  timeRemaining: number = 1800; 
  timer: any;
 
 
userAnswers: string[] = [];
  userEmail: string | null | undefined;
  languageName: any;


 
constructor(
  private questionsService: QuestionsService,
  private route: ActivatedRoute,
  private router: Router,
  private dataSharingService: DataSharingService,
  private progressDataService: ProgressService // Inject the service
) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedLanguageId = Number(params.get('languageId')) || 0;
      this.loadQuestionsByLanguageId(this.selectedLanguageId);
      this.startTimer();
    });
  }

  
  startTimer(): void {
    this.timer = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.onSubmit(); 
        clearInterval(this.timer); 
      }
    }, 1000); 
  }

  loadQuestionsByLanguageId(languageId: number): void {
    console.log('Loading questions for language ID', languageId);
    this.questionsService.getQuestionsByLanguageId(languageId).subscribe(
      (data) => {
        console.log('Received data:', data);
        this.questions = data;
      },
      (error) => {
        console.error('Error loading questions by language ID', error);
      }
    );
  }
  

  onSubmit() {
    console.log('User Answers:', this.userAnswers);

    this.userScore = this.questions.reduce((totalScore, question, index) => {
      if (question.options.indexOf(this.userAnswers[index]) !== -1 && this.userAnswers[index] === question.correctOption) {
        return totalScore + question.marks;
      }
      return totalScore;
    }, 0);

    clearInterval(this.timer);
    console.log('Score:', this.userScore);
    this.totalMarks = this.getTotalMarks();

   
    this.progressDataService.setUserScore(this.userScore || 0);
    this.progressDataService.setTotalMarks(this.totalMarks || 0);
    this.progressDataService.setTimeRemaining(this.timeRemaining);
    this.dataSharingService.userEmail$.subscribe(email => {
      this.userEmail = email;
      console.log('User Email in question-list component:', this.userEmail);

      
    });

    this.router.navigate(['/progress'], {
      queryParams: {
        userEmail: this.userEmail,
        score: this.userScore,
        totalMarks: this.totalMarks,
        languageName: this.languageName,
        timeRemaining: this.timeRemaining,
      },
    });
    console.log(this.userEmail);
    
  }
  
  formatTimeRemaining(): string {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  
  

  getTotalMarks(): number {
    return this.questions.reduce((total, q) => total + q.marks, 0);
  }
  
}
