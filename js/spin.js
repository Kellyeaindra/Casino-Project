let container = document.querySelector(".container");
let spin = document.getElementById("spin")
let dollar = [];
let cash = ["0", "10", "20", "50", "100", "200", "500", "1000",]
let belt = "";
var userinfo = JSON.parse(localStorage.getItem('userinfo'));
var index = localStorage.getItem('userIndex');
var totalamount = userinfo[index]['amount'];
document.getElementById("totalamount").innerHTML = "Total:" + totalamount ;
/* for spin button*/
function btnSpin() {
  if (!belt == "") {
    let degree = 0;
    let cashrandom = Math.floor(Math.random() * 8);// to get amount for dollar
    dollar.push(cash[cashrandom]);
    let answer = dollar.join("");
    if (answer == 0) {
      degree = 0;
      degree = (-1) + 1800;
      container.style.transition = "4s";
      container.style.transform = "rotate(" + degree + "deg)";
      /* for 10$ winn*/
      setTimeout(() => {
        document.getElementById("win").innerHTML = "Thank You!Please Try Again";
        document.getElementById("success").play();
      }, 4000);
      /* for restart initial state*/
      setTimeout(() => {
        document.getElementById("100").style.backgroundColor = "gold";
        document.getElementById("100").disabled = false;
        container.style.transition = "0s";
        container.style.transform = "rotate(0deg)";
        document.getElementById("win").innerHTML = "";
      }, 6000);
    } else if (answer == 10) {
      degree = 0;
      degree = (-35) + 1800;
      container.style.transition = "4s";
      container.style.transform = "rotate(" + degree + "deg)";
      setTimeout(() => {
        userinfo[index]['amount'] = totalamount;
        localStorage.setItem('userinfo', JSON.stringify(userinfo));
        document.getElementById("win").innerHTML = "Congratulation!You win 10 Ks";
        document.getElementById("success").play();
      }, 4000);
      /* for restart initial state*/
      setTimeout(() => {
        document.getElementById("100").style.backgroundColor = "gold";
        document.getElementById("100").disabled = false;
        container.style.transition = "0s";
        container.style.transform = "rotate(0deg)";
        document.getElementById("win").innerHTML = "";
      }, 6000);
    } else if (answer == 20) {
      degree = 0;
      degree = (-85) + 1800;
      container.style.transition = "4s";
      container.style.transform = "rotate(" + degree + "deg)";
      setTimeout(() => {
        userinfo[index]['amount'] = totalamount;
        localStorage.setItem('userinfo', JSON.stringify(userinfo));
        document.getElementById("win").innerHTML = "Congratulation!You win 20 Ks";
        document.getElementById("success").play();
      }, 4000);
      /* for restart initial state*/
      setTimeout(() => {

        document.getElementById("100").style.backgroundColor = "gold";
        document.getElementById("100").disabled = false;
        container.style.transition = "0s";
        container.style.transform = "rotate(0deg)";
        document.getElementById("win").innerHTML = "";
      }, 6000);
    } else if (answer == 50) {
      degree = 0;
      degree = (-125) + 1800;
      container.style.transition = "4s";
      container.style.transform = "rotate(" + degree + "deg)";
      setTimeout(() => {
        userinfo[index]['amount'] = totalamount;
        localStorage.setItem('userinfo', JSON.stringify(userinfo));
        document.getElementById("win").innerHTML = "Congratulation!You win 50 Ks";
        document.getElementById("success").play();
      }, 4000);
      /* for restart initial state*/
      setTimeout(() => {
        document.getElementById("100").style.backgroundColor = "gold";
        document.getElementById("100").disabled = false;
        container.style.transition = "0s";
        container.style.transform = "rotate(0deg)";
        document.getElementById("win").innerHTML = "";
      }, 6000);
    } else if (answer == 100) {
      degree = 0;
      degree = (-175) + 1800;
      container.style.transition = "4s";
      container.style.transform = "rotate(" + degree + "deg)";
      setTimeout(() => {
        userinfo[index]['amount'] = totalamount;
        localStorage.setItem('userinfo', JSON.stringify(userinfo));
        document.getElementById("win").innerHTML = "Congratulation!You win 100 Ks";
        document.getElementById("success").play();
      }, 4000);
      /* for restart initial state*/
      setTimeout(() => {
        document.getElementById("100").style.backgroundColor = "gold";
        document.getElementById("100").disabled = false;
        container.style.transition = "0s";
        container.style.transform = "rotate(0deg)";
        document.getElementById("win").innerHTML = "";
      }, 6000);
    } else if (answer == 200) {
      degree = 0;
      degree = (-220) + 1800;
      container.style.transition = "4s";
      container.style.transform = "rotate(" + degree + "deg)";
      setTimeout(() => {
        userinfo[index]['amount'] = totalamount;
        localStorage.setItem('userinfo', JSON.stringify(userinfo));
        document.getElementById("win").innerHTML = "Congratulation!You win 200 Ks";
        document.getElementById("success").play();
      }, 4000);
      /* for restart initial state*/
      setTimeout(() => {
        document.getElementById("100").style.backgroundColor = "gold";
        document.getElementById("100").disabled = false;
        container.style.transition = "0s";
        container.style.transform = "rotate(0deg)";
        document.getElementById("win").innerHTML = "";
      }, 6000);
    } else if (answer == 500) {
      degree = 0;
      degree = (-265) + 1800;
      container.style.transition = "4s";
      container.style.transform = "rotate(" + degree + "deg)";
      setTimeout(() => {
        userinfo[index]['amount'] = totalamount;
        localStorage.setItem('userinfo', JSON.stringify(userinfo));
        document.getElementById("win").innerHTML = "Congratulation!You win 500 Ks";
        document.getElementById("success").play();
      }, 4000);
      /* for restart initial state*/
      setTimeout(() => {
        document.getElementById("100").style.backgroundColor = "gold";
        document.getElementById("100").disabled = false;
        container.style.transition = "0s";
        container.style.transform = "rotate(0deg)";
        document.getElementById("win").innerHTML = "";
      }, 6000);

    } else if (answer == 1000) {
      degree = 0;
      degree = (-310) + 1800;
      container.style.transition = "4s";
      container.style.transform = "rotate(" + degree + "deg)";
      setTimeout(() => {
        userinfo[index]['amount'] = totalamount;
        localStorage.setItem('userinfo', JSON.stringify(userinfo));
        document.getElementById("win").innerHTML = "Congratulation!You win 1000 Ks";
        document.getElementById("success").play();
      }, 4000);
      /* for restart initial state*/
      setTimeout(() => {
        document.getElementById("100").disabled = false;
        document.getElementById("100").style.backgroundColor = "gold";
        container.style.transition = "0s";
        container.style.transform = "rotate(0deg)";
        document.getElementById("win").innerHTML = "";
      }, 6000);
    }
    /* for total cash state*/
    totalamount = Number(totalamount) + Number(answer);
    setTimeout(() => {
      document.getElementById("totalamount").innerHTML = `Total:${totalamount} Ks`;
    }, 4000);
    document.getElementById("wheel").play();
    dollar = [];
    /* if no money ,disabled spin and cash button*/
    setTimeout(() => {
      if (totalamount < 100) {
        document.getElementById("100").disabled = true;
        document.getElementById("100").style.backgroundColor = "gold";
        spin.disabled = true;
        setTimeout(() => {
          document.getElementById("win").innerHTML = "Please fill your money!";
        }, 5000);
      } else {
        document.getElementById("100").disabled = false;
        document.getElementById("100").style.backgroundColor = "gold";
      }
    }, 6000);
    /* u can't spin before u belt*/
  } else {
    alert("Please belt amount first!")
  }
  belt = "";
}
/* for  money belt button*/
function Clickbelt(obj) {
  let count = 0;
  let userpress = obj.id;
  count++;
  finished = true;
  console.log(userpress);
  totalamount = Number(totalamount) - Number(userpress);
  userinfo[index]['amount'] = totalamount;
  localStorage.setItem('userinfo', JSON.stringify(userinfo));
  console.log(totalamount);
  document.getElementById("ping").play();
  /* for u cannot spin before u belt*/
  if (belt == "") {
    belt = userpress;
  }
  /* if u belt 1 time ,auto disabled*/
  if (count == 1) {
    document.getElementById("100").disabled = true;
    document.getElementById("100").style.backgroundColor = "burlywood";
    document.getElementById("totalamount").innerHTML = `Total:${totalamount}Ks`;
    return true;
  } else {
    return false;
  }
}

