// carousel.js
import { getImages } from './firebase-image.js';

async function initializeCarousel() {
    const images = await getImages();
    const carouselIndicators = document.getElementById('carouselIndicators');
    const carouselInner = document.getElementById('carouselInner');

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
