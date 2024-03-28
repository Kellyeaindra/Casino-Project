$(document).ready(function () {
  var userinfo = JSON.parse(localStorage.getItem("userinfo")) || [];
  var topupAmount;
  var currentTotal;
  var user, email, username;
  $("#form").submit(function (event) {
    // Prevent auto submitting
    event.preventDefault();
    email = $("#email").val();
    username = $("#username").val();
    topupAmount = $("#topup").val();
    // Find the user in userinfo array
    user = userinfo.find((u) => u.username === username && u.email === email);
    for (let index = 0; index < userinfo.length; index++) {
      if (email == userinfo[index]["email"]) {
        localStorage.setItem("userIndex", index);
      }
    }
    if (!user) {
      alert("User not found.");
      return;
    }
    /**
     * This function is used for top up balance.
     */
    var index = localStorage.getItem("userIndex");
    alert("Top Up Successfully!");
    currentTotal = Number(userinfo[index]["amount"]);
    currentTotal += Number(topupAmount);
    userinfo[index]["amount"] = currentTotal;
    localStorage.setItem("userinfo", JSON.stringify(userinfo));
    window.location.href = "index.html";
  });
});
