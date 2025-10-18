import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() showUserActions = true;

  constructor(private router: Router) {}

  onMoreDetails(): void {
    console.log('⋯ Show more details menu');
    alert('📋 More options coming soon!');
  }

  onLogin(): void {
    console.log('👤 Navigate to login');
    this.router.navigate(['/login']);
  }

  onRegister(): void {
    console.log('📝 Navigate to register');
    this.router.navigate(['/register']);
  }

  onLogoClick(): void {
    this.router.navigate(['/main-page']);
  }
}
