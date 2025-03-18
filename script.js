const pianoKeys = document.querySelectorAll(".piano-keys .key");

const songs = {
    "Twinkle Twinkle": ["a", "a", "g", "g", "f", "f", "g", "e", "e", "d", "d", "c", "c"],
    "Mary Had a Little Lamb": ["d", "s", "a", "s", "d", "d", "d", "s", "s", "s", "d", "g", "g"],
    "Happy Birthday": ["a", "a", "s", "a", "f", "d", "a", "a", "s", "a", "g", "f"],
    "Ode to Joy": ["f", "f", "g", "h", "h", "g", "f", "d", "d", "s", "s", "d", "f"],
    "Jingle Bells": ["g", "g", "g", "g", "g", "g", "g", "d", "f", "f", "f", "d", "s"],
    "Chopsticks": ["s", "s", "d", "d", "f", "f", "d", "d", "s", "s"],
    "Für Elise": ["d", "s", "d", "s", "d", "j", "s", "g", "g", "d", "g", "d", "j"],
    "Canon in D": ["s", "a", "j", "f", "g", "s", "j", "f", "g", "s", "a", "j", "g"],
    "Let It Be": ["k", "d", "h", "f", "k", "d", "f", "k", "d", "f"],
    "Hallelujah": ["k", "e", "s", "e", "k", "e", "h", "k", "h", "e", "f", "s", "e"]
};


let currentSong = [];
let currentNoteIndex = 0;
let lessonActive = false;

const startLesson = () => {
    const songName = document.getElementById("song-list").value;
    if (!songName) {
        alert("Please select a song!");
        return;
    }

    console.log("Starting lesson for:", songName);
    currentSong = songs[songName];
    currentNoteIndex = 0;
    lessonActive = true;
    
    highlightNextKey();
};

const highlightNextKey = () => {
    document.querySelectorAll(".key").forEach(key => key.classList.remove("highlight"));

    if (currentNoteIndex < currentSong.length) {
        const nextKey = document.querySelector(`[data-key="${currentSong[currentNoteIndex]}"]`);
        if (nextKey) {
            nextKey.classList.add("highlight");
        } else {
            console.error("Key not found for:", currentSong[currentNoteIndex]);
        }
    } else {
        lessonActive = false;
    }
};


const handleUserPress = (key) => {
    if (!lessonActive) return;

    if (currentNoteIndex < currentSong.length && key === currentSong[currentNoteIndex]) {
        playTune(key);
        currentNoteIndex++;
        highlightNextKey();

        if (currentNoteIndex === currentSong.length) {
            lessonActive = false;
            setTimeout(() => alert("🎉 You completed the song!"), 200);
        }
    } else {
        console.warn("Incorrect key pressed:", key);
    }
};

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;
    audio.play();
    
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    if (clickedKey) {
        clickedKey.classList.add("active");
        setTimeout(() => clickedKey.classList.remove("active"), 150);
    } else {
        console.error("No key found for:", key);
    }
};

document.getElementById("start-song").addEventListener("click", startLesson);
document.addEventListener("keydown", (e) => handleUserPress(e.key));

pianoKeys.forEach(key => {
    key.addEventListener("click", () => handleUserPress(key.dataset.key));
});

const volumeSlider = document.querySelector(".volume-slider input");
const keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [], audio = new Audio("tunes/a.wav");

const handleVolume = (e) => {
    audio.volume = e.target.value;
};

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
};

const pressedKey = (e) => {
    if (allKeys.includes(e.key)) playTune(e.key);
};

keysCheckbox.addEventListener("input", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
