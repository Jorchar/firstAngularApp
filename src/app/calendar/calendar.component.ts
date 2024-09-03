import {
  Component, inject,
  Inject,
  OnInit,
  signal
} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats, provideNativeDateAdapter} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {HighlightDateDirective} from "../highlight-date.directive";
import { PlantItem } from "../plantItem";
import {ActivatedRoute} from "@angular/router";
import {SafeStyle} from "@angular/platform-browser";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import {GlobalErrorHandlerService} from "../global-error-handler.service";

  interface CalendarCellData {
    cellId: number;
    date: Date,
    icon: boolean,
    plants: PlantItem[],
    isOpen: boolean,
    currentStyle?: SafeStyle,
    closedStyle?: SafeStyle,
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    CommonModule,
    HighlightDateDirective
  ],
  standalone: true,
  animations: [
    trigger("openClosed", [
      transition("open => closed", [
        animate(
          '0.3s',
          keyframes([
            style({
              'padding': '30px',
              'height': '400px',
              'width': '300px',
              'top': 'calc(50% - 250px)',
              'left': 'calc(50% - 150px)'
            }),
            style({
              'padding': '0px',
              'height': '*',
              'width': '*',
              'top': '*',
              'left': '*'
            })
          ])
        )
      ]),
      transition("closed => open", [
        animate(
          '0.3s',
          keyframes([
            style({
              'padding': '0px',
              'height': '*',
              'width': '*',
              'top': '*',
              'left': '*'
            }),
            style({
              'padding': '30px',
              'height': '400px',
              'width': '300px',
              'top': 'calc(50% - 250px)',
              'left': 'calc(50% - 150px)'
            }),
          ])
        )
      ])
    ])
  ]
})
export class CalendarComponent implements OnInit{
  plantItemsList: PlantItem[] = [];
  lastExpandedCellId: number | undefined;
  globalErrorHandler: GlobalErrorHandlerService = inject(GlobalErrorHandlerService);

  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarCellsData: Array<CalendarCellData> = new Array(42);
  firstDateOfMonth = new Date();

  readonly periodLabel = signal('');
  showCalendar = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _dateAdapter: DateAdapter<Date>,
    @Inject(MAT_DATE_FORMATS) public _dateFormats: MatDateFormats
  ) {
    this.activatedRoute.data.subscribe(({plantItemsList}) =>{
      if(plantItemsList === null){
        this.globalErrorHandler.errorHandle("Error fetching plants details");
        this.plantItemsList = [];
      }else{
        this.plantItemsList = plantItemsList;
      }
      })
    this.firstDateOfMonth.setDate(1);
  }

  ngOnInit(): void {
    this.updateCalendar();
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  plantToBeWatered(date: Date): PlantItem[] {
    let plantsToBeWatered: PlantItem[] = [];
    this.plantItemsList.forEach(plantItem => {
      let nextWateredDate = this._dateAdapter.addCalendarDays(new Date(plantItem.wateredDate), plantItem.daysBetweenHydrate);
      if(this.isSameDay(date, nextWateredDate)){
        plantsToBeWatered.push(plantItem);
      }
    })
    return plantsToBeWatered;
  }

  private updateCalendar() {
    this.updateMonthLabel();
    let firstViewedDay = this._dateAdapter.addCalendarDays(this.firstDateOfMonth, -this._dateAdapter.getDayOfWeek(this.firstDateOfMonth));
    let cellDate = new Date(firstViewedDay);
    let i = 0;
    while (i < 42) {
      let plantToBeWatered = this.plantToBeWatered(cellDate);
      this.calendarCellsData[i] = {
        cellId: i,
        date: new Date(cellDate),
        icon: plantToBeWatered.length>0,
        plants: plantToBeWatered,
        isOpen: false
      };
      cellDate = this._dateAdapter.addCalendarDays(cellDate, 1);
      i++;
    }
  }

  private reInitCalendarComponent() {
    this.showCalendar = false;
    setTimeout(() => {
      this.showCalendar = true;
    })
  }

  updateMonthLabel() {
    this.periodLabel.set(
      this._dateAdapter
        .format(this.firstDateOfMonth, this._dateFormats.display.monthYearLabel)
        .toLocaleUpperCase(),
    );
  }

  previousClicked() {
    this.firstDateOfMonth = this._dateAdapter.addCalendarMonths(this.firstDateOfMonth, -1);
    this.updateCalendar();
    this.reInitCalendarComponent();
  }

  nextClicked() {
    this.firstDateOfMonth = this._dateAdapter.addCalendarMonths(this.firstDateOfMonth, 1);
    this.updateCalendar();
    this.reInitCalendarComponent();
  }

  getCellData(cell: number): CalendarCellData {
    return this.calendarCellsData[cell];
  }

  cellClicked(el: HTMLDivElement, cellId: number) {
    if((this.calendarCellsData[cellId].currentStyle != undefined) || (this.calendarCellsData[cellId].plants.length == 0)) {
      return;
    }
    if(this.lastExpandedCellId !== undefined){
      this.closeDetails(this.lastExpandedCellId)
    }
    this.lastExpandedCellId = cellId;
    this.calendarCellsData[cellId].closedStyle = {
      position: 'absolute',
      top: el.offsetTop.toString()+'px',
      left: el.offsetLeft.toString()+'px',
      width: el.offsetWidth.toString()+'px',
      height: el.offsetHeight.toString()+'px',
      zIndex: 5
    }
    this.calendarCellsData[cellId].currentStyle = this.calendarCellsData[cellId].closedStyle;
    this.calendarCellsData[cellId].isOpen = true;
  }

  closeDetails(cellId: number, event?: Event){
    if(event){
      event.stopPropagation();
    }
    this.lastExpandedCellId = undefined;
    this.calendarCellsData[cellId].currentStyle = this.calendarCellsData[cellId].closedStyle;
    this.calendarCellsData[cellId].isOpen = false;
  }

  dateDetailsAnimDone(isOpen: boolean, cellId: number) {
    if(isOpen){
      this.calendarCellsData[cellId].currentStyle = {
        position: 'absolute',
        padding: '30px',
        height: '400px',
        width: '300px',
        top: 'calc(50% - 250px)',
        left: 'calc(50% - 150px)',
        zIndex: 5
      }
    }else{
      this.calendarCellsData[cellId].currentStyle = undefined;
    }
  }
}

