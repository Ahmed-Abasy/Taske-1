/* ===== Filters ===== */
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const filter = chip.dataset.filter; // all | nature | city | animals
    cards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? '' : 'none';
    });
  });
});

/* ===== Lightbox ===== */
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-image');
const galleryImgs = Array.from(document.querySelectorAll('#gallery img'));

let current = -1;

function openAt(idx) {
  current = idx;
  lbImg.src = galleryImgs[current].src;
  lbImg.alt = galleryImgs[current].alt;
  lightbox.hidden = false;
}

function prev() {
  current = (current - 1 + galleryImgs.length) % galleryImgs.length;
  lbImg.src = galleryImgs[current].src;
  lbImg.alt = galleryImgs[current].alt;
}
function next() {
  current = (current + 1) % galleryImgs.length;
  lbImg.src = galleryImgs[current].src;
  lbImg.alt = galleryImgs[current].alt;
}
function closeLb() {
  lightbox.hidden = true;
  lbImg.src = '';
  lbImg.alt = '';
  current = -1;
}

// click on thumbnails
galleryImgs.forEach((img, idx) => img.addEventListener('click', () => openAt(idx)));

// controls
document.querySelector('.lb-btn.prev').addEventListener('click', prev);
document.querySelector('.lb-btn.next').addEventListener('click', next);
document.querySelector('.lb-btn.close').addEventListener('click', closeLb);

// click outside image closes
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLb(); });

// keyboard support
document.addEventListener('keydown', (e) => {
  if (lightbox.hidden) return;
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'ArrowRight') next();
  if (e.key === 'Escape') closeLb();
});