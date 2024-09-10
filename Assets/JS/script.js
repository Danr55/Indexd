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


//This will open and close the modal
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
        question: questionEntry.value,
        answer: answerEntry.value
    };

    singleDeck.push(indexCard);

    questionEntry.value = '';
    answerEntry.value = '';

    localStorage.setItem('singleDeck', JSON.stringify(singleDeck));
    
    return singleDeck;
});

// finishDeck.addEventListener('click', function(event) {
//     deckNameWindow.style.display = 'block';

//     let deckName = deckQuery.value

//     decks.push(deckName);

//     console.log(decks);
    
// });

