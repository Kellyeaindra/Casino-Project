$(document).ready(function () {
  const slotItem = [
    "img/spade",
    "img/seven",
    "img/club",
    "img/diamond",
    "img/spade",
    "img/heart",
    "img/club",
    "img/seven",
    "img/spade",
    "img/joker",
    "img/heart",
    "img/heart",
    "img/seven",
    "img/seven",
    "img/joker",
    "img/diamond",
  ];
  const threeBox = ["box1", "box2", "box3"];
  const shuffleTime = 170;
  const delayTime = 5000;
  const count = 0;
  var slotSound = document.getElementById("slotSound");
  var winSond = document.getElementById("winSond");
  var loseSound = document.getElementById("loseSound");
  var jackPotSound = document.getElementById("jackPotSound");
  var moneyBox = document.getElementById("yourMoney");
  var betDropdown = $("#bet");
  var bet = Number(betDropdown.val());
  var index = localStorage.getItem('userIndex');
  var userinfo = JSON.parse(localStorage.getItem('userinfo'));
  $("#moneyUnit").text("Total:");

  totalSum = userinfo[index]['amount'];
  moneyBox.value = totalSum;
  /**
   * initial state or before spin boxs of surface
   */
  function beforeClickCondition() {
    $(".box").css("background-image", 'url("img/guss.jpg")');
  }

  /**
   * shuffle array of index
   * @param {*} slotItem
   */
  function shuffleArray(slotItem) {
    for (let i = slotItem.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [slotItem[i], slotItem[j]] = [slotItem[j], slotItem[i]];
    }
  }
  /**
   * to animate the spinning of a specific box
   * @param {*} boxId
   * @param {*} goNextBox
   */
  function shuffleBox(boxId, goNextBox) {
    let box_Id = $(`#${boxId}`);
    const shuffledSlotItem = [...slotItem];
    shuffleArray(shuffledSlotItem);
    let currentIndex = 0;

    /**
     * animate for each box of slotItem
     */
    function animate() {
      const itemIndex = shuffledSlotItem[currentIndex];
      box_Id.css("background-image", `url('${itemIndex}.png')`);

      // Play slotSound for each box

      slotSound.play();

      currentIndex++;

      if (currentIndex < slotItem.length) {
        setTimeout(animate, shuffleTime);
      } else {
        box_Id.animate({ width: "50px", height: "80px" });
        box_Id.css("border", "2px solid darkred");

        goNextBox();
      }
    }
    animate();
  }
  /**
   * if condition==> (current box for shuffle which is going the end,
   * go next box and do the same job that will do until the end of all boxes)
   *
   * else ==> (go to output result)
   *
   * this function is used recursive
   * @param {*} count
   */
  function shufflegoNextBox(count) {
    if (count < threeBox.length) {
      shuffleBox(threeBox[count], function goNextBox() {
        setTimeout(function () {
          shufflegoNextBox(count + 1);
        }, 2000);
      });
    } else {
      const boxImages = threeBox.map((index) =>
        $(`#${index}`).css("background-image")
      );
      const winOrNot = isWin(boxImages);
      displayResult(winOrNot);

      const winOrNot2 = isWin2(boxImages);
      displayResult2(winOrNot2);
    }
  }
  /**
   *check win(is this side by side of two same rdmItem?)
   * @param {*} boxImages
   * @returns
   */
  function isWin(boxImages) {
    return (
      boxImages[0] === boxImages[1] ||
      boxImages[1] === boxImages[2] ||
      (boxImages[0] === boxImages[1] && boxImages[1] === boxImages[2])
    );
  }
  /**
   *  check win2(is this all of same rdmItem?)
   * @param {*} boxImages
   * @returns
   */
  function isWin2(boxImages) {
    return boxImages[0] === boxImages[1] && boxImages[1] === boxImages[2];
  }
  /**
   * display win or not
   * @param {*} result
   */
  function displayResult(result) {
    moneyBox.value = totalSum;
    const message = result ? "You Win!" : "You Lose!";
    const outPutColor = result ? "teal" : "rgb(228, 104, 21)";
    result ? winSond.play() : loseSound.play();
    result
      ? (moneyBox.value = totalSum += Number(betDropdown.val() * 3))
      : moneyBox.value;
    var userinfo = JSON.parse(localStorage.getItem('userinfo'));
    console.log(userinfo[index]['amount']);
    userinfo[index]['amount'] = moneyBox.value;
    localStorage.setItem('userinfo', JSON.stringify(userinfo));
    $(".outPut").text(message).css("color", outPutColor).show();
    afterDelayBackToInit();
  }
  /**
   *  
  :100%;
   * 
   * display win or not
   * @param {*} result2
   */
  function displayResult2(result2) {
    moneyBox.value = totalSum;
    if (result2) {
      $(".outPut").text(" Win JackPot").show();
      $(".outPut")
        .css({
          color: "green",
          "font-size": "14px" // Set the font size to 12px

        })
        .show();
      jackPotSound.play();
      moneyBox.value = totalSum += Number(betDropdown.val() * 15);
      console.log(userinfo[index]['amount']);
      userinfo[index]['amount'] = totalSum;
      localStorage.setItem('userinfo', JSON.stringify(userinfo));
      afterDelayBackToInit();
    }
  }
  /**
   * after waiting delay time, back to initial
   * initail stage of spinBtn conditon
   */
  function afterDelayBackToInit() {
    setTimeout(function () {
      betDropdown.val(0);
      $("#bet").prop("disabled", false);
      $(".outPut").hide();
      beforeClickCondition();
      $("#spinBtn").attr("disabled", false);
      $("#spinBtn").css({
        "background-color": "red",
        border: "1px solid brown",
        "border-bottom": " solid 5px darkgrey",
        transform: "none",
        "box-shadow": "none",
      });
      $(".box").animate({ width: "50px", height: "70px" });
      $(".box").css("border-color", "black");
    }, delayTime);

    $("#spinBtn").hover(
      function () {
        $(this).css({ "background-color": "darkgreen" });
      },
      function () {
        // if disabled==> darkgreen color
        if (!$(this).prop("disabled")) {
          $(this).css({ "background-color": "red" });
        }
      }
    );
  }
  beforeClickCondition();
  aftrClick();

  /**
   *  after click spinBtn conditon
   *     ring spin sound
   */
  function aftrClick() {
    $("#spinBtn").click(function () {
      if (
        Number(betDropdown.val()) != 0 &&
        moneyBox.value >= Number(betDropdown.val())
      ) {

        $("#spinBtn").attr("disabled", true);
        $("#spinBtn").css({
          "background": "darkgreen",
          "border": "1px solid gray",
          "border-bottom": "none",
          "transform": "translateY(4px)",

          "box-shadow": "1px 1px 5px gray",
          "font-weight": "bolder",
          "text-shadow": "2px 2px 10px gray",
          cursor: "pointer",
        });
        $("#bet").prop("disabled", true); //bet drop-down list disabled
        aftrBet_moneyBoxVal();
        slotSound.play();
        shufflegoNextBox(count);
      } else {
        if (Number(betDropdown.val()) == 0) {
          alert("You forgot to choose bet, please, choose bet");
        }
        else if (Number(
          moneyBox.value == 0)) {
          alert("Sorry, You need to Top-up")
        }
        else if (
          Number(
            moneyBox.value < betDropdown.val()) || moneyBox.value >= 1000) {
          alert(
            "Sorry, remain balance is lower than selected bet," +
            "Please,try another bet."
          );
        }
      }
    });
  }
  /**
   * after choose drop-dowm list of bet values==>(moneyBox.value-= bet)
   *
   */
  function aftrBet_moneyBoxVal() {
    totalSum -= betDropdown.val();
    moneyBox.value = totalSum;
    userinfo[index]['amount'] = totalSum;
    localStorage.setItem('userinfo', JSON.stringify(userinfo));
  }

});
