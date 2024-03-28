$(document).ready(function () {
    var userinfo = JSON.parse(localStorage.getItem('userinfo')) || [];
    var username, email, password1, password2, amount;
    $('#register').on('click', function () {
        // Store input values before resetting error messages
        email = $('#email').val();
        username = $('#username').val();
        password1 = $('#password1').val();
        password2 = $('#password2').val();
        amount = $('#amount').val();
        console.log(amount);
        // if validation failed, do not register
        if (!validateInputs(username, email, password1, password2)) {
            alert("Please check the email,username and password!Password must be at least 8 characters including number, Upper, Lower And one special character")
            return;
        }
        const user = {
            email: email,
            username: username,
            password1: password1,
            password2: password2,
            amount: amount
        };
        /**Adding user into userinfo */
        userinfo.push(user);
        localStorage.setItem('userinfo', JSON.stringify(userinfo));
        alert("Sign up successfully");
        window.location.href = 'index.html';
    });
    /** check email,username,password*/
    function validateInputs(username, email, password1, password2) {
        if (!mailFormat(email) || !userFormat(username) || !passFormat(password1) || password1 !== password2) {
            return false;
        }
        return true;
    }
    /**Regular expression */
    const mailFormat = (e) => {
        const re = /\w+@\w+\.\w+/;
        return re.test(String(e).toLowerCase());
    };
    const passFormat = (p) => {
        const re = /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[\d|@#$!%*?&])[\p{L}\d@#$!%*?&]{8,96}$/gmu;
        return re.test(p);
    };
    const userFormat = (u) => {
        const re = /[^0-9]/;
        return re.test(u);
    };
});
