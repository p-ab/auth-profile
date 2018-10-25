import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  @Input() link: string;
  @Input() title: string;
  @Input() user: any;

  constructor( private authService: AuthService, 
               private router: Router ) { }

  ngOnInit() {
  }

  logout() {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    if ( tokens !== null ) {
      const refresh = tokens.refresh_token;
      this.authService.logout(refresh).subscribe(
        data => {
          setTimeout(() => this.authService.isLogged = false, 300);
          this.router.navigate(['']);
        }, 
        error => {
          console.log(error)
        })
    }
  }
}
