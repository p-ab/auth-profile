import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { ReCaptchaModule } from 'angular2-recaptcha';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, 
        MatCheckboxModule, MatDividerModule, MatSnackBarModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { AppRoutingModule } from './/app-routing.module';
import { NotificationsComponent } from './components/alerts/notifications/notifications.component';

import { AuthService } from './services/auth/auth.service';
import { WorldcupService } from './services/worldcup/worldcup.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CircleComponent } from './components/loaders/circle/circle.component';
import { PicCropComponent } from './components/pic-crop/pic-crop.component';
import { ConfirmEmailComponent } from './components/modals/confirm-email/confirm-email.component';
import { LinearComponent } from './components/loaders/linear/linear/linear.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    NotificationsComponent,
    DashboardComponent,
    ProfileComponent,
    NavbarComponent,
    CircleComponent,
    PicCropComponent,
    ConfirmEmailComponent,
    LinearComponent
  ],
  imports: [
    BrowserModule,
    ImageCropperModule,
    ReactiveFormsModule,
    HttpModule, 
    HttpClientModule, 
    NoopAnimationsModule, 
    ReCaptchaModule, 
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, 
    MatDividerModule, MatSnackBarModule, MatGridListModule, MatMenuModule, MatToolbarModule, 
    MatIconModule, MatTableModule, MatDialogModule, 
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmEmailComponent]
})
export class AppModule { }
