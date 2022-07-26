import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user.entity';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  message: string = '';
  user: User;
  signupForm: FormGroup = new FormGroup({
    Username: new FormControl,
    Email: new FormControl,
    Password: new FormControl,
    Repassword: new FormControl
  })
  constructor(private userService: UserService, private route: Router) { }

  ngOnInit(): void {
    this.message = '';
  }

  onSignup(){
    if (this.signupForm.controls['Password'].value === this.signupForm.controls['Repassword'].value) {
      this.user = new User('',this.signupForm.controls['Username'].value, this.signupForm.controls['Repassword'].value, this.signupForm.controls['Email'].value, 'null.png', false)
      this.userService.signup(this.user).subscribe(
        data => {
          this.message = 'Signup Success';
          this.route.navigate(['/login'])
        },
        error => {
          this.message = 'Signup Failed. Please check Email and Username'
        }
      )
    } else {
      this.message = 'SignUp failed. Password and Repassword does not match.'
    }
    
  }

}
