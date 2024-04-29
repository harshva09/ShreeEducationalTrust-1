// login.js
import { auth, signInWithEmailAndPassword } from './firebaseAuth.js';

const emailInput = document.getElementById('inputEmail');
const passwordInput = document.getElementById('inputPassword');
const loginBtn = document.getElementById('loginBtn');
const message = document.getElementById('message');

loginBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            message.textContent = "Login successful!";
            setTimeout(() => {
                window.location.href = "../admin.html"; // Redirect to admin page
            }, 1000);
        })
        .catch((error) => {
            alert("Error!");
            swal("Error", "Invalid Username and Password !", "error");
        });
});
