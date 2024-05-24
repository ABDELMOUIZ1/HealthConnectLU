import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string | undefined; // Variable to store the user's name
  isLoggedIn: boolean = false;  // Variable to store login status
  isDropdownOpen: boolean = false;  // Variable to manage dropdown state

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {
    // Retrieve JWT token from cookies
    const jwtToken = this.cookieService.get('jwtToken');

    // Decode JWT token to extract user information
    const tokenPayload = this.decodeToken(jwtToken);
    if (tokenPayload) {
      // Extract user's name from the token payload
      this.userName = tokenPayload.firstName + ' ' + tokenPayload.lastName;
      this.isLoggedIn = true;  // Set login status to true
    }
  }

  decodeToken(token: string): any {
    try {
      // Split token into its parts
      const tokenParts = token.split('.');

      // Decode token payload (second part)
      const tokenPayload = JSON.parse(atob(tokenParts[1]));

      return tokenPayload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.cookieService.delete('jwtToken');  // Delete the JWT token from cookies
    this.isLoggedIn = false;  // Set login status to false
    this.isDropdownOpen = false;  // Close the dropdown
    this.router.navigate(['/search']);  // Redirect to the search page after logout
  }
  navigateToSearch() {
    this.router.navigate(['/search']);  // Redirect to the search page when logo is clicked
  }
}
