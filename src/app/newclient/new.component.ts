import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { ClientService } from '../_services/client.service';
import { Location } from '@angular/common';
import { Client } from '../_models/client';

@Component({
    moduleId: module.id,
    templateUrl: 'new.component.html'
})

export class NewComponent implements OnInit {
    client: any = {};
    address: any = {};
    error = '';
    success = '';

    constructor(
        private router: Router,
        private clientService: ClientService,
        private activatedRoute: ActivatedRoute,
        private location: Location) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            if(params['id'] != undefined){
                var id = params['id'];
                this.clientService.getClientById(id).subscribe(result => {
                    if (result) {
                        if(result != undefined){
                            this.client = result;
                            this.address = result.address;
                        }
                    } 
                });

            }
       })
       
    }



    createClient(){
        this.error = '';
        this.success = '';
        this.clientService.create(this.client, this.address)
            .subscribe(result => {
                if (result.status === 200) {
                    this.success = 'Cliente criado com sucesso';
                    this.router.navigate(['/home']);
                } else {
                    if(result.status === 500){
                        this.error = 'Cliente existente';
                    }else{
                        this.error = 'Erro ao cadastrar Cliente';
                    }
                }
            });
    }

    backToHome(){
        this.location.back();
    }
  
}