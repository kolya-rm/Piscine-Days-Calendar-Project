import { CalendarPage } from "./calendar-page.mjs";


const CALENDAR_PAGE = new CalendarPage();

const YEAR_INPUT = document.getElementById("year-input");
const MONTH_SELECT = document.getElementById("month-select");
const BACKWARD_BUTTON = document.getElementById("month-backward-button");
const MONTH_TEXT = document.querySelector("#month-text h1");
const FORWARD_BUTTON = document.getElementById("month-forward-button");
const CALENDAR_DAY_CONTAINER = document.getElementById("calendar-body");

const DAY_TEMPLATE = document.getElementById("day-template");

const MODAL_DESCRIPTION_WINDOW = document.getElementById("modal-description");


//region prepare
function setupPageElements() {
  YEAR_INPUT.addEventListener("change", async () => {
    await CALENDAR_PAGE.updateYear(YEAR_INPUT.value);
    render();
  });
  YEAR_INPUT.addEventListener("input", () => {
    if(YEAR_INPUT.value.length > CalendarPage.YEAR_MAX_LENGTH) {
      YEAR_INPUT.value = YEAR_INPUT.value.slice(0, CalendarPage.YEAR_MAX_LENGTH);
    }
  });

  for (let month = 0; month < CalendarPage.MONTH_IN_YEAR; month++) {
    const date = new Date();
    date.setMonth(month);
    MONTH_SELECT.add(new Option(date.toLocaleString("en-US", { month: "long" }), month));
  }
  MONTH_SELECT.addEventListener("change", async () => {
    await CALENDAR_PAGE.updateMonth(MONTH_SELECT.value);
    render();
  });

  BACKWARD_BUTTON.addEventListener("click", async () => {
    await CALENDAR_PAGE.changeMonth(-1);
    render();
  });

  FORWARD_BUTTON.addEventListener("click", async () => {
    await CALENDAR_PAGE.changeMonth(1);
    render();
  });

  MODAL_DESCRIPTION_WINDOW.addEventListener("click", closeModalDescriptionWindow);
}
//endregion


//region render
function render() {
  renderYearInput();
  renderMonthSelect();
  renderMonthText();
  renderCalendarDays();
}

function renderYearInput() {
  YEAR_INPUT.value = CALENDAR_PAGE.getYear();
}

function renderMonthSelect() {
  MONTH_SELECT.value = CALENDAR_PAGE.getMonth();
}

function renderMonthText() {
  MONTH_TEXT.innerText = `${CALENDAR_PAGE.getMonthString()} ${CALENDAR_PAGE.getYear()}`;
}

function renderCalendarDays() {
  CALENDAR_DAY_CONTAINER.innerHTML = "";

  for (const day of CALENDAR_PAGE.getDays()) {
    renderCalendarDay(day);
  }
}

function renderCalendarDay(day) {
  const dayElement = DAY_TEMPLATE.content.cloneNode(true);

  dayElement.querySelector(".day-number p").innerText = day.getDay();
  if (day.isSunday()) {
    dayElement.querySelector(".day .day-number").classList.add("day-sunday");
  }
  if (!CALENDAR_PAGE.isCurrentMonthDay(day)) {
    dayElement.querySelector(".day").classList.add("day-non-current-month");
  }
  if (day.getName()) {
    dayElement.querySelector(".day-description p").innerText = day.getName();
    dayElement.querySelector(".day").style.cursor = "pointer";
    dayElement.querySelector(".day").dataset.date = 
      `${day.getDay()} ${day.getMonthString()} ${day.getYear()}`;
    dayElement.querySelector(".day").dataset.name = day.getName();
    dayElement.querySelector(".day").dataset.content = day.getDescription();
    dayElement.querySelector(".day").addEventListener("click", openModalDescriptionWindow);
  }
  CALENDAR_DAY_CONTAINER.appendChild(dayElement);
}
//endregion


//region event listeners
function onLoadWindow() {
  setupPageElements();
  render();
}
//endregion


//region inner logic
async function openModalDescriptionWindow(event) {
  MODAL_DESCRIPTION_WINDOW.querySelector("#modal-description-date h1")
    .innerText = event.target.dataset.date;
  MODAL_DESCRIPTION_WINDOW.querySelector("#modal-description-name p")
    .innerText = event.target.dataset.name;
  MODAL_DESCRIPTION_WINDOW.querySelector("#modal-description-content p")
    .innerText = event.target.dataset.content;
  MODAL_DESCRIPTION_WINDOW.style.display = "block";
}

function closeModalDescriptionWindow() {
  MODAL_DESCRIPTION_WINDOW.style.display = "none";
}
//endregion


window.onload = onLoadWindow();
window.onbeforeunload =closeModalDescriptionWindow();
