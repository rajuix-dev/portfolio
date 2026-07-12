/* ============================================
   RAJ GUPTA PORTFOLIO — script.js
   EmailJS Integrated for Contact Form
   ============================================ */

/* ── EMAILJS CONFIGURATION ── */
const EMAILJS_PUBLIC_KEY = 'astmiG8XvJkl1qjH3';    // ✅ Aapki Public Key
const EMAILJS_SERVICE_ID = 'service_yy024al';      // ✅ Aapki Service ID
const EMAILJS_TEMPLATE_ID = 'template_p6dohh8';    // ✅ Aapki Template ID

// EmailJS Initialize karein
(function() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('✅ EmailJS Initialized Successfully');
  } else {
    console.warn('⚠️ EmailJS library not loaded');
  }
})();

/* ── CUSTOM CURSOR ── */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (dot) dot.style.left = mx + 'px';
  if (dot) dot.style.top  = my + 'px';
});

(function animateRing() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  if (ring) ring.style.left = rx + 'px';
  if (ring) ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

/* Cursor enlarge on hover */
document.querySelectorAll('a, button, .skill-card, .project-card, .svc-card, .ach-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (ring) {
      ring.querySelector('.cursor-ring').style.width  = '50px';
      ring.querySelector('.cursor-ring').style.height = '50px';
      ring.querySelector('.cursor-ring').style.borderColor = 'rgba(124,58,237,.7)';
    }
  });
  el.addEventListener('mouseleave', () => {
    if (ring) {
      ring.querySelector('.cursor-ring').style.width  = '34px';
      ring.querySelector('.cursor-ring').style.height = '34px';
      ring.querySelector('.cursor-ring').style.borderColor = 'rgba(124,58,237,.5)';
    }
  });
});

/* ── MOBILE MENU ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger) {
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}
function closeMobile() { 
  if (mobileMenu) mobileMenu.classList.remove('open'); 
}

/* ── SCROLL TOP BUTTON ── */
const stb = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (stb) stb.classList.toggle('visible', scrollY > 400);
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.style.boxShadow = scrollY > 60 ? '0 4px 40px rgba(0,0,0,.9)' : 'none';
  }
});

/* ── REVEAL ON SCROLL ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { 
    if (e.isIntersecting) e.target.classList.add('visible'); 
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(r => revealObs.observe(r));

/* ── SKILL BAR ANIMATION ── */
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('animated');
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-card').forEach(c => skillObs.observe(c));

/* ── ANIMATED COUNTERS ── */
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = +e.target.dataset.target;
      let current = 0;
      const step  = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        e.target.textContent = current;
        if (current >= target) clearInterval(timer);
      }, 40);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(c => counterObs.observe(c));

/* ── TYPEWRITER EFFECT ── */
const words = [
  'Full Stack Developer',
  'UI/UX Designer', 
  'AI Innovator',
  'Data Analytics Enthusiast'
];
let wIndex = 0, cIndex = 0, deleting = false;
const typedEl = document.getElementById('typed');

function typeEffect() {
  if (!typedEl) return;
  const word = words[wIndex];
  if (!deleting) {
    typedEl.textContent = word.substring(0, ++cIndex);
    if (cIndex === word.length) {
      deleting = true;
      setTimeout(typeEffect, 1900);
      return;
    }
  } else {
    typedEl.textContent = word.substring(0, --cIndex);
    if (cIndex === 0) {
      deleting = false;
      wIndex = (wIndex + 1) % words.length;
    }
  }
  setTimeout(typeEffect, deleting ? 55 : 88);
}
typeEffect();

/* ── PHOTO UPLOAD ── */
const photoInput   = document.getElementById('photoInput');
const photoImg     = document.getElementById('profilePhoto');
const photoHolder  = document.getElementById('photoHolder');
const uploadBtn    = document.getElementById('uploadPhotoBtn');

if (photoHolder) {
  photoHolder.addEventListener('click', () => photoInput.click());
}
if (uploadBtn) {
  uploadBtn.addEventListener('click', () => photoInput.click());
}

if (photoInput) {
  photoInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      if (photoHolder) photoHolder.style.display = 'none';
      if (photoImg) {
        photoImg.src = ev.target.result;
        photoImg.style.display = 'block';
      }
      try {
        localStorage.setItem('rajgupta_profile_photo', ev.target.result);
      } catch (err) {
        console.log('Image too large for localStorage');
      }
    };
    reader.readAsDataURL(file);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  try {
    const savedPhoto = localStorage.getItem('rajgupta_profile_photo');
    if (savedPhoto && photoImg && photoHolder) {
      photoHolder.style.display = 'none';
      photoImg.src = savedPhoto;
      photoImg.style.display = 'block';
    }
  } catch (err) {
    console.log('Could not load saved photo');
  }
});

