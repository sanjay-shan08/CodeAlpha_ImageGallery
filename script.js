const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter)
            {
                item.style.display = '';
            }
            else 
            {
                item.style.display = 'none';
            }
        });
    });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIdx = 0;
let currentGallery = [];

function updateGallery() {
    currentGallery = Array.from(document.querySelectorAll('.gallery-item'))
    .filter(item => item.style.display !== 'none');
}

function showLightbox(idx) {
    updateGallery();
    currentIdx = idx;
    const img = currentGallery[currentIdx].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.style.display = 'block';
}

galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
        updateGallery();
        const visibleItems = currentGallery;
        const visibleIdx = visibleItems.indexOf(item);
        showLightbox(visibleIdx);
    });
});

nextBtn.addEventListener('click', () => {
    updateGallery();
    currentIdx = (currentIdx + 1) % currentGallery.length;
    showLightbox(currentIdx);
});

prevBtn.addEventListener('click', () => {
    updateGallery();
    currentIdx = (currentIdx - 1 + currentGallery.length) % currentGallery.length;
    showLightbox(currentIdx);
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox)
    {
        lightbox.style.display = 'none';
    }
});

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') 
    {
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'Escape') closeBtn.click();
    }
});