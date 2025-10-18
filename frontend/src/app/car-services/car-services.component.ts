import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

interface Seller {
  id: number;
  name: string;
  description: string;
  streetAddress: string;
  city: string;
  profileImage: string;
  rating: number;
}

@Component({
  selector: 'app-car-services',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './car-services.component.html',
  styleUrl: './car-services.component.css'
})
export class CarServicesComponent {
  searchCity = '';
  selectedCity = '';
  showDropdown = false;

  sellers: Seller[] = [
    {
      id: 1,
      name: 'AutoCare Plus',
      description: 'Premium car repair and maintenance services with certified mechanics and 20+ years of experience.',
      streetAddress: '123 Main Street',
      city: 'Craiova',
      profileImage: '🏪',
      rating: 4.8
    },
    {
      id: 2,
      name: 'SpeedFix Garage',
      description: 'Fast and reliable auto repairs specializing in European vehicles and diagnostic services.',
      streetAddress: '456 Oak Avenue',
      city: 'Craiova',
      profileImage: '🔧',
      rating: 4.6
    },
    {
      id: 3,
      name: 'Elite Motors',
      description: 'Luxury car service center offering premium maintenance and performance upgrades.',
      streetAddress: '789 Elm Boulevard',
      city: 'Bucharest',
      profileImage: '🚗',
      rating: 4.9
    },
    {
      id: 4,
      name: 'Precision Auto',
      description: 'Expert technicians providing comprehensive automotive solutions and honest pricing.',
      streetAddress: '321 Pine Road',
      city: 'Bucharest',
      profileImage: '⚙️',
      rating: 4.7
    },
    {
      id: 5,
      name: 'QuickFix Auto Shop',
      description: 'Your neighborhood garage for quick repairs, oil changes, and tire services.',
      streetAddress: '654 Maple Drive',
      city: 'Cluj-Napoca',
      profileImage: '🛠️',
      rating: 4.5
    },
    {
      id: 6,
      name: 'Master Mechanics',
      description: 'Professional auto repair with state-of-the-art equipment and warranty on all work.',
      streetAddress: '987 Cedar Lane',
      city: 'Cluj-Napoca',
      profileImage: '👨‍🔧',
      rating: 4.8
    },
    {
      id: 7,
      name: 'DriveRight Services',
      description: 'Complete car care from routine maintenance to complex engine repairs.',
      streetAddress: '147 Birch Street',
      city: 'Timișoara',
      profileImage: '🏎️',
      rating: 4.6
    },
    {
      id: 8,
      name: 'TurboTech Garage',
      description: 'Specializing in performance tuning, turbos, and high-performance modifications.',
      streetAddress: '258 Spruce Avenue',
      city: 'Timișoara',
      profileImage: '⚡',
      rating: 4.9
    },
    {
      id: 9,
      name: 'Reliable Auto Care',
      description: 'Family-owned shop providing honest, reliable service for all makes and models.',
      streetAddress: '369 Willow Court',
      city: 'Iași',
      profileImage: '🔩',
      rating: 4.7
    },
    {
      id: 10,
      name: 'Premium Car Service',
      description: 'Upscale automotive care with complimentary loaner cars and express service.',
      streetAddress: '741 Ash Street',
      city: 'Iași',
      profileImage: '💎',
      rating: 4.8
    },
    {
      id: 11,
      name: 'City Auto Repair',
      description: 'Convenient downtown location offering all types of auto repairs and inspections.',
      streetAddress: '852 Cherry Lane',
      city: 'Constanța',
      profileImage: '🏙️',
      rating: 4.5
    },
    {
      id: 12,
      name: 'GaragePro Solutions',
      description: 'Modern facility with advanced diagnostics and eco-friendly repair practices.',
      streetAddress: '963 Walnut Drive',
      city: 'Constanța',
      profileImage: '🌟',
      rating: 4.6
    },
    {
      id: 13,
      name: 'AutoWorks Central',
      description: 'One-stop shop for all automotive needs including body work and paint services.',
      streetAddress: '159 Poplar Road',
      city: 'Brașov',
      profileImage: '🎨',
      rating: 4.7
    },
    {
      id: 14,
      name: 'Express Car Care',
      description: 'Quick turnaround times without compromising quality or customer satisfaction.',
      streetAddress: '357 Redwood Avenue',
      city: 'Brașov',
      profileImage: '⏱️',
      rating: 4.6
    },
    {
      id: 15,
      name: 'Ultimate Auto Service',
      description: 'Premium service center with certified technicians and lifetime warranty options.',
      streetAddress: '486 Sycamore Boulevard',
      city: 'Craiova',
      profileImage: '🏆',
      rating: 4.9
    }
  ];

  /**
   * Get unique cities from sellers list
   */
  get cities(): string[] {
    const uniqueCities = [...new Set(this.sellers.map(s => s.city))];
    return uniqueCities.sort();
  }

  /**
   * Get filtered cities based on search input
   */
  get filteredCities(): string[] {
    if (!this.searchCity) {
      return this.cities;
    }
    return this.cities.filter(city =>
      city.toLowerCase().startsWith(this.searchCity.toLowerCase())
    );
  }

  /**
   * Get filtered sellers based on selected city
   */
  get filteredSellers(): Seller[] {
    if (!this.selectedCity) {
      return this.sellers;
    }
    return this.sellers.filter(seller => seller.city === this.selectedCity);
  }

  /**
   * Handle city selection from dropdown
   */
  selectCity(city: string): void {
    this.selectedCity = city;
    this.searchCity = city;
    this.showDropdown = false;
  }

  /**
   * Clear city filter
   */
  clearFilter(): void {
    this.selectedCity = '';
    this.searchCity = '';
  }

  /**
   * Handle input focus
   */
  onInputFocus(): void {
    this.showDropdown = true;
  }

  /**
   * Handle input blur with delay to allow click on dropdown
   */
  onInputBlur(): void {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  /**
   * Handle seller card click
   */
  selectSeller(seller: Seller): void {
    console.log('Selected seller:', seller);
    alert(`📍 ${seller.name}\n${seller.streetAddress}, ${seller.city}\n\n${seller.description}`);
  }
}
