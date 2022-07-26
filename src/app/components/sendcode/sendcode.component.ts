import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user.entity';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-sendcode',
  templateUrl: './sendcode.component.html'
})
export class SendcodeComponent implements OnInit {
  message: string = '';
  user: User;
  sendCodeForm: FormGroup = new FormGroup({
    Username: new FormControl,
    Email: new FormControl
  })
  constructor(private userService: UserService, private route: Router) { }

  ngOnInit(): void {
    this.message = '';
  }

  onSendCode(){
    this.user = new User('',this.sendCodeForm.controls['Username'].value, '', this.sendCodeForm.controls['Email'].value,'',false)
    this.userService.sendcode(this.user).subscribe(
      data => {
        this.message = 'Send code success. Please check your email.'
        sessionStorage.setItem('code', data.code)
        sessionStorage.setItem('username', this.sendCodeForm.controls['Username'].value)
        sessionStorage.setItem('email', this.sendCodeForm.controls['Email'].value)
        this.route.navigate(['/forgot'])
      },
      error => {
        this.message = 'Send code failed. Please check your email and username.'
      }
    )
  }

}
