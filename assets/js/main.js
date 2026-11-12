/**
 * SABRINA'S PROFILE — JAVASCRIPT
 * Interaktivitas, Navigasi Responsif, dan Utilitas Salin Kontak
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Mobile navigation toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isExpanded = navLinks.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
      }
    });
  }

  // 3. Highlight active page in navigation
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navAnchors = document.querySelectorAll('.nav-item a');
  navAnchors.forEach((a) => {
    const href = a.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // 4. Toast notification helper
  window.showToast = function (message) {
    let toast = document.querySelector('.toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notice';
      toast.innerHTML = `
        <span class="toast-icon">✓</span>
        <span class="toast-text"></span>
      `;
      document.body.appendChild(toast);
    }
    const textEl = toast.querySelector('.toast-text');
    if (textEl) textEl.textContent = message;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  };

  // 5. Copy username to clipboard
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const handle = btn.getAttribute('data-copy') || '@ssaabbrnn';
      navigator.clipboard.writeText(handle).then(() => {
        showToast(`Nama pengguna ${handle} berhasil disalin ke papan klip.`);
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span>✓ Disalin</span>`;
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2200);
      }).catch(() => {
        showToast(`Gagal menyalin. Silakan salin manual: ${handle}`);
      });
    });
  });

  // 6. Interactive Contact Form (Formal Feedback)
  const contactForm = document.getElementById('formalContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('senderName')?.value || 'Bapak/Ibu';
      showToast(`Terima kasih, ${senderName}. Pesan kehormatan Anda telah berhasil terkirim.`);
      contactForm.reset();
    });
  }
});
