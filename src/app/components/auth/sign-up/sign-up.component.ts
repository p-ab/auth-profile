import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable }  from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  regform: FormGroup;
  serverMsg: string = 'Всё хорошо';
  secretkey: string = '6LemHV8UAAAAAB6B81cxRuRzFc6lg5NPwGw9l_xu';
  captcha: string = 'on';
  isLoading: boolean = false;
  isHuman: boolean = false;

  constructor( private authService: AuthService, 
               private router: Router ) {}

  ngOnInit() {
    this.regform = new FormGroup({
      bename: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^(?!.*(?:admin|nigger|админ|ниггер)).*/i)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });

    this.specifyEmail();
  }

  resolved(captchaResponse: string) {
      this.isHuman = true;
      this.serverMsg = 'Всё хорошо';
      setTimeout(() => this.captcha = 'off', 900);
  }
  expired() {
      this.isHuman = false;
      this.captcha = 'on';
  }

  onFocus() {
    this.serverMsg = 'Всё хорошо';
  }

  specifyEmail() {
    const ctrl = this.regform.get('email');
    ctrl.valueChanges.pipe( debounceTime(1500) )
        .subscribe( res => {
          if (!this.regform.controls.email.errors) {
            this.authService.checkEmail(res).subscribe(
              data => {
                console.log('Service: ', res);
                if (data.status === 'error')
                  this.serverMsg = 'Этот email уже занят';
                else {
                  this.serverMsg = 'Всё хорошо';
                }
              },
              error => {
               console.log('Произошла какая-то ошибка') 
              });
          }
      });
  }

  onSubmit() {
    if (this.regform.valid && this.isHuman) {
      this.isLoading = true;
      const name = this.regform.value.bename;
      const email = this.regform.value.email;
      const password = this.regform.value.password;


      setTimeout(() => {
        this.create(name, email, password);
        this.regform.reset();
      }, 200)
    } else {
      this.serverMsg = 'Подтвердите, что вы человек';
    }
  }

  create(name, email, password) {

    this.authService.reg(name, email, password)
      .subscribe(data => {
          if (data.status === 'error') {
            this.serverMsg = 'Выберите другой псевдоним (возможно, не в этом дело)';
            console.log(this.serverMsg);
          }
          else if (data.status === 'ok') {
            this.authService.isCreated = true;

            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 500)

          } else {
            this.serverMsg = 'Даже не знаю, что произошло...)'
            console.log(this.serverMsg);
          }
          
        },
        error => {
          this.isLoading = false;
          this.serverMsg = 'Сервер не отвечает, возможно он обиделся';
          console.log(this.serverMsg);
        })
  }
}
