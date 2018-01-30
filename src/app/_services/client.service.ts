import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Address } from '../_models/address';
import { Client } from '../_models/Client';
import 'rxjs/Rx';


@Injectable()
export class ClientService {
    currentUser: any = {};
    url;
    
    constructor(private http: Http) {
        this.url = 'http://localhost:8081/client/';
    }
    
    create(client: Client, address: Address): Observable<any> {
        client.address = address;

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var path = this.url + this.currentUser.username;
        
        let headers = new Headers();
        headers.append( 'Content-Type','application/json' );
        headers.append( 'Authorization', this.currentUser.token);

        let options = new RequestOptions();
        options.headers = headers;
        
        return this.http.post(path, client, options)
        .map((response: Response) => {
                return response;
            }).catch(error => {
                return Observable.of(error);
            });
    }

    delete(id){
        var path = this.url + id;
        
        let headers = new Headers();
        headers.append( 'Content-Type','application/json' );
        headers.append( 'Authorization', this.currentUser.token);

        let options = new RequestOptions();
        options.headers = headers;
        
        return this.http.delete(path, options)
        .map((response: Response) => {
                return response;
            }).catch(error => {
                return Observable.of(error);
            });
    }

    getClientById(id): Observable<any> {
        var path = this.url + '/findClient/' + id;
        
        let headers = new Headers();
        headers.append( 'Content-Type','application/json' );
        headers.append( 'Authorization', this.currentUser.token);

        let options = new RequestOptions();
        options.headers = headers;
        
        return this.http.get(path, options)
        .map((response: Response) => {
                return response.json();
            }).catch(error => {
                return Observable.of(error);
            });
    }

    getClients(pag:string): Observable<any> {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var path = this.url + this.currentUser.username;
        
        let headers = new Headers();
        headers.append( 'Content-Type','application/json' );
        headers.append( 'Authorization',this.currentUser.token);

        let params = new URLSearchParams();
        params.set('pag', pag);

        let options = new RequestOptions();
        options.headers = headers;
        options.params = params;

        return this.http.get(path, options)
        .map((response: Response) => {
                var listClients = response.json();
                if(listClients){
                    return listClients;
                }
                return null;
            }).catch(error => {
                return Observable.of(null);
            });
            
    }

}