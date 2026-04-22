/* ===========================
   Main JavaScript
   =========================== */

// Lightbox
function olb(src, title, desc) {
  var lb = document.getElementById('lb');
  if (!lb) return;
  document.getElementById('lbImg').src = src;
  var lbi = document.getElementById('lbInfo');
  if (lbi) {
    lbi.querySelector('h3').textContent = title || '';
    lbi.querySelector('p').textContent = desc || '';
  }
  lb.classList.add('ac');
  document.body.style.overflow = 'hidden';
}
function clb() {
  var lb = document.getElementById('lb');
  if (lb) {
    lb.classList.remove('ac');
    document.body.style.overflow = '';
  }
}
document.addEventListener('DOMContentLoaded', function() {
  var lb = document.getElementById('lb');
  if (lb) {
    lb.onclick = function(e) { if (e.target === this) clb(); };
  }
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') clb(); });
});

// Contact form
function handleFormSubmit(e) {
  e.preventDefault();
  var form = document.getElementById('contactForm');
  if (!form) return;
  var data = new FormData(form);
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: data
  }).then(function(r) { return r.json(); })
  .then(function(r) {
    if (r.success) {
      var succ = document.getElementById('formSuccess');
      if (succ) {
        succ.style.display = 'block';
        succ.innerHTML = '<p style="color:#c9a84c;font-weight:700;font-size:15px">✅ Inquiry sent successfully!</p><p style="color:#666;font-size:12px;margin-top:6px">We will reply within 24 hours.</p>';
        form.reset();
      }
    }
  }).catch(function() {
    alert('Network error. Please try again or email us directly.');
  });
  return false;
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var target=document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        // Close mobile menu if open
        var nav=document.querySelector('nav');
        if(nav) nav.classList.remove('open');
      }
    });
  });
});

// Product gallery (for product detail page)
function switchImage(src, el) {
  var main = document.querySelector('.product-gallery > img');
  if (main) {
    main.src = src;
    document.querySelectorAll('.product-thumb img').forEach(function(img){ img.classList.remove('active'); });
    el.classList.add('active');
  }
}

// Active nav link
document.addEventListener('DOMContentLoaded',function(){
  var path=location.pathname;
  var page=path.split('/').pop()||'index.html';
  document.querySelectorAll('nav a').forEach(function(a){
    var href=a.getAttribute('href');
    if(href===page||(page===''&&href==='index.html')||(page==='/'&&href==='index.html')){
      a.classList.add('active');
    }
  });
});
