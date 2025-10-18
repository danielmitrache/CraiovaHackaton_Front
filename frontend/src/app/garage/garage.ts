import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isOccupied: boolean;
  isSelected: boolean;
  isInRange: boolean;
}

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './garage.html',
  styleUrls: ['./garage.css']
})
export class GarageComponent {
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  selectedStartDate: Date | null = null;
  numberDays: number = 1;

  calendarDays: CalendarDay[] = [];

  // Mock occupied dates - replace with API call
  occupiedDates: Date[] = [
    new Date(2024, 0, 5),
    new Date(2024, 0, 6),
    new Date(2024, 0, 12),
    new Date(2024, 0, 20),
    new Date(2024, 0, 21),
  ];

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    this.calendarDays = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const totalDays = lastDay.getDate();

    // Previous month days
    const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(this.currentYear, this.currentMonth - 1, prevMonthLastDay - i);
      this.calendarDays.push({
        date,
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        isOccupied: false,
        isSelected: false,
        isInRange: false
      });
    }

    // Current month days
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      this.calendarDays.push({
        date,
        day,
        isCurrentMonth: true,
        isOccupied: this.isDateOccupied(date),
        isSelected: this.isDateSelected(date),
        isInRange: this.isDateInRange(date)
      });
    }

    // Next month days
    const remainingDays = 42 - this.calendarDays.length; // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(this.currentYear, this.currentMonth + 1, day);
      this.calendarDays.push({
        date,
        day,
        isCurrentMonth: false,
        isOccupied: false,
        isSelected: false,
        isInRange: false
      });
    }
  }

  isDateOccupied(date: Date): boolean {
    return this.occupiedDates.some(occupiedDate =>
      occupiedDate.getDate() === date.getDate() &&
      occupiedDate.getMonth() === date.getMonth() &&
      occupiedDate.getFullYear() === date.getFullYear()
    );
  }

  isDateSelected(date: Date): boolean {
    if (!this.selectedStartDate) return false;
    return date.getTime() === this.selectedStartDate.getTime();
  }

  isDateInRange(date: Date): boolean {
    if (!this.selectedStartDate) return false;
    const endDate = new Date(this.selectedStartDate);
    endDate.setDate(endDate.getDate() + this.numberDays - 1);
    return date >= this.selectedStartDate && date <= endDate;
  }

  selectDay(calendarDay: CalendarDay) {
    if (!calendarDay.isCurrentMonth || calendarDay.isOccupied) return;

    // Check if any day in the range is occupied
    const isRangeValid = this.checkRangeAvailability(calendarDay.date);
    if (!isRangeValid) {
      alert('Selected range contains occupied days. Please choose another date.');
      return;
    }

    this.selectedStartDate = calendarDay.date;
    this.generateCalendar();
  }

  checkRangeAvailability(startDate: Date): boolean {
    for (let i = 0; i < this.numberDays; i++) {
      const checkDate = new Date(startDate);
      checkDate.setDate(checkDate.getDate() + i);
      if (this.isDateOccupied(checkDate)) {
        return false;
      }
    }
    return true;
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  onNumberDaysChange() {
    if (this.numberDays < 1) this.numberDays = 1;
    this.generateCalendar();
  }

  confirmAppointment() {
    if (!this.selectedStartDate) {
      alert('Please select a start date.');
      return;
    }

    const endDate = new Date(this.selectedStartDate);
    endDate.setDate(endDate.getDate() + this.numberDays - 1);

    console.log('Appointment confirmed:', {
      startDate: this.selectedStartDate,
      endDate: endDate,
      numberOfDays: this.numberDays
    });

    // TODO: Send to backend API
    alert(`Appointment confirmed from ${this.selectedStartDate.toLocaleDateString()} for ${this.numberDays} day(s)`);
  }
}

