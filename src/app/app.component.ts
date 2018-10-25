import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable }  from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Benoist M.';

  constructor( private authService: AuthService,
               private router: Router ) { }

  ngOnInit() {
    this.checkAuth();
  }

  checkAuth() {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    if ( tokens !== null ) {
      const access = tokens.access_token;
      const refresh = tokens.refresh_token;
      this.authService.checkTokens(access, refresh).subscribe( 
        data => {
          if ( data.status === 'ok' ) {
            if (window.location.pathname === '/' || window.location.pathname === '/login')
              this.router.navigate(['/board']);
          } else {
            this.router.navigate(['/login']);
            console.log('Такие данные не подходят');
          }
        }, 
        error => console.log('Сервер не может или не хочет обслуживать людей'))
    }
  }

}
