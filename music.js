const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const forwardButton = document.querySelector(".controls button.forward");
const backwardButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");

const songs = [
  {
    title: "song 1",
    name: "libre de droit",
    source: "piste1.mp3",
  },
  {
    title: "song2",
    name: "libre de droit",
    source: "piste2.mp3",
  },
  {
    title: "song3",
    name: "libre de droit",
    source: "piste3.mp3",
  },
  {
    title: "song4",
    name: "libre de droit",
    source: "piste4.mp3",
  },
  {
    title: "song5",
    name: "libre de droit",
    source: "piste5.mp3",
  },
  {
    title: "song6",
    name: "libre de droit",
    source: "piste6.mp3",
  },
  {
    title: "song7",
    name: "libre de droit",
    source: "piste7.mp3",
  },
];

let currentSongIndex = 0;
let swiper;

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;

  song.addEventListener("loadeddata", function () {
    if (!song.paused) {
      playSong();
    }
  });

  song.addEventListener("error", function (error) {
    console.error("Error loading song:", error);
  });
}

song.addEventListener("timeupdate", function () {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

song.addEventListener("loadedmetadata", function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
}

function playSong() {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
}

function playPause() {
  if (song.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", function () {
  song.currentTime = progress.value;
});

progress.addEventListener("change", function () {
  playSong();
});

forwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex);
});

backwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex);
});

updateSongInfo();

swiper = new Swiper(".swiper", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: 0,
  slidesPerView: "auto",
  allowTouchMove: false,
  spaceBetween: 40,
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".forward",
    prevEl: ".backward",
  },
  on: {
    slideChange: function () {
      currentSongIndex = this.realIndex;
      updateSongInfo();
    },
  },
});