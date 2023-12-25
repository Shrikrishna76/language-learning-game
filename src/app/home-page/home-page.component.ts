import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
 

  selectedLanguage: number = 0;
  languages: any[] = [
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'Python' },
    { id: 3, name: 'Java' }
  ];

  errorMessage: string = '';

  constructor(private router: Router, private dataSharingService: DataSharingService) {}

  startCoding() {
    if (this.selectedLanguage == 0) {
      this.errorMessage = 'Please select a language ';
      return
    } else {
      const selectedLanguageName = this.languages.find(lang => lang.id === this.selectedLanguage)?.name;
      console.log('Selected language:', selectedLanguageName);
      this.dataSharingService.setSelectedLanguage(selectedLanguageName);
      this.router.navigate(['/questions', this.selectedLanguage]);
    }
  }
  
}
