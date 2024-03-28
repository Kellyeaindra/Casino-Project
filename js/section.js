$(document).ready(function () {
  var currentTime = new Date();
  var currentHour = currentTime.getHours();
  var currentMinute = currentTime.getMinutes();
  var currentDayOfWeek = currentTime.getDay();
  //time limit for 12:00Am Section
  $(".twelveAM").click(function () {
    if (
      (currentHour >= 9 || (currentHour === 11 && currentMinute >= 50)) &&
      currentDayOfWeek >= 1 &&
      currentDayOfWeek <= 5
    ) {
      // allow the link
      window.location.href = "./lottery.html";
    } else {
      alert(
        "Sorry, Try another section. " +
        "this section is only available from 9 AM to 11:50 AM, Monday to Friday."
      );
    }
  });
  //time limit for 4:30Am Section
  $(".fourPM").click(function () {
    if (
      (currentHour >= 9 || (currentHour === 15 && currentMinute >= 50)) &&
      currentDayOfWeek >= 1 &&
      currentDayOfWeek <= 5
    ) {
      window.location.href = "./lotteryPM.html";
    } else {
      alert(
        "Sorry, " +
        "this section is only available from 9 AM to 3:50 PM, Monday to Friday."
      );
    }
  });
});
