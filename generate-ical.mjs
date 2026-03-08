import { IcalGenerator } from "./ical-generator.mjs";

let generator = new IcalGenerator();

generator.setStartMonth(2020, 0);
generator.setLastMonth(2021, 11);

await generator.collect();
generator.print();
