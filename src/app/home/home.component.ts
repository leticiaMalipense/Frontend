import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { ClientService } from '../_services/client.service';
declare var $: any;

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    model: any = {};
    listClients = null;
    gridVisible = false;
    qtdPag = 0;
    pag = '';
    error = '';
    id = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private clientService: ClientService) {
            this.getClients(0);
        }

    ngOnInit() {
        
    }

    btnDelete(id){
        this.id = id;
        $("#myModal").modal();
        console.log("passou aqui"+this.id);
    }

    btnEdit(client){
        this.router.navigate(['/newClient'], { queryParams: {'id': client.id}});
    }

    logout(){
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }

    newClient(){
        this.router.navigate(['/newClient']);
    }

    getClients(pag){
        this.pag = pag;
        this.clientService.getClients(pag).subscribe(result => {
            if (result.content.length > 0) {
                this.qtdPag = result.totalPages;
                this.gridVisible = true;
                this.listClients = result.content;
            } 
        });
    }

    range = (value) => { 
        let a = []; 
        for(let i = 0; i < value; i++) { 
            a.push(i) 
        } 
        return a.reverse();
     }

    delete(){
        console.log(this.id);
        this.clientService.delete(this.id)
        .subscribe(result => {
            if (result) {
                this.error = 'Usuário excluido com sucesso';
                this.getClients(this.pag);
            } else {
                this.error = 'Erro ao excluir usuário';
            }
        });
    }

}