import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable }  from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as ENV } from '../../../environments/environment';

const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
const options = new RequestOptions({ headers: headers});

@Injectable({
  providedIn: 'root'
})
export class WorldcupService {

  private BASE_URL: string = ENV.base_url + 'worldcup/';

  isLogged: boolean = false;
  isCreated: boolean = false;
  teams: any;

  constructor( private http: Http ) { }

  getTeams(): Observable<any> {

    return this.http.get(this.BASE_URL + 'teams', options).pipe(
              map( (res: Response) => res.json() )
            );
  }
}
