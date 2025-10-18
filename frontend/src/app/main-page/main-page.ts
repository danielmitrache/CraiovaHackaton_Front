import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page.html',
  styleUrls: ['./main-page.css']
})
export class MainPageComponent {
  userName = 'Guest';
  isLoggedIn = false;

  // Concept cards data showcasing the app's value propositions
  concepts = [
    {
      icon: '🎯',
      title: 'Real-time Price Comparison',
      description: 'See what multiple garages would charge for the same job. No more wondering if you\'re being taken for a ride (literally and financially).'
    },
    {
      icon: '🛡️',
      title: 'Stop Overpaying Specialists',
      description: 'Get AI-powered estimates before you commit. Know if that "$800 brake job" should really cost $300. Because your wallet has feelings too.'
    },
    {
      icon: '💎',
      title: 'Best Deal for Your Buck',
      description: 'Quality + fair price = happy driver. We match you with garages that won\'t treat your wallet like a piñata at a mechanic\'s birthday party.'
    }
  ];

  constructor(private router: Router) {}

  /**
   * Navigate to appointment booking flow
   */
  onMakeAppointment(): void {
    console.log('🔧 Navigate to appointment booking');
    // TODO: Implement routing to appointment flow
    alert('🚗 Let\'s get your car back in shape! Redirecting to appointment booking...');
  }

  /**
   * Navigate to garage directory/listing
   */
  onViewGarages(): void {
    console.log('🏪 Navigate to garage directory');
    this.router.navigate(['/services']);
  }

  /**
   * Open more details menu/panel
   */
  onMoreDetails(): void {
    console.log('⋯ Show more details menu');
    // TODO: Implement side panel or dropdown menu
    alert('📋 More options coming soon!');
  }

  /**
   * Navigate to user profile page
   */
  onUserProfile(): void {
    console.log('👤 Navigate to user profile');
    if (this.isLoggedIn) {

      alert('👤 User profile and settings coming soon!');
    } else {
      // Redirect to login if not logged in
      this.router.navigate(['/login']);
    }
  }

  /**
   * Navigate to login page
   */
  onLogin(): void {
    console.log('🔑 Navigate to login page');
    this.router.navigate(['/login']);
  }

  /**
   * Navigate to register page
   */
  onRegister(): void {
    console.log('📝 Navigate to register page');
    this.router.navigate(['/register']);
  }
}
