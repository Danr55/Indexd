const timerButton = document.getElementById(`start-timer`)
const timerBox = document.getElementById(`countDownBox`)
const timerButton2 = document.getElementById(`timerButton`)
const timerButton3 = document.getElementById(`reset-button`)
let timeSet = 0;
let timerRunning = false;
let time;
const modal = document.getElementById('deckModal'); //Get modal element
const modalBtn = document.getElementById('modalBtn'); //Get modal button
const closeBtn = document.getElementById('closeBtn'); //Get close button
const welcomeModal = document.getElementById('welcomeModal'); //Get modal element
const startButton = document.getElementById('startButton'); //Get start button
const addMoreBtn = document.getElementById('addMoreBtn');
const createDeck = document.getElementById('completeBtn');
const indexEntry = document.getElementById('index-entry');
const deckEntry = document.getElementById('deck-entry');
const sideBarDecks = document.getElementById('multipleDecks');
const completeDeck = document.getElementById('completeDeck');
const studyCards =document.getElementById('studyCards');
const closeBtnWelcome = document.getElementById('closeBtnWelcome');
const clearDeckBtn = document.getElementById('clearDeckBtn');
const sideBarBtn = document.getElementsByClassName('nav-button');

let singleDeck = [];    // array for index cards
let decks = [];     // array for decks

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
window.onload = function(){
    console.log('Page has loaded');
    
    const keys = Object.keys(localStorage);
    const hasDecks = keys.some(key => key.startsWith('Deck:'));

    if(hasDecks){
        displayDecks();
        welcomeModal.style.display = 'none'; // Hide the welcome modal if decks exist
    } else {
        welcomeModal.style.display = 'flex'; // Display the welcome modal if no decks
    }
}; 

startButton.onclick = function(){
    welcomeModal.style.display = 'none'; //When the start button is clicked the welcome modal will close
};
startButton.addEventListener('click', openModal) 

function closeWelcome(){
    welcomeModal.style.display = 'none';
}

closeBtnWelcome.addEventListener('click', closeWelcome);

//This will open and close the card and deck creator modal
function openModal(){
    modal.style.display = 'block';
    deckEntry.classList.add('hidden');
    indexEntry.classList.remove('hidden');
    createDeck.classList.remove('hidden');
    addMoreBtn.classList.remove('hidden');
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

createDeck.addEventListener('click', function(event) {
    event.preventDefault();
    if (deckEntry.classList.contains('hidden')) {
        deckEntry.classList.remove('hidden');
        indexEntry.classList.add('hidden');
        createDeck.classList.add('hidden');
        addMoreBtn.classList.add('hidden');
    } else {
        deckEntry.classList.add('hidden');
        indexEntry.classList.remove('hidden');
        createDeck.classList.remove('hidden');
        addMoreBtn.classList.remove('hidden');
    }
}); // will display the create deck entry 

//Function to set deck onto navbar once deck has been created
function updateSideBar(event) {
    event.preventDefault();
    let deckName = document.getElementById('deckSubmission').value.trim();
    let errorElement = document.getElementById('deckSubmissionError');
    
    if (deckName === '') {
        showError(errorElement, 'Please enter a deck name.');
        return;
    }

    hideError(errorElement);

    let deck = {
        deckName: deckName,
        singleDeck: [...singleDeck] // Copy the current singleDeck
    };

    decks.push(deck);

    localStorage.setItem(`Deck:${deckName}`, JSON.stringify(deck)); // Store updated decks array

    // Clear the sidebar and add new deck button
    sideBarDecks.innerHTML = '';
    
    decks.forEach(d => {
        const button = document.createElement('button');
        const img = document.createElement('img');

        img.src = './Assets/Images/deckImage.png';
        img.alt = 'Deck Image';
        img.style.width = '125px';
        img.style.height = '125px';

        button.className = 'nav-button';
        button.textContent = d.deckName; // Show deck name on button

        button.appendChild(img);
        button.addEventListener('click', (event) => {
            setActiveButton(button);
            displayRandomStudy(event);
        });
        sideBarDecks.appendChild(button);
    });

    singleDeck = []; // Reset singleDeck after creating the deck
    localStorage.removeItem('singleDeck'); // Clear localStorage for singleDeck

    closeModal(); 
    displayDecks();
}

function showError(element, message) {
    if (element) {
        element.textContent = message;
        element.classList.remove('hidden');
    }
}

function hideError(element) {
    if (element) {
        element.textContent = '';
        element.classList.add('hidden');
    }
}

if (completeDeck) {
    completeDeck.addEventListener('click', updateSideBar);
} else {
    console.error("Element with id 'completeDeck' not found");
}

function displayDecks() {
    sideBarDecks.innerHTML = ''; // Clear existing sidebar content

    // Iterate through localStorage keys to find deck keys
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('Deck:')) { // Identify keys that store deck data
            const deck = JSON.parse(localStorage.getItem(key));
            const button = document.createElement('button');
            const img = document.createElement('img');

            img.src = './Assets/Images/deckImage.png';
            img.alt = 'Deck Image';
            img.style.width = '125px';
            img.style.height = '125px';

            button.className = 'nav-button';
            button.textContent = deck.deckName // Show deck name on button

            button.appendChild(img);
            button.addEventListener('click', (event) => displayRandomStudy(event));
            sideBarDecks.appendChild(button);
        }
    });
}

function displayIndexCard(){
    studyCards.style.display = 'block';
}

let activeButton = null;

function setActiveButton(button) {
    if (activeButton) {
        activeButton.classList.remove('active');
    }
    button.classList.add('active');
    activeButton = button;
}

function displayRandomStudy(event) {

    const navButton = event.target.closest('.nav-button');
    if (navButton) {
        setActiveButton(navButton);
    }

    displayIndexCard();
  const button = event.target.parentNode.innerText;
  function getDeckFromStorage() {
    const key = `Deck:${button}`;
    const deckData = localStorage.getItem(key);
    if (deckData) {
        return JSON.parse(deckData);
    } else {
        console.log(`No deck found with name: ${deckName}`);
        return null;
    }

}

const retrievedDeck = getDeckFromStorage();

if (retrievedDeck && retrievedDeck.singleDeck) {
    const deck = retrievedDeck.singleDeck;

    function displayRandomQuestion() {
            const randomIndex = Math.floor(Math.random() * deck.length);
            const selectedQuestion = deck[randomIndex];

            // Display the question
            const questionElement = document.getElementById('questionContainer');
            questionElement.innerText = selectedQuestion.question;

            // Hide the answer initially
            const answerElement = document.getElementById('answerContainer');
            answerElement.innerText = ''; // Clear the answer text

            // Set up the reveal button
            const revealButton = document.getElementById('revealButton');
            revealButton.onclick = function() {
                const answerElement = document.getElementById('answerContainer');
                answerElement.innerText = selectedQuestion.answer;
            };
        }

        // Initially display a random question
        displayRandomQuestion();

        // Set up the next button
        const nextButton = document.getElementById('nextButton');
        nextButton.onclick = function() {

            displayRandomQuestion(); // Display a new random question when clicked
        };
    } else {
        console.log("Deck is empty or not found.");
}

}
//Clears local storage and refreshes the page to start over
function clearDecks() {
    localStorage.clear();
    studyCards.style.display = 'block';
    location.reload();
}  

clearDeckBtn.addEventListener('click', clearDecks);


