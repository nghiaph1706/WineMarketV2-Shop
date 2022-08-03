import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user.entity';
import { UserService } from 'src/app/service/user/user.service';
import { MessageService } from 'src/app/service/utils/message.service';

@Component({
  selector: 'app-sendcode',
  templateUrl: './sendcode.component.html'
})
export class SendcodeComponent implements OnInit {
  user: User;
  sendCodeForm: FormGroup = new FormGroup({
    Username: new FormControl('', Validators.required),
    Email: new FormControl('',Validators.required)
  })
  constructor(private messageService: MessageService, private userService: UserService, private route: Router) { }

  ngOnInit(): void {
  }

  onSendCode(){
    this.user = new User('',this.sendCodeForm.controls['Username'].value, '', this.sendCodeForm.controls['Email'].value,'',false)
    this.userService.sendcode(this.user).subscribe(
      data => {
        this.messageService.showSuccess('Send code success. Please check your email.')
        sessionStorage.setItem('code', data.code)
        sessionStorage.setItem('username', this.sendCodeForm.controls['Username'].value)
        sessionStorage.setItem('email', this.sendCodeForm.controls['Email'].value)
        this.route.navigate(['/forgot'])
      },
      error => {
        this.messageService.showError('Send code failed. Please check your email and username.')
      }
    )
  }

}
