import { Component } from '@angular/core';
import { User } from '../user';
import { DataSharingService } from '../data-sharing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
 
  user: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.route.queryParams.subscribe((params) => {
      this.user = JSON.parse(params['user']);
    });
  }
}
