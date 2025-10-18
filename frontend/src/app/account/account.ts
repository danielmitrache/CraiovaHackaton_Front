import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Car {
  id: number;
  brand: string;
  model: string;
  motorizare: string;
  year: number;
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.html',
  styleUrls: ['./account.css']
})
export class AccountComponent {
  cars: Car[] = [
    // Example data - replace with actual API call
    // { id: 1, brand: 'BMW', model: 'X5', motorizare: '3.0 Diesel', year: 2022 },
    // { id: 2, brand: 'Audi', model: 'A4', motorizare: '2.0 TFSI', year: 2021 }
  ];

  addNewCar(): void {
    console.log('Add new car');
    // TODO: Implement add car functionality
  }
}

