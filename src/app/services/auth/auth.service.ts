import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Subject, Observable }  from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as ENV } from '../../../environments/environment';

const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
const options = new RequestOptions({ headers: headers});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL: string = ENV.base_url;

  isLogged: boolean = false;
  isCreated: boolean = false;
  user: any = {name: ''};

  checkUserdata: Subject<boolean> = new Subject<boolean>();
  checkLoggedState: Subject<boolean> = new Subject<boolean>();

  constructor( private http: Http ) {
        this.checkUserdata.subscribe((value) => this.user = value);
        this.checkLoggedState.subscribe((value) => this.isLogged = value);
      }


  reg(name, email, password): Observable<any> {
    let body = new URLSearchParams();
        body.set('name', name);
        body.set('email', email);
        body.set('password', password);

    return this.http.post(this.BASE_URL + 'reg', body.toString(), options).pipe(
              map( (res: Response) => res.json() )
            );
  }

  auth(person, password): Observable<any> {
    let body = new URLSearchParams();
        body.set('person', person);
        body.set('password', password);

    return this.http.post(this.BASE_URL + 'auth', body.toString(), options).pipe(
              map( (res: Response) => res.json() )
            );
  }

  logout(refresh): Observable<any> {
    let body = new URLSearchParams();
        body.set('refresh_token', refresh);

    return this.http.post(this.BASE_URL + 'logout', body.toString(), options).pipe(
              map( (res: Response) => res.json() )
            );
  }

  checkEmail(email) {
    let body = new URLSearchParams();
        body.set('email', email);

    return this.http.post(this.BASE_URL + 'is-email-available', body.toString(), options)
      .pipe(
        map( (res: Response) => res.json() )
      );
  }
  checkName(name) {
    let body = new URLSearchParams();
        body.set('email', name);

    return this.http.post(this.BASE_URL + 'is-name-available', body.toString(), options)
      .pipe(
        map( (res: Response) => res.json() )
      );
  }

  checkTokens(access, refresh): Observable<any> {
    let body = new URLSearchParams();
        body.set('access_token', access);
        body.set('refresh_token', refresh);

    return this.http.post(this.BASE_URL + 'check-tokens', body.toString(), options).pipe(
              map( (res: Response) => {
                let data = res.json();
                if ( data.status === 'ok' ) {
                  if (data.tokens) {
                    localStorage.setItem('tokens', JSON.stringify(data.tokens));
                    console.log('Произведена замена ключей доступа');
                  }
                  this.checkUserdata.next(data.user);
                  this.checkLoggedState.next(true);
                  return {status: 'ok'};
                } else {
                  console.log('Такие данные не подходят');
                  return {status: 'error'};
                }
              })
            );
  }
}