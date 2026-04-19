// ============================================
// LUMIÈRE SKIN CLINIC – JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // ---- GALLERY FILTER ----
  const filterBtns = document.querySelectorAll('.gf-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        galleryItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
            setTimeout(() => { item.style.opacity = '1'; item.style.transform = ''; }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => { item.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // ---- GALLERY LIGHTBOX ----
  const lightbox = document.getElementById('lightbox');
  const lbContent = document.getElementById('lbContent');
  const lbClose = document.getElementById('lbClose');

  if (lightbox) {
    document.querySelectorAll('.g-card').forEach(card => {
      card.addEventListener('click', () => {
        const title = card.querySelector('.g-overlay span')?.textContent || '';
        const bg = card.style.background;
        lbContent.innerHTML = `
          <div style="
            width: 500px; max-width: 90vw;
            aspect-ratio: 4/3;
            background: ${bg};
            border-radius: 16px;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            gap: 16px;
          ">
            <div style="font-size: 3rem">✦</div>
            <h3 style="font-family: 'Cormorant Garamond', serif; color: #5c3d2e; font-size: 1.5rem; text-align:center; padding: 0 20px;">${title}</h3>
            <p style="color: #8a7a70; font-size: 0.85rem; text-align:center; padding: 0 20px;">Replace with actual before/after photo</p>
          </div>`;
        lightbox.classList.add('open');
      });
    });
    lbClose.addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  }

  // ---- FAQ ACCORDION ----
  window.toggleFaq = function(btn) {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-q').forEach(q => {
      q.classList.remove('open');
      q.nextElementSibling.classList.remove('open');
    });
    // Toggle clicked
    if (!isOpen) {
      btn.classList.add('open');
      answer.classList.add('open');
    }
  };

  // ---- SCROLL FADE-IN ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    '.feat-card, .srv-card, .testi-card, .team-card, .val-card, .srv-detail-card, .gallery-item, .info-item, .faq-item'
  ).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    observer.observe(el);
  });

  document.querySelectorAll('.visible, .feat-card.visible, .srv-card.visible').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });

  // Patch: add css for visible
  const style = document.createElement('style');
  style.textContent = `.visible { opacity: 1 !important; transform: none !important; }`;
  document.head.appendChild(style);

  // ---- CONTACT FORM SUBMIT ----
  window.submitForm = function() {
    const name = document.getElementById('fname')?.value;
    const phone = document.getElementById('fphone')?.value;
    const service = document.getElementById('fservice')?.value;
    if (!name || !phone || !service) {
      alert('Please fill in your name, phone number, and treatment of interest.');
      return;
    }
    const successMsg = document.getElementById('successMsg');
    if (successMsg) {
      successMsg.style.display = 'flex';
      document.getElementById('fname').value = '';
      document.getElementById('fphone').value = '';
      document.getElementById('femail') && (document.getElementById('femail').value = '');
      document.getElementById('fservice').value = '';
      document.getElementById('fmessage') && (document.getElementById('fmessage').value = '');
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // ---- GALLERY ITEM TRANSITIONS ----
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.transition = 'opacity 0.3s, transform 0.3s';
  });

});
