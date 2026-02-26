export class Day {
  timestamp = 0;

  constructor(year, month, day) {
    this.timestamp = new Date();
    
    this.timestamp.setFullYear(year);
    this.timestamp.setMonth(month);
    this.timestamp.setDate(day);
  }

  getYear() {
    return this.timestamp.getFullYear();
  }

  getMonth() {
    return this.timestamp.getMonth();
  }

  getDay() {
    return this.timestamp.getDate();
  }

  getWeekDay() {
    return this.timestamp.getDay();
  }

  isSunday() {
    return this.getWeekDay() === 0;
  }

  getDateString() {
    return `${this.getYear()}-${("" + this.getMonth()).padStart(2, "0")}-${(
      "" + this.getDay()
    ).padStart(2, "0")} week day: ${this.getWeekDay()}`;
  }
}

export class CalendarPage {
  timestamp = 0;
  days = [];

  constructor(year, month) {
    this.timestamp  = new Date();
    
    this.timestamp.setFullYear(year);
    this.timestamp.setMonth(month);

    this.createDays();
  }

  createDays() {
    this.createCurrentMonthDays();
    this.createPreviousMonthDays();
    this.createNextMonthDays();
  }

  createCurrentMonthDays() {
    for (let day = 1; day <= this.getDayCount(); day++) {
      this.days.push(new Day(this.getYear(), this.getMonth(), day));
    }
  }

  createPreviousMonthDays() {
    let previousMonthDay = CalendarPage.getDayCount(this.getYear(), this.getMonth() - 1);
    let weekDay = this.getDays()[0].getWeekDay();
  
    while (--weekDay >= 0) {
      this.getDays().unshift(new Day(this.getYear(), this.getMonth() - 1, previousMonthDay--));
    }
  }

  createNextMonthDays() {
    let nextMonthDay = 1;
    let weekday = this.getDays()[this.getDays().length - 1].getWeekDay();

    while (++weekday <= 6) {
      this.getDays().push(new Day(this.getYear(), this.getMonth() + 1, nextMonthDay++));
    }
  }

  getYear() {
    return this.timestamp.getFullYear();
  }

  getMonth() {
    return this.timestamp.getMonth();
  }

  getDays() {
    return this.days;
  }

  getDayCount() {
    return CalendarPage.getDayCount(this.getYear(), this.getMonth());
  }

  static getDayCount(year, month) {
    return 33 - new Date(year, month, 33).getDate();
  }
}