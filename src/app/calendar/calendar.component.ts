import {Component, Inject, OnInit, signal} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats, provideNativeDateAdapter} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";

interface CalendarDay {
  date: Date,
  icons: string
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  standalone: true
})
export class CalendarComponent implements OnInit{
  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  dates: Array<CalendarDay> = new Array(42);
  private currentDate = new Date();

  readonly periodLabel = signal('');

  constructor(
    private _dateAdapter: DateAdapter<Date>,
    @Inject(MAT_DATE_FORMATS) public _dateFormats: MatDateFormats,
  ) {
    this.currentDate.setDate(1);
  }

  ngOnInit(): void {
    this.periodLabel.set(
      this._dateAdapter
        .format(this.currentDate, this._dateFormats.display.monthYearLabel)
        .toLocaleUpperCase(),
    );
    let firstViewedDay = this._dateAdapter.addCalendarDays(this.currentDate, -this._dateAdapter.getDayOfWeek(this.currentDate)+1);
    let i = 0;
    while (i < 42) {
      this.dates[i] = {
        date: new Date(firstViewedDay),
        icons: "test"
      };
      firstViewedDay.setDate(firstViewedDay.getDate()+1);
      i++;
    }
  }

  previousClicked() {
    this.currentDate = this._dateAdapter.addCalendarMonths(this.currentDate, -1);
    this.ngOnInit();
  }

  nextClicked() {
    this.currentDate = this._dateAdapter.addCalendarMonths(this.currentDate, 1);
    this.ngOnInit();
  }

  getCellDate(cell: number): CalendarDay {
    return this.dates[cell];
  }
}

