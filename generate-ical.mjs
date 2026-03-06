 import { IcalGEnerator } from "./ical-generator.mjs";


 let generator = new IcalGEnerator();

 generator.setStartMonth(2025, 0);
 generator.setLastMonth(2026, 11);

 generator.generateCommemorableDays();