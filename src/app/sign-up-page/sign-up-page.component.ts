import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent {
  isonline: boolean = true;

  
  validemail: string = "";
  contactInfo: FormGroup<{ name: FormControl<string | null>; email: FormControl<string | null>; password: FormControl<string | null>; confirmpassword: FormControl<string | null>; }>;

  constructor(private router: Router, private dataSharingService: DataSharingService, private http: HttpClient) {
     this.contactInfo = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmpassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  
   }

  onSubmit() {
   // const registrationData = this.contactInfo.value;

    let request={
      name:this.contactInfo.value.name,
      email:this.contactInfo.value.email,
      password:this.contactInfo.value.password,
      confirmpassword:this.contactInfo.value.confirmpassword


    }

this.dataSharingService.postdata('http://localhost:8080/api/users/save', request).subscribe(
  (data) => {
console.log("Inside the Save User")
    console.log(data);
    if(data.success=='Email Already Used')
    {
      alert('Email is already used');
      return
    }
    else{
      alert('User Saved');
      this.router.navigate(['/Login']);
     
    }
  },
  (error) => {
    console.error('Error saving user', error);
  }
);

    
  }

  isPasswordStrong(password: string): boolean {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/;
    return strongRegex.test(password);
  }

  ngOnInit(): void {
    this.dataSharingService.connectionStatus$.subscribe((status) => {
      this.isonline = status;
    });
  }

}
