const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    video.srcObject = stream;
    video.play();
  } catch (err) {
    console.error(err);
  }
};

const paintToCanvas = () => {
  const { videoWidth: width, videoHeight: height } = video;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    ctx.globalAlpha = 0.1;
    pixels = greenScreen(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 16);
};

const takePhoto = () => {
  snap.currentTime = 0;
  snap.play();
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "handsome");
  link.innerHTML = `<img src="${data}" alt="Handsome Person" />`;
  strip.insertBefore(link, strip.firstChild);
};

const redEffect = (pixels) => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] += 100; // red
    pixels.data[i + 1] -= 50; // green
    pixels.data[i + 2] *= 0.5; // blue
  }
  return pixels;
};

const rgbSplit = (pixels) => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i]; // red
    pixels.data[i + 100] = pixels.data[i + 1]; // green
    pixels.data[i - 150] = pixels.data[i + 2]; // blue
  }
  return pixels;
};

const greenScreen = (pixels) => {
  const levels = {};
  document.querySelectorAll(".rgb input").forEach((input) => {
    levels[input.name] = input.value;
  });
  for (let i = 0; i < pixels.data.length; i += 4) {
    const red = pixels.data[i]; // red
    const green = pixels.data[i + 1]; // green
    const blue = pixels.data[i + 2]; // blue
    const alpha = pixels.data[i + 3]; // alpha
    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
};

getVideo();

video.addEventListener("canplay", paintToCanvas);
