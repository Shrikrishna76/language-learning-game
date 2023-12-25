import { Component } from '@angular/core';
import { ProgressService } from '../progress.service';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {

  progressList: any[] = [];

    constructor(private progressService: ProgressService) {}

    ngOnInit(): void {
        this.progressService.getAllProgress().subscribe(
            (data) => {
                console.log('All User Progress:', data);
                this.progressList = data;
            },
            (error) => {
                console.error('Error fetching all user progress:', error);
            }
        );
    }

}
