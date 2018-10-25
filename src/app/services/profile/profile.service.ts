import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable, forkJoin }  from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as ENV } from '../../../environments/environment';

const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
const options = new RequestOptions({ headers: headers});

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private BASE_URL: string = ENV.base_url;

  constructor( private http: Http ) { }

  setPersonalImg(access, image): Observable<any> {
    let body = new URLSearchParams();
        body.set('access_token', access);
        body.set('file', image);
    return this.http.post(this.BASE_URL + 'bio/set-avatar', body.toString(), options).pipe(
        map( (res: Response) => res.json() )
      )
  }
  setPersonalData(access, fullname, city, hobby): Observable<any> {
    let body = new URLSearchParams();
        body.set('access_token', access);
        body.set('fullname', fullname);
        body.set('city', city);
        body.set('hobby', hobby);
    return this.http.post(this.BASE_URL + 'bio/set-bio', body.toString(), options).pipe(
        map( (res: Response) => res.json() )
      )
  }
  getProfile(access): Observable<any> {
    let body = new URLSearchParams();
        body.set('access_token', access);
    let userdata = this.http.post(this.BASE_URL + 'bio', body.toString(), options);
    let userimg = this.http.post(this.BASE_URL + 'bio/avatar', body.toString(), options);
    return forkJoin([userdata, userimg]).pipe(
        map( res => [ res[0].json(), res[1].json() ] ) 
      )  
  }
}
