const validation = () => {
    var name = document.getElementById("name").value;
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var confirmpass = document.getElementById("conpass").value;
    var mobileNumber = document.getElementById("number").value;
    var emails = document.getElementById("emails").value;

    if (name == "") {
        document.getElementById("nameText").innerHTML =
            "Please fill the Name field";
        return false;
    }

    if (emails == "") {
        document.getElementById("emailText").innerHTML =
            "Please fill the email id field";
        return false;
    }
    if (emails.indexOf("@") <= 0) {
        document.getElementById("emailText").innerHTML = "Invalid Email";
        return false;
    }

    if (
        emails.charAt(emails.length - 4) != "." &&
        emails.charAt(emails.length - 3) != "."
    ) {
        document.getElementById("emailText").innerHTML = "Invalid Email";
        return false;
    }

    if (user == "") {
        document.getElementById("usernameText").innerHTML =
            "Please fill the username field";
        return false;
    }
    if (user.length <= 3 || user.length > 20) {
        document.getElementById("usernameText").innerHTML =
            "Username lenght must be between 3 and 20";
        return false;
    }
    if (!isNaN(user)) {
        document.getElementById("usernameText").innerHTML =
            "Only characters are allowed";
        return false;
    }

    if (pass == "") {
        document.getElementById("passwordText").innerHTML =
            "Please fill the password field";
        return false;
    }
    if (pass.length <= 5 || pass.length > 20) {
        document.getElementById("passwordText").innerHTML =
            "Passwords lenght must be between  5 and 20";
        return false;
    }

    if (pass != confirmpass) {
        document.getElementById("confrmpassText").innerHTML =
            "Password Mismatch";
        return false;
    }

    if (confirmpass == "") {
        document.getElementById("confrmpassText").innerHTML =
            "Please fill the confirmpassword field";
        return false;
    }

    if (mobileNumber == "") {
        document.getElementById("mobilText").innerHTML =
            "Please fill the mobile NUmber field";
        return false;
    }
    if (isNaN(mobileNumber)) {
        document.getElementById("mobilText").innerHTML =
            "User must write digits only numbers";
        return false;
    }
    if (mobileNumber.length != 11) {
        document.getElementById("mobilText").innerHTML =
            "Mobile Number must be 11 digits only";
        return false;
    }
}