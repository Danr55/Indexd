const timerButton = document.querySelector(`.button`)
const timerBox = document.getElementById(`countDownBox`)
const timerButton2 = document.getElementById(`timerButton`)
let timeSet = 0;

timerButton2.addEventListener(`click`, function(event) {
    event.preventDefault();


    let currentTime = timeSet;
    const time = setInterval(() => {
        timerBox.textContent = currentTime;
        currentTime++;

        if (currentTime === 10) {
            clearInterval(time);
            timerBox.textContent = 'Time’s up!';
        }
    }, 1000);

})


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
const createDeck = document.getElementById('createDeck');


function addMoreQuestions(){

}
    

addMoreBtn.addEventListener('click', addMoreQuestions);





