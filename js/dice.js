let dice1 = document.querySelector(".cube1");
let dice2 = document.querySelector(".cube2");
let resultDiv = document.getElementById("result");
let dicesound = document.getElementById("dice");
let clickCashSound = document.getElementById("clickCash");
let clickNumSound = document.getElementById("clickNum");
var userinfo = JSON.parse(localStorage.getItem("userinfo"));
var index = localStorage.getItem("userIndex");
console.log(index);
var totalCash = userinfo[index]["amount"];
document.getElementById("totalCash").innerHTML = `Total:${totalCash}`;
let currentBet = 0;
let finished = false;
let count = 0;
/**
 * Function to handle the roll button click event
 *
 */
function rollBtn() {
  //Check if a bet number is selected brfore rolling
  let selectedBet = document.querySelector(".number.selected");
  if (!selectedBet) {
    alert("Please select abet Number before rolling!!");
    return;
  }
  if (finished == false && count == 1) {
    //add sound when rollBtn click dice is rolling
    dicesound.play();
    resultDiv.innerHTML = "";
    const betValue = parseInt(selectedBet.value);
    const random1 = Math.floor(Math.random() * 6 + 1);
    const random2 = Math.floor(Math.random() * 6 + 1);
    console.log(random1);
    console.log(random2);
    dice1.style.animation = "rolling1 2s";
    dice2.style.animation = "rolling2 2s";
    setTimeout(() => {
      switch (random1) {
        case 1:
          dice1.style.transform = "rotateX(0deg) rotateY(0deg)";
          break;

        case 6:
          dice1.style.transform = "rotateX(180deg) rotateY(0deg)";
          break;

        case 2:
          dice1.style.transform = "rotateX(-90deg) rotateY(0deg)";
          break;

        case 5:
          dice1.style.transform = "rotateX(90deg) rotateY(0deg)";
          break;

        case 3:
          dice1.style.transform = "rotateX(0deg) rotateY(90deg)";
          break;

        case 4:
          dice1.style.transform = "rotateX(0deg) rotateY(-90deg)";
          break;

        default:
          break;
      }
      dice1.style.animation = "none";
    }, 1900);
    setTimeout(() => {
      switch (random2) {
        case 1:
          dice2.style.transform = "rotateX(0deg) rotateY(0deg)";
          break;

        case 6:
          dice2.style.transform = "rotateX(180deg) rotateY(0deg)";
          break;

        case 2:
          dice2.style.transform = "rotateX(-90deg) rotateY(0deg)";
          break;

        case 5:
          dice2.style.transform = "rotateX(90deg) rotateY(0deg)";
          break;

        case 3:
          dice2.style.transform = "rotateX(0deg) rotateY(90deg)";
          break;

        case 4:
          dice2.style.transform = "rotateX(0deg) rotateY(-90deg)";
          break;

        default:
          break;
      }
      document.getElementById("roll").style.backgroundColor = "rgb(27, 27, 85)";
      dice2.style.animation = "none";

      let totalValue = random1 + random2;

      //Check if the game is not finished and if it's the first rolling
      if (totalValue === betValue) {
        resultDiv.innerHTML = "You Win!";
        resultDiv.style.color = "teal";
        totalCash += currentBet * 11;
        userinfo[index]["amount"] = totalCash;
        localStorage.setItem("userinfo", JSON.stringify(userinfo));
        document.getElementById("totalCash").innerHTML = `Total:${totalCash}`;
      } else {
        resultDiv.innerHTML = "You lose!";
        resultDiv.style.color = "red";
        userinfo[index]["amount"] = totalCash;
        localStorage.setItem("userinfo", JSON.stringify(userinfo));
      }
    }, 1900);

    //Enable cash buttons and the reset count if not finished
    for (let index = 0; index < 12; index++) {
      document.getElementsByClassName("cash")[index].disabled = false;
      count = "";
    }

    //Disable Cash and selected number button if total cash is zero
    if (totalCash == 0) {
      finished = true;
      for (let index = 0; index < 12; index++) {
        document.getElementsByClassName("cash")[index].disabled = true;
      }
      for (let index = 0; index < 11; index++) {
        document.getElementsByClassName("number")[index].disabled = true;
      }
    }
  } else {
    alert(
      "You don't still bet cash this game.If you don't have enough cash for this bet.Please reflesh this game"
    );
  }
}
/*
 *Add function to display selected button value
 */
function displaySelectedValue(value) {
  document.getElementById(
    "selectedValue"
  ).innerHTML = `Selected Number:${value}`;
}

//Add the eventlistener to the number buttons for selecting the bet
document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => {
    //Remove the selested class from all buttons
    document.querySelectorAll(".number").forEach((btn) => {
      btn.classList.remove("selected");
    });
    //Add the selected class to the clicked buttons
    button.classList.add("selected");
    //Display the selected value
    displaySelectedValue(button.value);
    resultDiv.innerHTML = "";
  });
});

function clickCash(obj) {
  //Add sound for cash click
  clickCashSound.play();
  let userpress = parseInt(obj.id);
  currentBet = userpress;
  count++;
  //Disable cash button after the first rolling
  if (count == 1) {
    for (let index = 0; index < 12; index++) {
      document.getElementsByClassName("cash")[index].disabled = true;
    }
  }
  //Process the bet amount and update total cash
  if (totalCash >= currentBet) {
    totalCash -= currentBet;
    userinfo[index]["amount"] = totalCash;
    localStorage.setItem("userinfo", JSON.stringify(userinfo));
    document.getElementById("totalCash").innerHTML = `Total:${totalCash}`;
    return userpress;
  } else if (totalCash < currentBet) {
    //Alert if user don't have enough cash
    count = 0;
    alert("You don't have enough cash for this bet.");
    for (let index = 0; index < 12; index++) {
      document.getElementsByClassName("cash")[index].disabled = false;
    }
  } else {
    alert("You don't have enough cash for this bet.Please reflesh this game ");
    return 0;
  }
}
function clickNum() {
  clickNumSound.play();
}
