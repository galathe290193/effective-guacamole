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
    title: "Piste 1",
    name: "libre de droit",
    source: "piste1.mp3",
  },
  {
    title: "Piste 2",
    name: "libre de droit",
    source: "piste2.mp3",
  },
  {
    title: "Piste 3",
    name: "libre de droit",
    source: "piste3.mp3",
  },
  {
    title: "Piste 4",
    name: "libre de droit",
    source: "piste4.mp3",
  },
  {
    title: "Piste 5",
    name: "libre de droit",
    source: "piste5.mp3",
  },
  {
    title: "Piste 6",
    name: "libre de droit",
    source: "piste6.mp3",
  },
  {
    title: "Piste 7",
    name: "libre de droit",
    source: "piste7.mp3",
  },
];

let currentSongIndex = 0;

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

  // Mettre à jour la diapositive active dans le carrousel Swiper
  swiper.slideTo(currentSongIndex);
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

  // Mettre à jour la diapositive active dans le carrousel Swiper
  swiper.slideTo(currentSongIndex);
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
  if (!song.paused) {
    playSong();
  }
});

backwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  if (!song.paused) {
    playSong();
  }
});

updateSongInfo();

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: 0,  // Démarrez avec la première diapositive
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
      if (this.isEnd) {
        this.slideTo(0);  // Faites glisser vers la première diapositive
      }
    },
  },
});