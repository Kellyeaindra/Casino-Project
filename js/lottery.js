$(document).ready(function () {
  const yourMoney = document.getElementById("yourMoney");
  let grandTotal = 0;
  var index = localStorage.getItem('userIndex');
  var userinfo = JSON.parse(localStorage.getItem('userinfo'));
  console.log(userinfo);
  var totalSum = userinfo[index]['amount'];
  yourMoney.value = totalSum + " Ks";
  let selectItem_Array = [];
  // when btn click, display cart
  $(".buttons").click(function () {
    if (totalSum < 100) {
      alert("Please top up!");
    } else {
      updateCart();
      updateYourMoney();
      $(".scrollable-cart").animate({ width: "show" }, 1500);
      $(".scrollable-cart").css("max-height", "50vh");
      //  btn of innerText
      const twoD_Num = $(this).text();
      // check  item/data is already selected or not
      if (isSelectedOne(twoD_Num)) {
        return;
      }
      // add the item/data to the selectItem_Array
      selectItem_Array.push({
        digit: twoD_Num,
        amount: 100, // default amount
      });
      updateCart();
      updateYourMoney();
    }
  });
  /**
   * checking  already a selected item ot not
   * @param {*} digit
   * @returns true/false
   */
  function isSelectedOne(digit) {
    for (const clicked of selectItem_Array) {
      if (clicked.digit === digit) {
        clicked.amount += 100;
        updateYourMoney();
        updateCart();
        return true;
      }
    }
    return false;
  }
  /**
   * update the cart
   */
  function updateCart() {
    grandTotal = 0; // cart of initial total value
    //clear items in the cart
    $(".customChoice").empty();
    //exist btn display none
    $(".exit").css("display", "none");
    // add each selected item to the cart
    selectItem_Array.forEach((item, index) => {
      //selected items of parent
      const itemData_Container = $('<div class="item"></div>');
      // customize 2d num that is created as a clild of itemData_Container
      itemData_Container.append('<div class="pname">' + item.digit + "</div>");
      const multiplied = $('<span class="multily">' + 80 + "</span>");
      // multiplied which is created as a cilid of  itemData_Container
      itemData_Container.append(multiplied);
      // inputBox for customize amount
      const cutomizeAmt = $(
        '<input type="text" class="betAmt" value="' + item.amount + '"></input>'
      );
      //is appended as a chid of itemData_Container
      itemData_Container.append(cutomizeAmt);
      limit_CustomAmout();
      /**
       *  taking a limit for customize amount
       */
      function limit_CustomAmout() {
        $(cutomizeAmt).blur(function () {
          const input_Amt = Number($(this).val()) || 100; // Default to 100 if not a valid number
          if (input_Amt >= 100 && input_Amt <= 100000) {
            item.amount = input_Amt;
          } else {
            alert("Enter a amount from 100ks to 100,000ks only");
            $(this).val(100);
            item.amount = 100;
          }
          // update the mainTotal val when  amount changes
          updateYourMoney();
          // update the cart when  amount changes
          updateCart();
        });
      }
      // Bin_Img to remove item
      const bin_Img = $('<img src="../img/bin2.png" alt="" class="bimImg">');
      removeFromCart();
      /**
       * remove customizeItems from cart
       */
      function removeFromCart() {
        $(bin_Img).click(function () {
          // Check if the selectItem_Array is not empty before removing an item
          if (selectItem_Array.length > 0) {
            // remove the item from the selectItem_Array array
            selectItem_Array.splice(index, 1);

            //update cart when binImg was removed
            updateYourMoney();
            updateCart();
          }
        });
      }
      itemData_Container.append(bin_Img);
      calculate_totalVal_forCart();
      /**
       * calculate the total amount for cart
       */
      function calculate_totalVal_forCart() {
        grandTotal += item.amount;
        console.log(grandTotal);
        $("#grand").text(
          grandTotal + "Ks"
        );
      }
      // all of selected items of parent
      $(".customChoice").append(itemData_Container);
    });
    slideHide();
  }
  /**
   * In the cart, after all items were removed, the cart will be slideHided
   */
  function slideHide() {
    if (selectItem_Array.length == 0) {
      $(".scrollable-cart").animate({ width: "hide" }, 1500);
    }
  }
  r_Btn();
  /**
   * if click R btn, btn of inner digit will reverse or not(toggle)
   */
  function r_Btn() {
    let isRClicked = false;
    $(".r").click(function () {
      isRClicked = !isRClicked;
    });
    $(".buttons").click(function () {
      if (isRClicked) {
        /**
         *  after click R byncheck if the button text is two digits and
         *  if yes, do reverse btn of inner digit
         */
        if ($(this).text().length === 2) {
          const reversedDigits = $(this).text()[1] + $(this).text()[0];

          if (isSelectedOne(reversedDigits)) {
            return;
          }
          // add  original and reversed digits to the selectItem_Array with an amount of 100
          selectItem_Array.push({ digit: reversedDigits, amount: 100 });

          //whenever  btn is clicked, main totalVal will update
          updateYourMoney();
          // Update the cart
          updateCart();
        }
      }
    });
  }
  //Power Btn
  $("#power").click(function () {
    if (totalSum < 100) {
      alert("Please top up!");
    } else {
      $(".scrollable-cart").animate({ width: "show" }, 1500);
      $(".scrollable-cart").css("max-height", "50vh");
      const powerDigits = [
        "50",
        "05",
        "16",
        "61",
        "27",
        "72",
        "38",
        "83",
        "49",
        "94",
      ];
      // Check if any powerDigits are already selected
      if (checkDigitsAlreadySelected(powerDigits, "powerDigits")) {
        // Increment the amount for already selected digits
        for (const digit of powerDigits) {
          isSelectedOne(digit);
        }
      } else {
        // Add selected digits to the selectItem_Array with an amount of 100
        selectItem_Array.push(
          ...powerDigits.map((digit) => ({
            digit,
            amount: 100,
            specificArray: "powerDigits",
          }))
        );
      }
      updateYourMoney();
      updateCart();
    }
  });
  //netKhat Btn
  $("#netKhat").click(function () {
    if (totalSum < 100) {
      alert("Please top up!");
    } else {
      $(".scrollable-cart").animate({ width: "show" }, 1500);
      $(".scrollable-cart").css("max-height", "50vh");
      const netKhatDigits = [
        "07",
        "70",
        "18",
        "81",
        "24",
        "42",
        "35",
        "53",
        "69",
        "96",
      ];
      // Check if any netKhatDigits are already selected
      if (checkDigitsAlreadySelected(netKhatDigits, "netKhatDigits")) {
        // Increment the amount for already selected digits
        for (const digit of netKhatDigits) {
          isSelectedOne(digit);
        }
      } else {
        // Add selected digits to the selectItem_Array with an amount of 100
        selectItem_Array.push(
          ...netKhatDigits.map((digit) => ({
            digit,
            amount: 100,
            specificArray: "netKhatDigits",
          }))
        );
      }
      updateYourMoney();
      updateCart();
    }
  });
  //silbing Btn
  $("#silbing").click(function () {
    if (totalSum < 100) {
      alert("Please top up!");
    } else {
      $(".scrollable-cart").animate({ width: "show" }, 1500);
      $(".scrollable-cart").css("max-height", "50vh");
      const siblingDigits = [
        "01",
        "10",
        "12",
        "21",
        "23",
        "32",
        "34",
        "43",
        "45",
        "54",
        "56",
        "65",
        "67",
        "76",
        "78",
        "87",
        "89",
        "98",
        "90",
        "09",
      ];
      // Check if any siblingDigits are already selected
      if (checkDigitsAlreadySelected(siblingDigits, "siblingDigits")) {
        // Increment the amount for already selected digits
        for (const digit of siblingDigits) {
          isSelectedOne(digit);
        }
      } else {
        // Add selected digits to the selectItem_Array with an amount of 100
        selectItem_Array.push(
          ...siblingDigits.map((digit) => ({
            digit,
            amount: 100,
            specificArray: "siblingDigits",
          }))
        );
      }
      updateYourMoney();
      updateCart();
    }
  });
  //twin Btn
  $("#twin").click(function () {
    if (totalSum < 100) {
      alert("Please top up!");
    } else {
      $(".scrollable-cart").animate({ width: "show" }, 1500);
      $(".scrollable-cart").css("max-height", "50vh");
      const twinDigits = [
        "00",
        "11",
        "22",
        "33",
        "44",
        "55",
        "66",
        "77",
        "88",
        "99",
      ];
      // Check if any twinDigits are already selected
      if (checkDigitsAlreadySelected(twinDigits, "twinDigits")) {
        // Increment the amount for already selected digits
        for (const digit of twinDigits) {
          isSelectedOne(digit);
        }
      } else {
        // Add selected digits to the selectItem_Array with an amount of 100
        selectItem_Array.push(
          ...twinDigits.map((digit) => ({
            digit,
            amount: 100,
            specificArray: "twinDigits",
          }))
        );
      }
      updateYourMoney();
      updateCart();
    }
  });
  confirm_Btn();
  /**
   * confirm button
   */
  function confirm_Btn() {
    $(".confirm").click(function () {
      grandTotal = 0;
      $(this).hide();
      $(".scrollable-cart").css("max-height", "150vh");
      $(".invoice").show();
      $(".download").show();
      $(".done").show();
      $(".buttons,.betAmt,.r,#power, #netKhat, #silbing, #twin").prop(
        "disabled",
        true
      );
      $(".customChoice .bimImg").hide();
      $(".deleteText").css("display", "none");
      console.log(selectItem_Array);
      userinfo[index]['amount'] = totalSum - grandTotal;
      localStorage.setItem('userinfo', JSON.stringify(userinfo));
      console.log(totalSum);
      yourMoney.value =
        totalSum + " Ks";
    });
  }
  $(".exit").click(function () {
    $("#power, #netKhat, #silbing, #twin").css(
      "border-bottom",
      " 5px solid gray"
    );
    aftrHide_exit();
    $(".exit").css("display", "none");
  });
  /**
   * after click exit btn of condition
   */
  function aftrHide_exit() {
    $(this).hide();
    $(".confirm").show();
    $(".scrollable-cart").css("max-height", "auto");
    $(".invoice").hide();
    $(".exit").css("display", "none");
    $(".download").hide();
    $(".done").hide();
    $(".buttons,.betAmt,.r,#power,#netKhat, #silbing, #twin").prop(
      "disabled",
      false
    );
    $(".scrollable-cart").animate({ width: "hide" }, 1500);
    selectItem_Array.length = 0;
    updateCart();
    $(".deleteText").toggle();
  }
  download_Btn_For_Invoice();
  /**
   * pdf for Invoice
   */
  function download_Btn_For_Invoice() {
    $(".download").click(function () {
      $(this).hide();
      $(".exit").toggle();
      let invoice = $(".cart")[0]; // Use [0] to get the DOM element
      var opt = {
        margin: 1,
        filename: "myfile.pdf",
        image: { type: "jpg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf().from(invoice).set(opt).save();
    });
  }
  /**
   * checking the specific(p,N,bro,siblings) Btn or not
   * @param {*} digitsArray
   * @param {*} specificArray
   * @returns
   */
  function checkDigitsAlreadySelected(digitsArray, specificArray) {
    let alreadySelected = false;
    for (const digit of digitsArray) {
      for (const clicked of selectItem_Array) {
        if (
          clicked.digit === digit &&
          clicked.specificArray === specificArray
        ) {
          alreadySelected = true;
          break;
        }
      }
      if (alreadySelected) {
        break;
      }
    }
    return alreadySelected;
  }
  /**
   * update for Main total Val
   */
  function updateYourMoney() {
    totalSum = userinfo[index]['amount'];
    // Subtract each item.amount from totalSum/mainTotal value
    selectItem_Array.forEach((item) => {
      totalSum -= item.amount;
    });
    /* yourMoney.value =
       new Intl.NumberFormat().format(totalSum.toFixed(0)) + "Ks";*/
  }
});
