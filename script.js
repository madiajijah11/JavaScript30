function changeIframeSource(newSource) {
  const iframe = document.getElementById("my-iframe");
  iframe.src = newSource;
}

const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

const iframeSources = [
  "01 - JavaScript Drum Kit/index-day1.html",
  "02 - JS and CSS Clock/index-day2.html",
  "03 - CSS Variables/index-day3.html",
  "04 - Array Cardio Day 1/index-day4.html",
  "05 - Flex Panel Gallery/index-day5.html",
  "06 - Type Ahead/index-day6.html",
  "07 - Array Cardio Day 2/index-day7.html",
  "08 - Fun with HTML5 Canvas/index-day8.html",
  "09 - Dev Tools Domination/index-day9.html",
  "10 - Hold Shift and Check Checkboxes/index-day10.html",
  "11 - Custom Video Player/index-day11.html",
  "12 - Key Sequence Detection/index-day12.html",
  "13 - Slide in on Scroll/index-day13.html",
  "14 - JavaScript References VS Copying/index-day14.html",
  "15 - LocalStorage/index-day15.html",
  "16 - Mouse Move Shadow/index-day16.html",
  "17 - Sort Without Articles/index-day17.html",
  "18 - Adding Up Times with Reduce/index-day18.html",
  "19 - Webcam Fun/index-day19.html",
  "20 - Speech Detection/index-day20.html",
  "21 - Geolocation/index-day21.html",
  "22 - Follow Along Link Highlighter/index-day22.html",
  "23 - Speech Synthesis/index-day23.html",
  "24 - Sticky Nav/index-day24.html",
  "25 - Event Capture, Propagation, Bubbling and Once/index-day25.html",
  "26 - Stripe Follow Along Nav/index-day26.html",
  "27 - Click and Drag/index-day27.html",
  "28 - Video Speed Controller/index-day28.html",
  "29 - Countdown Timer/index-day29.html",
  "30 - Whack A Mole/index-day30.html",
];

let currentIframeIndex = 0;

prevButton.addEventListener("click", () => {
  if (currentIframeIndex > 0) {
    currentIframeIndex--;
    changeIframeSource(iframeSources[currentIframeIndex]);
  }
});

nextButton.addEventListener("click", () => {
  if (currentIframeIndex < iframeSources.length - 1) {
    currentIframeIndex++;
    changeIframeSource(iframeSources[currentIframeIndex]);
  }
});

const tableOfContentLink = document.querySelector(
  'a[href="#table-of-content"]'
);
const modal = document.getElementById("modal");

tableOfContentLink.addEventListener("click", (event) => {
  event.preventDefault();
  modal.classList.toggle("show");
});

const listItems = document.querySelectorAll(".menu li a");

listItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    changeIframeSource(iframeSources[index]);
  });
});

const closeButton = document.getElementById("close-button");

closeButton.addEventListener("click", () => {
  modal.classList.toggle("show");
});
