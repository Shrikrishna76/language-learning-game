import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {

  userScore: number | null = null;
  totalMarks: number = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  
    this.route.queryParams.subscribe(params => {
      this.userScore = params['score'] || null;
      this.totalMarks = params['totalMarks'] || 0;
    });
  }

}
