import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';


@Injectable()
export class UserService {
    constructor(private http: Http) {}

     create(username: string, password: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8080/users'
                                , JSON.stringify({ username: username, password: password })
                                , options)
        .map((response: Response) => {
                return response;
            }).catch(error => {
                return Observable.of(error);
            });
    }

}