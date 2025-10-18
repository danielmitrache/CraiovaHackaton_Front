import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isOccupied: boolean;
  isSelected: boolean;
  isPastDate: boolean;
}

interface TimeSlot {
  hour: number;
  displayTime: string;
  isOccupied: boolean;
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
  selectedDate: Date | null = null;
  selectedHour: number | null = null;
  today: Date = new Date();

  calendarDays: CalendarDay[] = [];
  timeSlots: TimeSlot[] = [];

  // Mock occupied appointments - replace with API call
  // Format: { date: 'YYYY-MM-DD', hours: [9, 10, 14] }
  occupiedAppointments: { date: string; hours: number[] }[] = [
    { date: '2025-10-20', hours: [9, 10, 14] },
    { date: '2025-10-21', hours: [11, 13, 15] },
    { date: '2025-10-22', hours: [9, 10, 11, 12, 13, 14, 15, 16, 17] }, // Fully booked day
    { date: '2025-10-25', hours: [16, 17] },
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
        isPastDate: true
      });
    }

    // Current month days
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      const isPast = this.isPastDate(date);
      const isFullyBooked = this.isDateFullyBooked(date);

      this.calendarDays.push({
        date,
        day,
        isCurrentMonth: true,
        isOccupied: isFullyBooked,
        isSelected: this.isDateSelected(date),
        isPastDate: isPast
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
        isPastDate: false
      });
    }
  }

  isPastDate(date: Date): boolean {
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    const todayDate = new Date(this.today);
    todayDate.setHours(0, 0, 0, 0);
    return compareDate < todayDate;
  }

  isDateFullyBooked(date: Date): boolean {
    const dateString = this.formatDateString(date);
    const appointment = this.occupiedAppointments.find(app => app.date === dateString);
    // A day is fully booked if all hours (9-17) are occupied
    return appointment ? appointment.hours.length >= 9 : false;
  }

  isDateSelected(date: Date): boolean {
    if (!this.selectedDate) return false;
    return date.getDate() === this.selectedDate.getDate() &&
           date.getMonth() === this.selectedDate.getMonth() &&
           date.getFullYear() === this.selectedDate.getFullYear();
  }

  formatDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  selectDay(calendarDay: CalendarDay) {
    if (!calendarDay.isCurrentMonth || calendarDay.isPastDate) return;

    this.selectedDate = calendarDay.date;
    this.selectedHour = null;
    this.generateTimeSlots();
    this.generateCalendar();
  }

  generateTimeSlots() {
    this.timeSlots = [];
    if (!this.selectedDate) return;

    const dateString = this.formatDateString(this.selectedDate);
    const appointment = this.occupiedAppointments.find(app => app.date === dateString);
    const occupiedHours = appointment ? appointment.hours : [];

    // Generate slots from 9 AM to 5 PM (9:00 to 17:00)
    for (let hour = 9; hour <= 17; hour++) {
      const isOccupied = occupiedHours.includes(hour);
      const displayTime = this.formatTimeDisplay(hour);

      this.timeSlots.push({
        hour,
        displayTime,
        isOccupied
      });
    }
  }

  formatTimeDisplay(hour: number): string {
    if (hour === 12) return '12:00 PM';
    if (hour < 12) return `${hour}:00 AM`;
    return `${hour - 12}:00 PM`;
  }

  selectTimeSlot(slot: TimeSlot) {
    if (slot.isOccupied) return;
    this.selectedHour = slot.hour;
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

  makeAppointment() {
    if (!this.selectedDate || this.selectedHour === null) {
      alert('Please select a date and time slot.');
      return;
    }

    const appointmentDate = new Date(this.selectedDate);
    appointmentDate.setHours(this.selectedHour, 0, 0, 0);

    console.log('Appointment requested:', {
      date: this.selectedDate,
      hour: this.selectedHour,
      dateTime: appointmentDate
    });

    // TODO: Send to backend API
    alert(`Appointment confirmed for ${this.selectedDate.toLocaleDateString()} at ${this.formatTimeDisplay(this.selectedHour)}`);

    // Reset selection
    this.selectedDate = null;
    this.selectedHour = null;
    this.timeSlots = [];
    this.generateCalendar();
  }

  canMakeAppointment(): boolean {
    return this.selectedDate !== null && this.selectedHour !== null;
  }
}
