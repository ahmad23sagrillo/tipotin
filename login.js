function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then((userCredential) => {
        // User is authenticated, handle login success
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("mainPage").style.display = "block";
        loadProfile(currentProfileIndex);
      })
      .catch((error) => {
        // Handle login error
        alert("Invalid username or password. Please try again.");
      });
  }
 
  function showSignUpForm() {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("signUpPage").style.display = "block";
}

function signUp() {
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;

    firebase
        .auth()
        .createUserWithEmailAndPassword(newUsername, newPassword)
        .then((userCredential) => {
            // Sign up successful, proceed to main page
            document.getElementById("loginPage").style.display = "none";
            document.getElementById("signUpPage").style.display = "none";
            document.getElementById("mainPage").style.display = "block";
            loadProfile(currentProfileIndex);
        })
        .catch((error) => {
            alert("Error creating account. Please try again.");
        });
}

function showLoginPage() {
    document.getElementById("loginPage").style.display = "block";
    document.getElementById("signUpPage").style.display = "none";
}
