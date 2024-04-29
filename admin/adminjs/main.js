// main.js
import { auth, onAuthStateChanged, signOut } from './firebase.js';
import { checkAndUpdateImage, updateImage, uploadImage } from './imageUpload.js';
import './contactRecords.js'; // Automatically executed for side effects

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../admin.html";
    }
});

document.getElementById('logoutBtn').addEventListener('click', function () {
    signOut(auth).then(() => {
        window.location.href = "../../index.html";
    }).catch((error) => {
        console.error('Error signing out:', error);
        alert('Error signing out. Please try again.');
    });
});

document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const selectedSlide = document.getElementById('dropdown').value;
    const file = document.getElementById('imageInput').files[0];
    var fileSize;
    if (file != undefined || file != null)
        fileSize = file.size;
    if (!file) {
        swal("Error", "Please select an image.", "error");
        return;
    } else if (fileSize > 2 * 1024 * 1024) {
        swal("Error", "File size should be less than 2 MB.", "error");
        return;
    }
    const reader = new FileReader();
    reader.onload = function (event) {
        const imageData = event.target.result;
        checkAndUpdateImage(selectedSlide, imageData);
    };
    reader.readAsDataURL(file);
});
