import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entity/user.entity';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/service/user/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadService } from 'src/app/service/utils/upload.service';
import { MessageService } from 'src/app/service/utils/message.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  user: User;
  fileName: string = '';
  fileURL: string = '';
  userForm: FormGroup = new FormGroup({
    Username: new FormControl,
    Email: new FormControl('', Validators.required),
    attach: new FormControl()
  })
  constructor(private messageService: MessageService, private userService: UserService, private cookieService: CookieService, private uploadService: UploadService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.fileName = '';
    this.userService.find(this.cookieService.get('user_Id')).subscribe(
      data => {
        this.user= data;
        this.userForm.controls['Username'].setValue(this.user.username)
        this.userForm.controls['Email'].setValue(this.user.email)
        this.fileURL = this.user.image
        this.fileName = this.user.image
      }
    )
  }

  onUpdate(id: string) {
    var image = new FormData();
    if (this.userForm.controls['attach'].value != null) {
      image.append('file', this.userForm.controls['attach'].value);
      this.uploadService.uploadImage(image, 'user').subscribe(
        error => {
          console.log(error)
        }
      );
    }

    var username = this.userForm.controls['Username'].value == null ? this.user.username : this.userForm.controls['Username'].value
    var img = this.fileName == 'null.png' ? this.user.image : this.fileName.replace(" ","%20")
    var email = this.userForm.controls['Email'].value == null ? this.user.email : this.userForm.controls['Email'].value
    var role = this.user.role
    var user: User = new User(id, username, this.user.password, email, img, role);

    this.userService.update(user).subscribe(
      data => {
        this.messageService.showSuccess(this.translate.instant('notiUpdateSuccess'))
      },
      error => {
        this.messageService.showError(this.translate.instant('notiUpdateError'))
      }
    )
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const file = target.files[0];
        this.fileName = file.name;
        this.userForm.patchValue({
          attach: file
        });
    }
   }

}
