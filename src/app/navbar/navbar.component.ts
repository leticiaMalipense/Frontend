import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
    name = '';
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { 
          
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.name = currentUser.username;
        }

  ngOnInit() {
    
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}