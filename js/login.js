$(document).ready(function () {
    var userinfo = JSON.parse(localStorage.getItem('userinfo')) || [];
    var totalCash;
    $('#form').submit(function (event) {
        // Prevent auto submitting
        event.preventDefault();
        var email = $('#email').val();
        var username = $('#username').val();
        var password = $('#password2').val();
        // Find the user in array
        var user = userinfo.find(u => u.username === username && u.email === email);
        for (let index = 0; index < userinfo.length; index++) {
            if (email == userinfo[index]['email']) {
                localStorage.setItem('userIndex', index);
            }
        }
        if (!user) {
            alert('User not found.');
            return;
        }
        // Check the password
        if (user.password !== password) {
            alert('Incorrect password.');
            return;
        }
        alert("Login Successfully!")
        totalCash = localStorage.setItem('currentAmount', user.amount);
        window.location.href = 'index.html';
    });
});
