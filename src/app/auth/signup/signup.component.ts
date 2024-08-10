import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupRequestPayload } from './signup-request.payload';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  signupForm!: FormGroup ;
  signupRequestPayload : SignupRequestPayload

  //constructor injection
  constructor(private authService:AuthService,
    private router:Router,
    private toastr: ToastrService
  ){
    this.signupRequestPayload= {
      username :'',
      password : '',
      email: ''
    }
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username : new FormControl('', Validators.required),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  signup(){
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;
    this.signupRequestPayload.email = this.signupForm.get('email')?.value;

    //calling auth service
    this.authService.signup(this.signupRequestPayload)
    .subscribe(data=>{
      console.log(data);

      this.router.navigate(['/login'],
        {queryParams : { registered: 'true'}}
      );
    }, error => {
      console.log(error);
      this.toastr.error('Registration Failed! Please try again');
    }
  
  );

  }
}
