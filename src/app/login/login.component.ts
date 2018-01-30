import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    error = '';
    success = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService) { }

    ngOnInit() {
        this.authenticationService.logout();
    }

    login() {
        this.error = '';
        this.success = '';
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result) {
                    this.router.navigate(['/home']);
                } else {
                    this.error = 'Usuário ou senha incorretos';
                }
            });
    }

    createUser(){
        this.error = '';
        this.success = '';
        this.userService.create(this.model.username, this.model.password)
            .subscribe(result => {
                if (result.status === 200) {
                    this.success = 'Usuário criado com sucesso';
                    this.router.navigate(['/home']);
                } else {
                    if(result.status === 500){
                        this.error = 'Usuário existente';
                    }else{
                        this.error = 'Erro ao cadastrar usuário';
                    }
                }
            });
    }
}