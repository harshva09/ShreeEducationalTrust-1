// carousel.js
// import { getImages } from './firebase-image.js';

// async function initializeCarousel() {
//     const images = await getImages();
//     const carouselIndicators = document.getElementById('carouselIndicators');
//     const carouselInner = document.getElementById('carouselInner');

//     images.forEach((imageUrl, index) => {
//         const indicator = document.createElement('li');
//         indicator.setAttribute('data-target', '#carouselExampleIndicators');
//         indicator.setAttribute('data-slide-to', index.toString());
//         if (index === 0) {
//             indicator.classList.add('active');
//         }
//         carouselIndicators.appendChild(indicator);

//         const item = document.createElement('div');
//         item.classList.add('carousel-item');
//         if (index === 0) {
//             item.classList.add('active');
//         }
//         const image = document.createElement('img');
//         image.src = imageUrl;
//         image.classList.add('d-block', 'w-100', 'h-80');
//         item.appendChild(image);
//         carouselInner.appendChild(item);
//     });
//     $('.carousel').carousel({
//         interval: 1000,
//         pause: 'hover'
//     });
// }

// initializeCarousel().catch(error => {
//     console.error('Error initializing carousel:', error);
// });


// carousel.js
import { getImages } from './firebase-image.js';

async function initializeCarousel() {
    // Display loading spinner until all images are loaded
    const loadingSpinner = document.createElement('div');
    loadingSpinner.classList.add('spinner-grow', 'text-primary', 'center-spinner');
    loadingSpinner.setAttribute('role', 'status');
    document.body.appendChild(loadingSpinner);

    // Fetch images
    const images = await getImages();

    // Remove loading spinner after images are fetched
    loadingSpinner.remove();

    const carouselIndicators = document.getElementById('carouselIndicators');
    const carouselInner = document.getElementById('carouselInner');

    // Count loaded images
    let loadedImagesCount = 0;

    // Function to remove loading spinner when all images are loaded
    const removeSpinnerWhenAllImagesLoaded = () => {
        loadedImagesCount++;
        if (loadedImagesCount === images.length) {
            loadingSpinner.remove();
        }
    };

    images.forEach((imageUrl, index) => {
        const indicator = document.createElement('li');
        indicator.setAttribute('data-target', '#carouselExampleIndicators');
        indicator.setAttribute('data-slide-to', index.toString());
        if (index === 0) {
            indicator.classList.add('active');
        }
        carouselIndicators.appendChild(indicator);

        const item = document.createElement('div');
        item.classList.add('carousel-item');
        if (index === 0) {
            item.classList.add('active');
        }
        const image = document.createElement('img');
        image.onload = removeSpinnerWhenAllImagesLoaded; // Remove loading spinner when image is loaded
        image.src = imageUrl;
        image.classList.add('d-block', 'w-100', 'h-80');
        item.appendChild(image);
        carouselInner.appendChild(item);
    });

    $('.carousel').carousel({
        interval: 1000, // Change time here for interval between slides
        pause: 'hover'
    });
}

initializeCarousel().catch(error => {
    console.error('Error initializing carousel:', error);
});

