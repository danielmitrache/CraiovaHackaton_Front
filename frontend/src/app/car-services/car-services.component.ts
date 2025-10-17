import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  id: number;
  title: string;
  description: string;
  price: string;
  icon: string;
}

@Component({
  selector: 'app-car-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-services.component.html',
  styleUrl: './car-services.component.css'
})
export class CarServicesComponent {
  services: Service[] = [
    {
      id: 1,
      title: 'Oil Change',
      description: 'Complete oil change service with premium quality oil and filter replacement.',
      price: '$49.99',
      icon: '🛢️'
    },
    {
      id: 2,
      title: 'Brake Service',
      description: 'Full brake inspection, pad replacement, and rotor resurfacing or replacement.',
      price: '$129.99',
      icon: '🔧'
    },
    {
      id: 3,
      title: 'Tire Rotation',
      description: 'Professional tire rotation and balance to ensure even wear and optimal performance.',
      price: '$39.99',
      icon: '🚗'
    },
    {
      id: 4,
      title: 'Engine Diagnostics',
      description: 'Comprehensive engine diagnostics using advanced computer systems.',
      price: '$89.99',
      icon: '⚙️'
    },
    {
      id: 5,
      title: 'Air Conditioning',
      description: 'AC system inspection, recharge, and repair services.',
      price: '$99.99',
      icon: '❄️'
    },
    {
      id: 6,
      title: 'Battery Service',
      description: 'Battery testing, cleaning, and replacement with quality batteries.',
      price: '$79.99',
      icon: '🔋'
    },
    {
      id: 7,
      title: 'Transmission Service',
      description: 'Complete transmission fluid change and system inspection.',
      price: '$149.99',
      icon: '⚡'
    },
    {
      id: 8,
      title: 'Wheel Alignment',
      description: 'Precision wheel alignment for improved handling and tire life.',
      price: '$74.99',
      icon: '🎯'
    },
    {
      id: 9,
      title: 'General Inspection',
      description: 'Comprehensive vehicle inspection covering all major systems.',
      price: '$59.99',
      icon: '🔍'
    }
  ];

  selectService(service: Service) {
    console.log('Selected service:', service);
    // This will be connected to booking functionality later
  }
}

