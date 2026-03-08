import { IcalGenerator } from "./ical-generator.mjs";

describe("Commemorable day generator test", () =>{
  
  const generator = new IcalGenerator();

  test ("Should return 1 for period of 1 month", () => {
    generator.setStartMonth(2026, 3);
    generator.setLastMonth(2026, 3);

    expect(generator.getLastMonth().getMonth() - generator.getStartMonth().getMonth()).toEqual(1);
  });

  test("Should return 5 for current 'days.json' file and 1 year", async () =>
  {
    generator.setStartMonth(2026, 0);
    generator.setLastMonth(2026, 11);
    await generator.collect();
    expect(generator.getCommemorativeDays().length).toEqual(5);
  })
});
