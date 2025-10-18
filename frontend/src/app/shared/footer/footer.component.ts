import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  onLinkClick(link: string): void {
    console.log(`Navigate to: ${link} page coming soon!`);
    // Placeholder: link functionality not yet implemented.
  }
}

