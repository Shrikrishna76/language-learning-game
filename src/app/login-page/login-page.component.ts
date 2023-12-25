import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  isonline: boolean = true;

  contactInfo = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    
  });
  userrole: number = 0;
  email: string ='';

  constructor(private router: Router, private dataSharingService: DataSharingService) {}

  ngOnInit(): void {
    this.dataSharingService.connectionStatus$.subscribe((status) => {
      this.isonline = status;
    });
  }

  clicking() {
    if (!this.isonline) {
      console.log('No internet connection');
      window.alert('No internet connection');
      return;
    } else {
      this.router.navigate(['/SignUp']);
    }
  }


afterlogin() {
  if (!this.isonline) {
    console.log('No internet connection');
    window.alert('No internet connection');
    return;
  }

  const enteredUsername = this.contactInfo.value.username;
  const enteredPassword = this.contactInfo.value.password;

  if (!enteredUsername || !enteredPassword) {
    window.alert('Please enter both username and password');
    return;
  }



  this.dataSharingService.authenticateUser(enteredUsername, enteredPassword).subscribe(
    (authenticationResult) => {
      console.log('Authentication Result:', authenticationResult);

      let userDetails=authenticationResult;
      console.log('Authentication Result:', userDetails);
if(userDetails)
{
     
      if (userDetails.userrole==2) {
        console.log('Login successful');
        window.alert('Login successful');

       
        this.dataSharingService.setUserEmail(userDetails.email);
        

        this.router.navigate(['/Home']);
      } 
      
      else if  (userDetails.userrole==1){
        this.router.navigate(['/leaderboard'])

      } 
    }else {
        console.log('Username or password do not match');
        window.alert('Username or password do not match. Please register first.');

      }
    },
    (error) => {
      console.log('Username or password do not match');
        window.alert('Username or password do not match. Please register first.');
    }
  );
}

}