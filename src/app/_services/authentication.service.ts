import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) {}

    login(username: string, password: string): Observable<boolean> {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;

        return this.http.post('http://localhost:8080/login', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                var token = response.text();
                if (token) {

                    this.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    return true;
                } else {
                    return false;
                }
            }).catch(error => {
                return Observable.of(null);
            });

    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}