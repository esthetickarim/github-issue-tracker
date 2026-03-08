// This function runs when user clicks login button

function login() {

    // Get input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check demo credential
    if(username === "admin" && password === "admin123"){

        // redirect to dashboard page
        window.location.href = "dashboard.html";

    } else {

        // show error message
        alert("Invalid login credentials");

    }

}