const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");
var x = document.getElementById("CapstoneAudio"); 
var y = document.getElementById("CapstoneAudio2");
var z = [] 

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

draggableElements.forEach(elem => {
  elem.addEventListener("dragstart", dragStart); 
});

droppableElements.forEach(elem => {
  elem.addEventListener("dragenter", dragEnter); 
  elem.addEventListener("dragover", dragOver); 
  elem.addEventListener("dragleave", dragLeave); 
  elem.addEventListener("drop", drop); 
});

function playAudio() { 
  x.play(); 
} 

function playAudio2() { 
  y.play(); 
} 

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function playAllAudio() {
  const filteredArray = z.filter(element => element!=0);
  console.log(filteredArray);
  for (element of filteredArray) {
    if (element === 1) {
      x.play();
      await sleep(x.duration);
    }
    else if (element === 2) {
      y.play();
      await sleep(y.duration);
    }
  }
  // filteredArray.forEach(
  //   async element => {
  //     if (element === 1) {
  //       x.play();
  //       await sleep(x.duration);
  //     }
  //     else if (element === 2) {
  //       y.play();
  //       await sleep(y.duration);
  //     }
  //   }
  // )
}
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
  event.preventDefault();
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
  else {
    event.target.classList.remove("dropped");
    event.target.style.backgroundColor = "white";
    event.target.removeChild(event.target.firstChild);
  };
}

function drop(event) {
  event.preventDefault(); 
  event.target.classList.remove("droppable-hover");
  const draggableElementData = event.dataTransfer.getData("text"); 
  const droppableElementData = event.target.getAttribute("data-draggable-id");
  const droppableElementId = event.target.getAttribute("id");
  const matchingDroppableElement = document.getElementById(((Number(droppableElementId)+10)%20).toString());
  // console.log(((Number(event.target.getAttribute("id"))+10)%20).toString()).toString());
  const isCorrectMatching = draggableElementData === droppableElementData;
  if(isCorrectMatching) {
    // console.log("running cond");
    const draggableElement = document.getElementById(draggableElementData);
    event.target.classList.add("dropped");
    event.target.style.backgroundColor = window.getComputedStyle(draggableElement).color;
    // draggableElement.classList.add("dragged");
    // draggableElement.setAttribute("draggable", "false");
    event.target.insertAdjacentHTML("afterbegin", `<i class ="fas fa-${draggableElementData} " draggable="true"></i>`);
    z[Number(droppableElementId)%10-1]=Math.floor(Number(droppableElementId)/10+1);
    // console.log(z);
    if(matchingDroppableElement.classList.contains("dropped")) {
      matchingDroppableElement.classList.remove("dropped");
      matchingDroppableElement.style.backgroundColor = "white";
      matchingDroppableElement.removeChild(matchingDroppableElement.firstChild);
    };
  }
}