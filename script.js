const songs = [
    {
        title: "Aavagaman",
        file: "songs/Aavagaman.mp3"
    },
    {
        title: "Bajrang Baanka",
        file: "songs/Bajrang Baanka.mp3"
    },
    {
        title: "Bajrang Baan",
        file: "songs/Bajrang-Baan.mp3"
    },
    {
        title: "Hanuman Aarti",
        file: "songs/Hanuman-Aarti.mp3"
    },
    {
        title: "Hanuman Ashtak",
        file: "songs/Hanuman-Ashtak.mp3"
    },
    {
        title: "Hanuman Chalisa",
        file: "songs/hanuman-chalisa.mp3"
    },
    {
        title: "Hey Kharari",
        file: "songs/Hey Kharari.mp3"
    },
    {
        title: "Hriday Mein Jinke Sitaram",
        file: "songs/Hriday Mein Jinke Sitaram.mp3"
    },
    {
        title: "Jai Hanuman",
        file: "songs/Jai Hanuman.mp3"
    },
    {
        title: "Jai Shri Ram",
        file: "songs/Jai Shri Ram.mp3"
    },
    {
        title: "Maine Tere Hi Bharose",
        file: "songs/Maine Tere Hi Bharose.mp3"
    },
    {
        title: "Mangalmurti Maruti Nandan",
        file: "songs/Mangalmurti Maruti Nandan.mp3"
    },
    {
        title: "Parvati",
        file: "songs/Parvati.mp3"
    },
    {
        title: "Raam Bhajan Ki Or",
        file: "songs/Raam Bhajan Ki Or.mp3"
    },
    {
        title: "Shree Hanuman Stavan",
        file: "songs/Shree Hanuman Stavan.mp3"
    },
    {
        title: "Siyavar Ramchandra Ki Jai",
        file: "songs/Siyavar Ramchandra Ki Jai.mp3"
    },
    {
        title: "Vaishnav Jan To",
        file: "songs/Vaishnav Jan To.mp3"
    }
];

let currentSongIndex = 0;

let shuffleOn = false;
let repeatOn = false;

const audio = document.getElementById("audioPlayer");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");

const songTitle = document.getElementById("songTitle");

const progressBar = document.querySelector(".progress-bar");
const progressFill = document.getElementById("progressFill");

const currentTimeText = document.getElementById("currentTime");
const durationText = document.getElementById("duration");


// ===============================
// LOAD SONG
// ===============================

function loadSong(index) {

    currentSongIndex = index;

    const song = songs[currentSongIndex];

    audio.src = song.file;

    songTitle.textContent = song.title;

    progressFill.style.width = "0%";

    currentTimeText.textContent = "0:00";
    durationText.textContent = "0:00";

}


// ===============================
// PLAY / PAUSE
// ===============================

playBtn.addEventListener("click", () => {

    if (audio.paused) {

        audio.play();

    } else {

        audio.pause();

    }

});


audio.addEventListener("play", () => {

    playBtn.textContent = "⏸";

});


audio.addEventListener("pause", () => {

    playBtn.textContent = "▶";

});


// ===============================
// RANDOM SONG
// ===============================

function getRandomSongIndex() {

    if (songs.length <= 1) {
        return currentSongIndex;
    }

    let randomIndex;

    do {

        randomIndex =
            Math.floor(Math.random() * songs.length);

    } while (randomIndex === currentSongIndex);

    return randomIndex;

}


// ===============================
// NEXT SONG
// ===============================

nextBtn.addEventListener("click", () => {

    if (shuffleOn) {

        currentSongIndex =
            getRandomSongIndex();

    } else {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {

            currentSongIndex = 0;

        }

    }

    loadSong(currentSongIndex);

    audio.play();

});


// ===============================
// PREVIOUS SONG
// ===============================

prevBtn.addEventListener("click", () => {

    if (audio.currentTime > 3) {

        audio.currentTime = 0;

        return;

    }


    currentSongIndex--;

    if (currentSongIndex < 0) {

        currentSongIndex =
            songs.length - 1;

    }

    loadSong(currentSongIndex);

    audio.play();

});


// ===============================
// SHUFFLE
// ===============================

shuffleBtn.addEventListener("click", () => {

    shuffleOn = !shuffleOn;

    shuffleBtn.classList.toggle(
        "active",
        shuffleOn
    );

});


// ===============================
// REPEAT
// ===============================

repeatBtn.addEventListener("click", () => {

    repeatOn = !repeatOn;

    repeatBtn.classList.toggle(
        "active",
        repeatOn
    );

});


// ===============================
// SONG ENDED
// ===============================

audio.addEventListener("ended", () => {

    if (repeatOn) {

        audio.currentTime = 0;

        audio.play();

        return;

    }


    if (shuffleOn) {

        currentSongIndex =
            getRandomSongIndex();

    } else {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {

            currentSongIndex = 0;

        }

    }

    loadSong(currentSongIndex);

    audio.play();

});


// ===============================
// SONG DURATION
// ===============================

audio.addEventListener("loadedmetadata", () => {

    durationText.textContent =
        formatTime(audio.duration);

});


// ===============================
// PROGRESS BAR
// ===============================

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) {
        return;
    }

    const percentage =
        (audio.currentTime / audio.duration) * 100;

    progressFill.style.width =
        percentage + "%";

    currentTimeText.textContent =
        formatTime(audio.currentTime);

});


// ===============================
// SEEK
// ===============================

progressBar.addEventListener("click", (event) => {

    if (!audio.duration) {
        return;
    }

    const rect =
        progressBar.getBoundingClientRect();

    const position =
        event.clientX - rect.left;

    const percentage =
        position / rect.width;

    audio.currentTime =
        percentage * audio.duration;

});


// ===============================
// FORMAT TIME
// ===============================

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {

        return "0:00";

    }

    seconds = Math.floor(seconds);

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        seconds % 60;

    return (
        minutes +
        ":" +
        secs.toString().padStart(2, "0")
    );

}


// ===============================
// FIRST SONG
// ===============================

loadSong(currentSongIndex);