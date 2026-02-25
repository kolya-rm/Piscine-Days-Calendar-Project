// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };
import { Day} from "./calendar.mjs";

function onLoadWindow() {
  const today = new Date();
  const day = new Day(today.getFullYear(), today.getMonth(), today.getDate());

  console.log(today.getFullYear(), today.getMonth(), today.getDate(), today.getDay());
  console.log(day.getDateString());
}

window.onload = onLoadWindow();
