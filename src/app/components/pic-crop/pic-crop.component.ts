import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-pic-crop',
  templateUrl: './pic-crop.component.html',
  styleUrls: ['./pic-crop.component.css']
})
export class PicCropComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  pic: any = '';
  isLoading: boolean = false;

  @Output() setProfilePic = new EventEmitter<string>();
  @Output() toggleAM = new EventEmitter<boolean>();

  hideComponent(){
    this.toggleAM.emit(false);
  }

  constructor( private authService: AuthService, 
               private profileService: ProfileService,
               private router: Router ) {  }

  ngOnInit() {}

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
      this.croppedImage = image;
  }
  imageLoaded() {
    console.log('Изображение готово');
  }
  loadImageFailed() {
      console.log('Загрузка')
  }
  uploadImage() {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    const sendPic = this.profileService.setPersonalImg(tokens.access_token, this.croppedImage);
    const checkAuth = this.authService.checkTokens(tokens.access_token, tokens.refresh_token);
    this.isLoading = true;

    checkAuth.subscribe( data => {
      if ( data.status === 'ok' ) {
        sendPic.subscribe( data => {
          data.status === 'ok' ? 
                  this.toggleAM.emit(false) : console.log('Отказ в доступе');
          this.setProfilePic.emit(data.img)
          setTimeout(this.isLoading = false, 500)
        });
      }
    })
  }
}
