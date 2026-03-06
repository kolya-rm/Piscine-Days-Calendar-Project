import { IcalGenerator } from "./ical-generator.mjs";

let generator = new IcalGenerator();

generator.setStartMonth(2025, 0);
generator.setLastMonth(2026, 11);

generator.collect();
generator.print();
