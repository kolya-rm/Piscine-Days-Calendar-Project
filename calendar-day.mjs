export class CalendarDay {
  timestamp = 0;
  occurrence = "";
  description = "";

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

  getWeekDayString() {
    return this.timestamp.toLocaleString("en-US", { weekday: "long" });
  }

  getOccurrence() {
    return this.occurrence;
  }

  getDescription() {
    return this.description;
  }

  isSunday() {
    return this.getWeekDay() === 0;
  }

  getDateString() {
    return `${this.getYear()}-${("" + this.getMonth()).padStart(2, "0")}-${(
      "" + this.getDay()).padStart(2, "0")} week day: ${this.getWeekDay()}`;
  }
}