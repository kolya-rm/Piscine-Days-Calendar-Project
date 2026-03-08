import commemorativeDays from "./days.json" with { type: "json" };
import { CalendarDay } from "./calendar-day.mjs";


export class CalendarPage {
  static DATE_MIN = new Date("0001-02-01");
  static DATE_MAX = new Date("3000-12-31");
  static YEAR_MAX_LENGTH = this.DATE_MAX.getFullYear().toString().length;
  static MONTH_STRINGS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  static WEEK_DAY_COUNT = 7;
  static OCCURRENCE_STRINGS = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "last",
  ];

  timestamp = 0;
  days = [];

  //regin static
  static getMonthString(month) {
    return CalendarPage.MONTH_STRINGS[month];
  }

  static getDayCount(year, month) {
    return new Date(year, ++month, 0).getDate();
  }

  static getOccurrenceString(index) {
    return CalendarPage.OCCURRENCE_STRINGS[index];
  }
  //endregion


  //region constructor
  constructor() {
    this.timestamp = new Date();
    this.createDays();
  }
  //endregion


  //region interface
  updateMonth(month) {
    this.timestamp.setMonth(month);
    this.validateDate();
    this.createDays();
  }

  updateYear(year) {
    this.timestamp.setFullYear(year);
    this.validateDate();
    this.createDays();
  }

  updateYearMonth(year, month) {
    this.timestamp.setFullYear(year);
    this.timestamp.setMonth(month);
    this.validateDate();
    this.createDays();
  }

  changeMonth(delta) {
    this.timestamp.setMonth(this.timestamp.getMonth() + delta);
    this.validateDate();
    this.createDays();
  }
  //endregion


  //region inner logic
  createDays() {
    this.days.length = 0;
    this.createCurrentMonthDays();
    this.createDirectOrderOccurrences();
    this.createReverseOrderOccurrences();
    this.createCommemorativeDates();
    this.createPreviousMonthDays();
    this.createNextMonthDays();
  }

  createCurrentMonthDays() {
    for (let day = 1; day <= this.getDayCount(); day++) {
      this.days.push(new CalendarDay(this.getYear(), this.getMonth(), day));
    }
  }

  createDirectOrderOccurrences() {
    const days = this.getDays();
    for (let i = 0; i < days.length; i++) {
      let occurrenceIndex = Math.trunc(i / CalendarPage.WEEK_DAY_COUNT);
      days[i].occurrence = CalendarPage.getOccurrenceString(occurrenceIndex);
    }
  }

  createReverseOrderOccurrences() {
    const days = this.getDays();
    const occurrenceString = CalendarPage.getOccurrenceString(CalendarPage.OCCURRENCE_STRINGS.length - 1);
    for (let i = 1; i <= CalendarPage.WEEK_DAY_COUNT; i++) {
      days[days.length - i].occurrence = occurrenceString;
    }
  }

  createCommemorativeDates() {
    for (const day of this.getDays()) {
      for (const commemorativeDay of commemorativeDays) {
        if (
          this.getMonthString() === commemorativeDay.monthName &&
          day.getWeekDayString() === commemorativeDay.dayName &&
          day.getOccurrence() === commemorativeDay.occurrence
        ) {
            day.description = commemorativeDay.name;
          }
      }
    }
  }

  createPreviousMonthDays() {
    let previousMonthDay = CalendarPage.getDayCount(this.getYear(), this.getMonth() - 1);
    let weekDay = this.getDays()[0].getWeekDay();

    while (--weekDay >= 0) {
      this.getDays().unshift(new CalendarDay(this.getYear(), this.getMonth() - 1, previousMonthDay--));
    }
  }

  createNextMonthDays() {
    let nextMonthDay = 1;
    let weekday = this.getDays()[this.getDays().length - 1].getWeekDay();

    while (++weekday < CalendarPage.WEEK_DAY_COUNT) {
      this.getDays().push(
        new CalendarDay(this.getYear(), this.getMonth() + 1, nextMonthDay++),
      );
    }
  }

  validateDate() {
    if (this.timestamp.getTime() < CalendarPage.DATE_MIN.getTime()) {
      this.timestamp.setTime(CalendarPage.DATE_MIN);
    }
    if (this.timestamp.getTime() > CalendarPage.DATE_MAX.getTime()) {
      this.timestamp.setTime(CalendarPage.DATE_MAX);
    }
  }
  //endregion


  //region getters
  getTime() {
    return this.timestamp.getTime();
  }
  
  getYear() {
    return this.timestamp.getFullYear();
  }

  getMonth() {
    return this.timestamp.getMonth();
  }

  getMonthString() {
    return CalendarPage.getMonthString(this.getMonth());
  }

  getDays() {
    return this.days;
  }

  getDayCount() {
    return CalendarPage.getDayCount(this.getYear(), this.getMonth());
  }

  isCurrentMonthDay(day) {
    return (
      this.getYear() === day.getYear() && this.getMonth() === day.getMonth()
    );
  }
  //endregion
}