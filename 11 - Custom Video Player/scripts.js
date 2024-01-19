const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

const play = () => {
  /**
   * Function to play or pause the video player.
   *
   * @returns {void}
   */
  video.paused ? video.play() : video.pause();
};

const updateButton = () => {
  /**
   * Function to update the button text content based on the video's paused state.
   *
   * @returns {void}
   */
  toggle.textContent = video.paused ? "►" : "❚ ❚";
};

const skip = (e) => {
  /**
   * Function to skip the video player to a specific time.
   *
   * @param {Event} e - The click event object.
   * @returns {void}
   */
  video.currentTime += parseFloat(e.target.dataset.skip);
};

const handleRangeUpdate = (e) => {
  /**
   * Function to handle range update for the video player.
   *
   * @param {Event} e - The change event object.
   * @returns {void}
   */
  video[e.target.name] = e.target.value;
};

const handleProgress = () => {
  /**
   * Function to handle the progress of the video player.
   *
   * This function calculates the percentage of the video that has been played and updates the progress bar accordingly.
   *
   * @returns {void}
   */
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

const scrub = (e) => {
  /**
   * Function to scrub the video player to a specific time.
   *
   * @param {Event} e - The mousemove event object.
   * @returns {void}
   */
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

let mousedown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
document.addEventListener("mouseup", () => (mousedown = false));

video.addEventListener("click", play);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", play);

skipButtons.forEach((button) => button.addEventListener("click", skip));

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
