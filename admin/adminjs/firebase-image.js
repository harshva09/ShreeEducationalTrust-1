// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { firebaseConfig } from './firebase-config.js';

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

function getImages() {
    return new Promise((resolve, reject) => {
        const images = [];
        get(ref(db, 'SlideImage')).then(snapshot => {
            snapshot.forEach(childSnapshot => {
                const imageUrl = childSnapshot.child('image').val();
                images.push(imageUrl);
            });
            resolve(images);
        }).catch(error => {
            reject(error);
        });
    });
}

export { getImages };
