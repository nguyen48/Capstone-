const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");
 
// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
// get the audio element
const audio_440 = document.querySelector("audio");
// pass it into the audio context
const track_440 = audioContext.createMediaElementSource(audio_440);
// connect audio from the audio source/input node to the destination
track_440.connect(audioContext.destination);
// Select our play button
const playButton = document.querySelector("button");
playButton.addEventListener(
  "click",
  () => {
    // Check if context is in suspended state (autoplay policy)
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    // Play or pause track depending on state
    if (playButton.dataset.playing === "false") {
      audio_440.play();
      playButton.dataset.playing = "true";
    } else if (playButton.dataset.playing === "true") {
      audio_440.pause();
      playButton.dataset.playing = "false";
    }
  },
  false
);
//end playing
audio_440.addEventListener(
  "ended",
  () => {
    playButton.dataset.playing = "false";
  },
  false
);



draggableElements.forEach(elem => {
  elem.addEventListener("dragstart", dragStart); 
});

droppableElements.forEach(elem => {
  elem.addEventListener("dragenter", dragEnter); 
  elem.addEventListener("dragover", dragOver); 
  elem.addEventListener("dragleave", dragLeave); 
  elem.addEventListener("drop", drop); 
});


function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id); }



function dragEnter(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if(!event.target.classList.contains("dropped")) {
    event.preventDefault(); 
  }
}

function dragLeave(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

function drop(event) {
  event.preventDefault(); 
  event.target.classList.remove("droppable-hover");
  const draggableElementData = event.dataTransfer.getData("text"); 
  const droppableElementData = event.target.getAttribute("data-draggable-id");
  const isCorrectMatching = draggableElementData === droppableElementData;
  if(isCorrectMatching) {
    const draggableElement = document.getElementById(draggableElementData);
    event.target.classList.add("dropped");
    event.target.style.backgroundColor = window.getComputedStyle(draggableElement).color;
    // draggableElement.classList.add("dragged");
    // draggableElement.setAttribute("draggable", "false");
    event.target.insertAdjacentHTML("afterbegin", `<i class="fas fa-${draggableElementData}"></i>`);
  }
}