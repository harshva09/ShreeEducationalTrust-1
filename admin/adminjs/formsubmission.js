// formSubmission.js
import { db, ref, set } from './firebase.js';

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const phonenumber = document.getElementById('phonenumber').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Push data to Firebase
    const fileName = "Form_" + Date.now();
    set(ref(db, 'contactus/' + fileName), {
        name: name,
        phonenumber: phonenumber,
        email: email,
        message: message
    }).then(function () {
        swal("Success", "Form Submitted successfully.", "success");
        document.getElementById('contact-form').reset();
        // Optionally, you can show a success message or redirect the user
    }).catch(function (error) {
        // Handle errors
        console.error('Error saving data: ', error);
    });
});
