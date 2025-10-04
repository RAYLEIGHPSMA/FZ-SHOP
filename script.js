// ضع رقم الواتساب بصيغة دولية (بدون + أو مسافات)
const WHATSAPP_NUMBER = "212629568041"; // تم تحديثه وفق طلب المستخدم

// رسالة مبدئية تظهر في نافذة المحادثة
const WHATSAPP_MESSAGE = encodeURIComponent("مرحبا، أود الاستفسار عن تفصيل/طلب جديد. اسمي: ");

function openWhatsApp(){
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
  window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', ()=>{
  const btn = document.getElementById('whatsapp-btn');
  const btn2 = document.getElementById('whatsapp-btn-2');
  if(btn) btn.addEventListener('click', (e)=>{e.preventDefault();openWhatsApp()});
  if(btn2) btn2.addEventListener('click', (e)=>{e.preventDefault();openWhatsApp()});
  // عرض رقم الهاتف في الصفحة من نفس المتغير لتسهيل التعديل
  const phoneEl = document.getElementById('phone-display');
  if(phoneEl) phoneEl.textContent = `+${WHATSAPP_NUMBER}`;
  const phoneLink = document.getElementById('phone-link');
  if(phoneLink) phoneLink.href = `tel:+${WHATSAPP_NUMBER}`;

  // Lightbox for gallery images
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-image');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const galleryImgs = document.querySelectorAll('.gallery-img');
  galleryImgs.forEach(img=>{
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', ()=>{
      lightboxImg.src = img.src;
      lightboxCaption.textContent = img.alt || '';
      lightbox.setAttribute('aria-hidden','false');
    });
  });
  function closeLightbox(){
    lightbox.setAttribute('aria-hidden','true');
    lightboxImg.src = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) closeLightbox(); });

  // Category modal logic
  const catModal = document.getElementById('cat-modal');
  const catTitle = document.querySelector('.cat-title');
  const catDesc = document.querySelector('.cat-desc');
  const catItems = document.querySelector('.cat-items');
  const catClose = document.querySelector('.cat-close');
  const catWhatsapp = document.querySelector('.cat-whatsapp');

  const categories = {
    jalabiya: { title: 'موديلات جلابيب', desc: 'مجموعة مختارة من الجلابيب المطرزة...', items: ['images/gal-1.jpg','images/gal-2.svg','images/gal-3.jpg'] },
    qaftan: { title: 'قفاطين مميزة', desc: 'تفاصيل قفطانية فاخرة للمناسبات.', items: ['images/gal-2.svg','images/gal-3.jpg','images/gal-4.svg'] },
    dress: { title: 'فساتين سهرة', desc: 'مجموعة فساتين سهرة أنيقة.', items: ['images/gal-3.jpg','images/gal-1.jpg','images/gal-4.svg'] },
    daily: { title: 'إطلالات يومية', desc: 'أفكار إطلالات يومية وراقية.', items: ['images/gal-4.svg','images/gal-1.jpg','images/gal-2.svg'] }
  };

  function openCategory(catKey){
    const cat = categories[catKey];
    if(!cat) return;
    catTitle.textContent = cat.title;
    catDesc.textContent = cat.desc;
    catItems.innerHTML = '';
    cat.items.forEach(src=>{
      const div = document.createElement('div');
      div.className = 'cat-item';
      const img = document.createElement('img');
      img.src = src;
      img.alt = cat.title;
      img.addEventListener('click', ()=>{
        // open in lightbox
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt;
        lightbox.setAttribute('aria-hidden','false');
      });
      div.appendChild(img);
      catItems.appendChild(div);
    });
    // set whatsapp CTA for this category
    const msg = encodeURIComponent(`مرحبا، أود الاطلاع على موديلات ${cat.title} والحجز.`);
    catWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    catModal.setAttribute('aria-hidden','false');
  }

  document.querySelectorAll('.cat-btn').forEach(b=>{
    b.addEventListener('click', ()=> openCategory(b.dataset.cat));
  });
  catClose.addEventListener('click', ()=> catModal.setAttribute('aria-hidden','true'));
  catModal.addEventListener('click', (e)=>{ if(e.target===catModal) catModal.setAttribute('aria-hidden','true'); });
});
