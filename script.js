// Resources used
// 1. Loading.io

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API
const count = 5;
const apiKey = 'Qr9-SCZYoYAe9PA6QWsvdG6Xuu0vrx1AX5ZT2GQxUG8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
       
        count = 30;
    }
};
// Helper Function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
};

// Create elements for links and photos and add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create anchor element to link to unsplash
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',

        })

        // Create image for photo
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.description,
            title: photo.description,
        })

        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)

        // Put image inside anchor element, then put both inside image container
        item.appendChild(img)
        imageContainer.appendChild(item)

    })

}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();

        displayPhotos()

    } catch (error) {
        // Catch error here
    }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos()

    }
})

// OnLoad
getPhotos();