import { CalendarPage } from "./calendar-page.mjs";


describe("CalendarPage static functions", () =>{

  test("Should return correct month name string", () => {
    expect(CalendarPage.getMonthString(2)).toEqual("March");
  });

  test("Should return correct month day count", () => {
    expect(CalendarPage.getDayCount(2028, 1)).toEqual(29);
  });

  test("Should return correct occurrence string", () => {
    expect(CalendarPage.getOccurrenceString(0)).toEqual("first");
  });
});