/* ═══════════════════════════════════
   EMAILJS CONTACT FORM HANDLER
   ═══════════════════════════════════ */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const formStatus = document.getElementById('formStatus');
    
    // Get form values
    const fromName = document.getElementById('fromName').value.trim();
    const fromEmail = document.getElementById('fromEmail').value.trim();
    const subject = document.getElementById('subject').value.trim() || 'Portfolio Contact';
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!fromName || !fromEmail || !message) {
      showFormStatus(formStatus, 'error', '❌ Please fill all required fields!');
      shakeElement(submitBtn);
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fromEmail)) {
      showFormStatus(formStatus, 'error', '❌ Please enter a valid email address!');
      shakeElement(document.getElementById('fromEmail'));
      return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnLoader) btnLoader.style.display = 'inline';
    if (formStatus) formStatus.style.display = 'none';
    
    // Prepare template parameters
    const templateParams = {
      from_name: fromName,
      from_email: fromEmail,
      subject: subject,
      message: message,
      timestamp: new Date().toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'long'
      }),
      to_email: 'legendplayer0093@gmail.com'
    };
    
    console.log('📨 Sending email to legendplayer0093@gmail.com...');
    console.log('From:', fromName, `<${fromEmail}>`);
    console.log('Subject:', subject);
    
    try {
      // Send email via EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      
      console.log('✅ EmailJS Response:', response);
      
      if (response.status === 200) {
        // Success!
        showFormStatus(formStatus, 'success', '✅ Message sent successfully! I\'ll get back to you soon.');
        contactForm.reset();
        
        // Success animation on button
        submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
        submitBtn.style.boxShadow = '0 0 30px rgba(16,185,129,.4)';
        if (btnText) btnText.style.display = 'inline';
        if (btnLoader) btnLoader.style.display = 'none';
        btnText.textContent = '✓ Sent!';
        
        console.log('🎉 Email sent successfully to legendplayer0093@gmail.com!');
      }
    } catch (error) {
      console.error('❌ EmailJS Error Details:', {
        status: error.status,
        text: error.text,
        message: error.message
      });
      
      let errorMessage = '❌ Failed to send message. Please try again!';
      if (error.status === 400) {
        errorMessage = '❌ Invalid request. Check template variables!';
      } else if (error.status === 412) {
        errorMessage = '❌ Service unavailable. Try again later!';
      } else if (error.status === 403) {
        errorMessage = '❌ Access denied. Check your API keys!';
      }
      
      showFormStatus(formStatus, 'error', errorMessage);
      shakeElement(submitBtn);
    } finally {
      // Reset button after 4 seconds
      setTimeout(() => {
        submitBtn.disabled = false;
        if (btnText) {
          btnText.style.display = 'inline';
          btnText.textContent = 'Send Message →';
        }
        if (btnLoader) btnLoader.style.display = 'none';
        submitBtn.style.background = '';
        submitBtn.style.boxShadow = '';
        
        if (formStatus && formStatus.classList.contains('success')) {
          formStatus.style.display = 'none';
        }
      }, 4000);
    }
  });
}

/* ── FORM HELPER FUNCTIONS ── */
function showFormStatus(element, type, message) {
  if (!element) return;
  element.style.display = 'block';
  element.textContent = message;
  element.className = '';
  
  if (type === 'success') {
    element.style.background = 'rgba(16,185,129,0.1)';
    element.style.border = '1px solid rgba(16,185,129,0.3)';
    element.style.color = '#10B981';
  } else {
    element.style.background = 'rgba(239,68,68,0.1)';
    element.style.border = '1px solid rgba(239,68,68,0.3)';
    element.style.color = '#EF4444';
  }
  
  element.classList.add(type);
}

function shakeElement(element) {
  if (!element) return;
  element.style.animation = 'none';
  element.offsetHeight;
  element.style.animation = 'shake 0.5s ease-in-out';
  
  setTimeout(() => {
    element.style.animation = '';
  }, 500);
}

/* Add shake animation */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateX(-50%) translateY(10px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
`;
document.head.appendChild(shakeStyle);

/* ── RESUME BUTTONS ── */
const resumeUrl = './rajgupta-resume.pdf';

['resumeBtn', 'resumeBtn2'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('click', e => {
      e.preventDefault();
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'Raj_Gupta_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      const toast = document.createElement('div');
      toast.textContent = '📄 Resume download started!';
      toast.style.cssText = `
        position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
        background: linear-gradient(135deg, #7C3AED, #06B6D4);
        color: white; padding: 0.8rem 1.5rem; border-radius: 100px;
        font-family: 'DM Sans', sans-serif; font-size: 0.85rem;
        z-index: 10000; box-shadow: 0 0 30px rgba(124,58,237,0.5);
        animation: fadeInUp 0.3s ease;
      `;
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 2500);
    });
  }
});

/* ── ACTIVE NAV LINK ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop - 140) current = sec.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--cyan)' : '';
  });
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('🚀 Raj Gupta Portfolio Ready!');
console.log('📧 Contact: legendplayer0093@gmail.com');
console.log('📨 EmailJS: ✅ Fully Configured');
console.log('   Service:', EMAILJS_SERVICE_ID);
console.log('   Template:', EMAILJS_TEMPLATE_ID);