import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  showSignUpButton = true;
  showDonationButton = true;
  isSignedIn = false; 
  signButtonText = 'Sign In'; // Default button text

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to the logged-in status
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isSignedIn = isLoggedIn;
      this.signButtonText = this.isSignedIn ? 'Sign Out' : 'Sign In'; // Update button text
    });

    // Subscribe to router events to manage button visibility
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showSignUpButton = event.url !== '/login';
        const hideButtonPages = ['/Admin', '/Hospital'];
        this.showDonationButton = !hideButtonPages.some(page => event.url.includes(page));
      }
    });
  }

  toggleSignIn() {
    if (this.isSignedIn) {
      this.authService.logout(); // Call logout if currently signed in
    } else {
      this.router.navigate(['/login']); // Navigate to login page if not signed in
    }
  }
}