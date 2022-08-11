const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// unsplash api
let count = 5;
const apiKey = "A7dVWOxCim3Ra_PwsNzuIGjTWhn8m285pXll4-Lnn2w";
//"fpUz3uzFipoyNlrsC3dOwT_WqbNJRHGRGXyF-CR9lDs";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
// check if all the images are loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    initialLoad = false;
    count = 30;
  }
}
// function to set attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements from links and photos and add to the DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // run function for each object in photosArray
  photosArray.forEach((photo) => {
    // <a> to link to splash
    const item = document.createElement("a");
    //item.setAttribute("href", photo.links.html);
    //item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // <img> for photo
    const img = document.createElement("img");
    //img.setAttribute("src", photo.urls.regular);
    //img.setAttribute("alt", photo.alt_description);
    //img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // event listener, click when each has finished loading
    img.addEventListener("load", imageLoaded);
    // code to put the <img> inside the <a> and to put both inside the image container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
// get photos from unsplash api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // catch error
  }
}

// check if scrolling is near the bottom of the page, if it is, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
