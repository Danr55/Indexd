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