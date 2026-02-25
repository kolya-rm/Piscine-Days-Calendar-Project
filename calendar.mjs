export class Day {
  timestamp;
  
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
    return this.timestamp.getDate()
  }

  getWeekDay() {
    return this.timestamp.getDay();
  }

  getDateString() {
    return `${this.getYear()}-${("" + this.getMonth()).padStart(2, "0")}-${
        ("" + this.getDay()).padStart(2, "0")} week day: ${this.getWeekDay()}`;
  }
}