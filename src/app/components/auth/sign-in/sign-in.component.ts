import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable }  from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  authform: FormGroup;
  serverMsg: string = 'Всё хорошо';
  isLoading: boolean = true;

  constructor( private authService: AuthService, 
               private router: Router, 
               public snackBar: MatSnackBar ) {}

  ngOnInit() {
    this.authform = new FormGroup({
      person: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    });

    setTimeout(() => this.isLoading = this.authService.isLogged, 600)

    if (this.authService.isCreated) {
      const [message, btn] = ['Пользователь успешно создан', 'ок']
      setTimeout(() => this.openSnackBar(message, btn), 300);
    }
  }

  onFocus() {
    this.serverMsg = 'Всё хорошо';
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4800,
      verticalPosition: 'top',
      panelClass: 'success-snack'
    });
    setTimeout(() => this.authService.isCreated = false, 4818);
  }

  onSubmit() {
    if (this.authform.valid) {
      this.isLoading = true;
      const person = this.authform.value.person;
      const password = this.authform.value.password;
      this.authform.reset();
      this.login(person, password);
    }
  }

  login(person, password) {

    this.authService.auth(person, password)
        .subscribe(data => {
            if (data.status === 'error') {
              this.serverMsg = 'Введённые данные не подошли'
              console.log(this.serverMsg);
            }
            else if (data.status === 'ok') {
              const access = data.tokens.access_token;
              const refresh = data.tokens.refresh_token;
              const tokens = JSON.stringify({ access_token: access, refresh_token: refresh });
              localStorage.setItem('tokens', tokens);
              this.authService.isLogged = true;
              this.authService.user = data.user;
              this.router.navigate(['/board']);
            } else {
              this.serverMsg = 'Даже не знаю, что произошло...)'
              console.log(this.serverMsg);
            }
            
            this.isLoading = false;
          },
          error => {
            this.isLoading = false;
            this.serverMsg = 'Сервер ещё не готов к серьёзным отношениям, но вы можете дружить';
            console.log(this.serverMsg);
          })
  }

}