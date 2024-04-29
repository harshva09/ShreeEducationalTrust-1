//import { db } from './firebase.js';
import { db, ref, get, set, child } from './firebase.js';

function checkAndUpdateImage(selectedSlide, imageData) {
    get(child(ref(db), `SlideImage/${selectedSlide}`)).then((snapshot) => {
        if (snapshot.exists()) {
            updateImage(selectedSlide, imageData);
        } else {
            uploadImage(selectedSlide, imageData);
        }
    }).catch((error) => {
        console.error('Error checking slide existence:', error);
        swal("Error", "Error uploading image. Please try again.", "error");
    });
}

function updateImage(selectedSlide, imageData) {
    set(ref(db, `SlideImage/${selectedSlide}/image`), imageData)
        .then(() => {
            swal("Success", "Image updated successfully.", "success").then(() => {
                location.reload();
            });
        })
        .catch((error) => {
            console.error('Error updating image:', error);
            swal("Error", "Error updating image. Please try again.", "error");
        });
}

function uploadImage(selectedSlide, imageData) {
    set(ref(db, `SlideImage/${selectedSlide}/image`), imageData)
    .then(() => {
        swal("Success", "Image uploaded successfully.", "success");
        location.reload();
    })
    .catch((error) => {
        console.error('Error uploading image:', error);
        swal("Error", "Error uploading image. Please try again.", "error");
    });
}


export { checkAndUpdateImage, updateImage, uploadImage };