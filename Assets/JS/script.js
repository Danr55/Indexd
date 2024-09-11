const timerButton = document.querySelector(`.button`)
const timerBox = document.getElementById(`countDownBox`)
const timerButton2 = document.getElementById(`timerButton`)
const timerButton3 = document.querySelector(`.resetButton`)
let timeSet = 0;
let timerRunning = false;
let time;

timerButton.addEventListener(`click`, function(event) {
    event.preventDefault();

    if (!timerRunning) {
        timerRunning = true;
        time = setInterval(() => {
            let hours = Math.floor(timeSet / 3600);
            let minutes = Math.floor((timeSet % 3600) / 60);
            let seconds = timeSet % 60;
            let timeFormat =
                String(hours).padStart(2, `0`) + ":"+
                String(minutes).padStart(2, `0`) + ":"+
                String(seconds).padStart(2, '0');

            timerBox.textContent = timeFormat;
            timeSet++;
        }, 1000);
    } else {
        timerRunning = false;
        clearInterval(time);
    }

    

});

timerButton2.addEventListener(`click`, function(event){
    event.preventDefault();
    if (timerRunning) {
        timerRunning = false;
        clearInterval(time);
    }

});

timerButton3.addEventListener(`click`, function(event){
    event.preventDefault();
    if (timerRunning) {
        clearInterval(time);
        timerRunning = false;
    }
        timeSet = 0;
        
        let hours = Math.floor(timeSet / 3600);
            let minutes = Math.floor((timeSet % 3600) / 60);
            let seconds = timeSet % 60;
            let timeFormat =
                String(hours).padStart(2, `0`) + ":"+
                String(minutes).padStart(2, `0`) + ":"+
                String(seconds).padStart(2, '0');

            timerBox.textContent = timeFormat;
    

});

// This will close the welcome modal and prompt the card and deck creator modal to open//
const welcomeModal = document.getElementById('welcomeModal'); //Get modal element

const startButton = document.getElementById('startButton'); //Get start button

window.onload = function(){
    welcomeModal.style.display = 'flex'; //Displays the welcome modal when the page loads
    console.log('Page has loaded');
}; 

startButton.onclick = function(){
    welcomeModal.style.display = 'none'; //When the start button is clicked the welcome modal will close
};

startButton.addEventListener('click', openModal) 

//This will open and close the card and deck creator modal
const modal = document.getElementById('deckModal'); //Get modal element
const modalBtn = document.getElementById('modalBtn'); //Get modal button
const closeBtn = document.getElementById('closeBtn'); //Get close button

function openModal(){
    modal.style.display = 'block';
}
modalBtn.addEventListener('click', openModal); // When clicking the create deck button it will open a modal.

function closeModal(){
    modal.style.display = 'none';
}

closeBtn.addEventListener('click', closeModal); // When clicking this will close the modal.

// Close the modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
  });
  
  // Close the modal when pressing the "Escape" key
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
  });


//This will continue the modal to add more questions and answers
const addMoreBtn = document.getElementById('addMoreBtn');
const createDeck = document.getElementsByClassName('createDeck');
const finishDeck = document.getElementsByClassName('completeBtn');
const deckNameWindow = document.getElementsByClassName('modal-hidden');

let singleDeck = [];    // array for index cards
let decks = [];     // array for decks

addMoreBtn.addEventListener('click', function(event) {  //This is the button for adding indexcards to an array and storing them in local storage.
    event.preventDefault();

    let questionEntry = document.getElementById('questionContent');
    let answerEntry = document.getElementById('answerContent');
    

    let indexCard = {
        question: questionEntry.value.trim(),
        answer: answerEntry.value.trim()
    };

    singleDeck.push(indexCard);

    questionEntry.value = '';
    answerEntry.value = '';

    localStorage.setItem('singleDeck', JSON.stringify(singleDeck));
    
    return singleDeck;
});



//Function to set deck onto navbar once deck has been created
const sideBarDecks = document.getElementById('multipleDecks');
const completeDeck = document.getElementById('completeBtn');


// still working waiting on deck name modal
function updateSideBar(event) {
    event.preventDefault()
        const button = document.createElement('button');
        const img = document.createElement('img');

        img.src = './Assets/Images/deckImage.png';
        img.alt = 'Deck Image';

        //button.id = `deckButton ${deckCount}`; 
        button.className = 'nav-button'; 

        button.appendChild(img);

        sideBarDecks.appendChild(button);

    closeModal();
}

completeDeck.addEventListener('click', updateSideBar);

