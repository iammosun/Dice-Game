const rollDice = document.querySelector('.roll-btn a');
const score1 = document.querySelector('.player1-current-score');
const score2 = document.querySelector('.player2-current-score');
const players = document.querySelector('.players');
const circle1 = document.querySelectorAll('.circle1');
const circle2 = document.querySelectorAll('.circle2');
const player1 = document.querySelector('.player-one');
const player2 = document.querySelector('.player-two');
const totalScore1 = document.querySelector('.player1-total-score');
const totalScore2 = document.querySelector('.player2-total-score');
const diceImage = document.getElementsByTagName('img');
const holdBtn = document.querySelector('.hold-btn a');
const newGameBtn = document.querySelector('.new-game a');
const finalScore = document.forms['final-score'].querySelector('input');
const playerOneH2 = document.querySelector('.player-one h2');
const playerTwoH2 = document.querySelector('.player-two h2');

let currentPlayer = score1;
let totalScore = totalScore1;



function play(currentPlayer){
  newGameBtn.addEventListener('click', newBtnEvent);
  function newBtnEvent(e){
    e.preventDefault();
    circle1[0].style.display = "flex";
    circle1[1].style.display = "flex";
    circle2[0].style.display = "none";
    circle2[1].style.display = "none";
    score1.innerHTML = 0;
    score2.innerHTML = 0;
    totalScore1.innerHTML = 0;
    totalScore2.innerHTML = 0;
    playerOneH2.innerHTML = "PLAYER 1";
    playerTwoH2.innerHTML = "PLAYER 2";
    diceImage[0].setAttribute('src', 'images/dice1.png');
    diceImage[1].setAttribute('src', 'images/dice1.png');
    playerOneH2.style.color = "black";
    playerTwoH2.style.color = "black";
    score1.parentElement.parentElement.classList.add("active-color");
    score2.parentElement.parentElement.classList.remove("active-color");
    currentPlayer = score1;
    totalScore = totalScore1;
    rollDice.addEventListener('click', diceBtnEvent);
    holdBtn.addEventListener('click', holdBtnEvent);
    document.getElementById('dice-image').style.display = "flex";
  }

  rollDice.addEventListener('click', diceBtnEvent);
  function diceBtnEvent(){
    if (parseInt(finalScore.value) > 0){
      let currentScore = currentPlayer.innerHTML;
      let diceA = Math.floor(Math.random()*6)+1;
      let diceB = Math.floor(Math.random()*6)+1;
      diceImage[0].setAttribute('src', 'images/dice' + diceA + '.png');
      diceImage[1].setAttribute('src', 'images/dice' + diceB + '.png');



      if((diceA == 6 && diceB == 6) || (diceA == 1 || diceB == 1)){
        currentPlayer.innerHTML = 0;
        currentPlayer = currentPlayer == score1 ? score2 : score1;

      }else{
        currentScore = parseInt(currentScore) + diceA + diceB;
        currentPlayer.innerHTML = (currentScore);
      }

      if(currentPlayer == score1){
        score1.parentElement.parentElement.classList.add("active-color");
        score2.parentElement.parentElement.classList.remove("active-color");
        circle1[0].style.display = "flex";
        circle1[1].style.display = "flex";
        circle2[0].style.display = "none";
        circle2[1].style.display = "none";
      }else{
        score2.parentElement.parentElement.classList.add("active-color");
        score1.parentElement.parentElement.classList.remove("active-color");
        circle2[0].style.display = "flex";
        circle2[1].style.display = "flex";
        circle1[0].style.display = "none";
        circle1[1].style.display = "none";
      }
    }else{
      alert("Input a final score");
    }
  };

  holdBtn.addEventListener('click', holdBtnEvent);
  function holdBtnEvent(){
    switch(currentPlayer){
      case score1:
        totalScore = totalScore1;
        totalScore.innerHTML = parseInt(totalScore.innerHTML) + parseInt(score1.innerHTML);
        score1.innerHTML = 0;
        break;

      case score2:
        totalScore = totalScore2;
        totalScore.innerHTML = parseInt(totalScore.innerHTML) + parseInt(score2.innerHTML);
        score2.innerHTML = 0;
    }
    currentPlayer = currentPlayer == score1 ? score2 : score1;

    if(currentPlayer == score1){
      score1.parentElement.parentElement.classList.add("active-color");
      score2.parentElement.parentElement.classList.remove("active-color");
      circle1[0].style.display = "flex";
      circle1[1].style.display = "flex";
      circle2[0].style.display = "none";
      circle2[1].style.display = "none";
    }else{
      score2.parentElement.parentElement.classList.add("active-color");
      score1.parentElement.parentElement.classList.remove("active-color");
      circle2[0].style.display = "flex";
      circle2[1].style.display = "flex";
      circle1[0].style.display = "none";
      circle1[1].style.display = "none";
    }


    if(parseInt(totalScore.innerHTML) >= parseInt(finalScore.value)){
      const playerH2 = totalScore.previousElementSibling.querySelector('h2');
      playerH2.innerHTML = "WINNER!!!";
      playerH2.style.color = "orange";
      score1.parentElement.parentElement.classList.remove("active-color");
      score2.parentElement.parentElement.classList.remove("active-color");
      playerH2.parentElement.parentElement.classList.add("active-color");
      circle2[0].style.display = "none";
      circle2[1].style.display = "none";
      circle1[0].style.display = "none";
      circle1[1].style.display = "none";
      rollDice.removeEventListener('click', diceBtnEvent);
      holdBtn.removeEventListener('click', holdBtnEvent);
      document.getElementById('dice-image').style.display = "none";
    }
  }
}

play(currentPlayer);
