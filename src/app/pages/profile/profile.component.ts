import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../services/auth/auth.service';
import { ProfileService } from '../../services/profile/profile.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmEmailComponent } from '../../components/modals/confirm-email/confirm-email.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  title: string = 'Профиль';
  profileForm: FormGroup;
  email;
  isAvatarMode: boolean = false;
  isEditState: boolean;
  isVerified: boolean;
  profile_img: string;
  img_server: string = 'http://www.media.goalball.club/';
  default_img: string = 'http://www.media.goalball.club/assets/uploads/avatars/1.png';

  get user() {
    return this.authService.user;
  }
  
  get authCompleted() {
    return this.authService.isLogged;
  }

  constructor( public dialog: MatDialog, 
               private authService: AuthService, 
               private profileService: ProfileService,
               private router: Router ) { }


  ngOnInit() {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    if ( tokens !== null ) {
      const access = tokens.access_token;
      const refresh = tokens.refresh_token;
      const profileState = this.getProfile(access);

      if (!profileState) {
        const authState = this.checkAuth(access, refresh);
        authState ? this.getProfile(access) : console.log('Здесь так красиво');
      }
    }

    this.profileForm = new FormGroup({
      fullname: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      hobby: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }


  getProfile(access) {
    return this.profileService.getProfile(access).subscribe(
      data => {
        if (data[0].status === 'error' || data[1].status === 'error') {
          return false;
        }
        else {
          const userdata = data[0].userdata;
          const userimg = data[1].image_url;
          this.isVerified = data[0].isVerified;
          this.setProfileData(userdata, userimg);
          return true;
        }
      })
  }

  setProfileData(bio, img) {
    console.log(img)
    this.isEditState = bio ? false : true;
    this.profile_img = img ? this.img_server + img : this.default_img;
  }

  checkAuth(access, refresh) {
    return this.authService.checkTokens(access, refresh).subscribe( 
              data => {
                if ( data.status === 'ok' ) return true;
                else return false;
              })
  }

  toggleEditState() {
    this.isEditState = !this.isEditState;
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ConfirmEmailComponent, {
      width: '380px',
      data: { name: 'Спасибо', email: this.user.email }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.email = result;
    });
  }

  toggleAvatarMode(status) {
    this.isAvatarMode = status;
  }

  setAvatar(pic) {
    this.profile_img = this.img_server + pic;
  }
}