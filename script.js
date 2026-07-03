const photoCount = 145;

const photos = Array.from({ length: photoCount }, (_, index) => {
  const number = String(index + 1).padStart(3, "0");

  return {
    full: `assets/web/photos/photo-${number}.jpg`,
    thumb: `assets/web/thumbs/photo-${number}.jpg`,
    label: `Photo ${number}`
  };
});

const grid = document.querySelector("#photoGrid");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const closeLightbox = document.querySelector("#closeLightbox");
const shufflePhoto = document.querySelector("#shufflePhoto");

function renderGallery() {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const button = document.createElement("button");
    button.className = "photo-card";
    button.type = "button";
    button.dataset.label = photo.label;
    button.innerHTML = `<img loading="lazy" src="${photo.thumb}" alt="${photo.label}">`;
    button.addEventListener("click", () => openPhoto(photo));
    fragment.appendChild(button);
  });

  grid.appendChild(fragment);
}

function openPhoto(photo) {
  lightboxImage.src = photo.full;
  lightboxImage.alt = photo.label;
  lightboxCaption.textContent = photo.label;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closePhoto() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

shufflePhoto.addEventListener("click", () => {
  const index = Math.floor(Math.random() * photos.length);
  openPhoto(photos[index]);
});

closeLightbox.addEventListener("click", closePhoto);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closePhoto();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePhoto();
  }
});

renderGallery();
