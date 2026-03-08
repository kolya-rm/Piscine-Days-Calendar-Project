import { CalendarDay } from "./calendar-day.mjs";
import { CalendarPage } from "./calendar-page.mjs";


describe("CalendarPage static functions", () =>{
  test("Should return correct month day count", () => {
    expect(CalendarPage.getDayCount(2028, 1)).toEqual(29);
  });
});


describe("CalendarPage class instance getter functions", () =>{
  let calendarPage = new CalendarPage(2026, 2);
  
  test("Should return correct year", () => {
    expect(calendarPage.getYear()).toEqual(2026);
  });

  test("Should return correct month", () => {
    expect(calendarPage.getMonth()).toEqual(2);
  });

  test("Should return correct month name string", () => {
    expect(calendarPage.getMonthString()).toEqual("March");
  });

  test("Should return correct month day count", () => {
    expect(calendarPage.getDayCount()).toEqual(31);
  });

  test("Should return true for correct day", () => {
    expect(calendarPage.isCurrentMonthDay(new CalendarDay(2026, 2, 19))).toEqual(true);
  });

  test("Should return false for correct day", () => {
    expect(
      calendarPage.isCurrentMonthDay(new CalendarDay(2026, 5, 19)),
    ).toEqual(false);
  });
});


describe("CalendarPage class instance month manipulate functions", () => {
  let calendarPage = new CalendarPage(2026, 2);
  
  test("Should correctly update month", () => {
    calendarPage.updateMonth(4);

    expect(calendarPage.getYear()).toEqual(2026);
    expect(calendarPage.getMonth()).toEqual(4);
  });

  test("Should correctly update year", () => {
    calendarPage.updateYear(2027);

    expect(calendarPage.getYear()).toEqual(2027);
    expect(calendarPage.getMonth()).toEqual(4);
  });
  
  test("Should correctly change month by 1", () => {
    calendarPage.changeMonth(1);

    expect(calendarPage.getYear()).toEqual(2027);
    expect(calendarPage.getMonth()).toEqual(5);
  });

  test("Should correctly change month by -1", () => {
    calendarPage.changeMonth(-1);

    expect(calendarPage.getYear()).toEqual(2027);
    expect(calendarPage.getMonth()).toEqual(4);
  });
});


describe("CalendarPage class commemorative days create tests", () => {
  test("Should correctly set Ada Lovelace day in the year 2026", async () => {
    let october2026 = new CalendarPage();
    await october2026.updateMonth(9);
    let adaLovelaceDay = october2026.getDays()[16];
  
    expect(adaLovelaceDay.getYear()).toEqual(2026);
    expect(adaLovelaceDay.getMonth()).toEqual(9);
    expect(adaLovelaceDay.getDay()).toEqual(13);
    expect(adaLovelaceDay.getWeekDayString()).toEqual("Tuesday");
    expect(adaLovelaceDay.getName()).toEqual("Ada Lovelace Day");
  });
  
  test("Should correctly set International Binturong Day day", async () => {
    let may2267 = new CalendarPage();
    await may2267.updateYear(2267);
    await may2267.updateMonth(4);
    let internationalBinturongDay = may2267.getDays()[13];

    expect(internationalBinturongDay.getYear()).toEqual(2267);
    expect(internationalBinturongDay.getMonth()).toEqual(4);
    expect(internationalBinturongDay.getDay()).toEqual(11);
    expect(internationalBinturongDay.getWeekDayString()).toEqual("Saturday");
    expect(internationalBinturongDay.getName()).toEqual(
      "International Binturong Day",
    );
  });
});
