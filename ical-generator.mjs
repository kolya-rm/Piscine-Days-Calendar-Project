import { CalendarPage } from "./calendar-page.mjs";


export class IcalGEnerator {
  startMonth;
  lastMonth;
  commemorableDays = [];


  //region interface
  generateCommemorableDays() {
    let currentMonth = new CalendarPage();
    currentMonth.updateYearMonth(this.startMonth.getFullYear(),this.startMonth.getMonth());

    this.commemorableDays.length = 0;
    while (currentMonth.getTime() <= this.lastMonth.getTime()) {
      this.commemorableDays.push(...currentMonth.getDays().filter(day => day.description));
      currentMonth.changeMonth(1);
    }

    console.log(this.commemorableDays);
  }
  //endregion


  //region getters/setters
  setStartMonth(year, month) {
    this.startMonth = new Date(year, month);
    console.log(this.startMonth.toDateString());
  }

  setLastMonth(year, month) {
    this.lastMonth = new Date(year, ++month);
    console.log(this.lastMonth.toDateString());
  }
  //endregion
}
