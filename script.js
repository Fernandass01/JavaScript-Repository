function checkPassword() {

    let password = document.getElementById("passwordInput").value;
    let score = 0;

    if (password.length >= 8) {
        score++;
    }

    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/[a-z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (/[!@#$%^&*]/.test(password)) {
        score++;
    }

    let result = "";

    if (score <= 2) {
        result = "Weak password";
    } else if (score <= 4) {
        result = "Medium password";
    } else {
        result = "Strong password";
    }

    document.getElementById("result").innerText = result;
}