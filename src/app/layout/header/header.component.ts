import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userRole: string = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

    this.checkLoginStatus();


    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.userRole = localStorage.getItem('userRole') || ''; 
      }
    });
  }


  checkLoginStatus(): void {
    const userId = localStorage.getItem('userId');
    this.isLoggedIn = !!userId;  
    if (this.isLoggedIn) {
      this.userRole = localStorage.getItem('userRole') || ''; 
    }
  }


  logout(): void {
    this.authService.setLoginStatus(null);  
    localStorage.removeItem('userId');  
    localStorage.removeItem('userRole');  
    this.router.navigate(['/home']);  
  }
}
